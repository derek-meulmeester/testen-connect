import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import {
  Modal,
  FormLayout,
  TextField,
  Select,
  ChoiceList,
  Banner,
  BlockStack,
} from "@shopify/polaris";
import { useSearchParams } from "react-router-dom";

import {
  accountTypes,
  capabilityChoices,
  countries,
  formatAccountCreateData,
  headers,
} from "@/utilities";

interface Props {
  open: boolean;
  onClose(): void;
  onCreated(accountId: string): void;
}

export const AccountCreateModal = ({ open, onClose, onCreated }: Props) => {
  const [searchParams] = useSearchParams();
  const [accountType, setAccountType] = React.useState(
    searchParams.get("type") || "custom",
  );
  const [country, setCountry] = React.useState(
    searchParams.get("country") || "US",
  );
  const [email, setEmail] = React.useState(searchParams.get("email") || "");
  const [capabilities, setCapabilities] = React.useState<string[]>([
    "transfers",
    "card_payments",
  ]);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const mutation = useMutation({
    mutationFn: () => {
      const data = formatAccountCreateData({
        type: accountType,
        email,
        country,
        capabilities,
      });

      return axios
        .post("/api/stripe/account", data, {
          headers: headers(),
        })
        .then((res) => res.data);
    },
    onSuccess: (data) => {
      onClose();
      onCreated(data?.id);
    },
    onError: (error: AxiosError) => {
      const data = error?.response?.data as any;
      setError(data?.error || "Unexpected error");
    },
  });

  const handleAccountTypeChange = React.useCallback(
    (type: string) => setAccountType(type),
    [],
  );
  const handleCountryChange = React.useCallback(
    (country: string) => setCountry(country),
    [],
  );
  const handleEmailChange = React.useCallback(
    (email: string) => setEmail(email),
    [],
  );
  const handleCapabilitiesChange = React.useCallback(
    (capabilities: string[]) => setCapabilities(capabilities),
    [],
  );
  const handleClose = React.useCallback(() => {
    setError(undefined);
    onClose();
  }, [setError, onClose]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Create Account"
      primaryAction={{
        content: "Create",
        onAction: () => {
          setError(undefined);
          mutation.mutate();
        },
        loading: mutation.isPending,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: handleClose,
          disabled: mutation.isPending,
        },
      ]}
    >
      <Modal.Section>
        <BlockStack gap="500">
          {error && (
            <div>
              <Banner tone="critical">
                <p>{error}</p>
              </Banner>
            </div>
          )}
          <FormLayout>
            <Select
              label="Account Type"
              options={accountTypes}
              onChange={handleAccountTypeChange}
              value={accountType}
              disabled={mutation.isPending}
            />
            <Select
              label="Country"
              options={countries}
              onChange={handleCountryChange}
              value={country}
              disabled={mutation.isPending}
            />
            <TextField
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              autoComplete="off"
              type="email"
              label="Email (Optional)"
              value={email}
              onChange={handleEmailChange}
              disabled={mutation.isPending}
              helpText="Use foo+enforce_future_requirements@stripe.com to apply future requirements"
            />
            <ChoiceList
              allowMultiple
              title="Capabilities"
              disabled={mutation.isPending}
              choices={capabilityChoices}
              selected={capabilities}
              onChange={handleCapabilitiesChange}
            />
          </FormLayout>
        </BlockStack>
      </Modal.Section>
    </Modal>
  );
};
