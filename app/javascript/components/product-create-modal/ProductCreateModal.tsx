import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import {
  Modal,
  FormLayout,
  TextField,
  Banner,
  BlockStack,
} from "@shopify/polaris";
import { useParams } from "react-router-dom";

import { headers } from "@/utilities";

interface Props {
  open: boolean;
  onClose(): void;
  onCreated(accountId: string): void;
}

export const ProductCreateModal = ({ open, onClose, onCreated }: Props) => {
  const { accountId } = useParams();
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [unitAmount, setUnitAmount] = React.useState("25.00");
  const [error, setError] = React.useState<string | undefined>(undefined);

  const mutation = useMutation({
    mutationFn: () => {
      const data = {
        account_id: accountId,
        name,
        description,
        unit_amount: Number(unitAmount) * 100,
      };

      return axios
        .post("/api/stripe/product", data, {
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

  const handleClose = React.useCallback(() => {
    setError(undefined);
    onClose();
  }, [setError, onClose]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Create Product"
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
            <TextField
              autoComplete="off"
              type="text"
              label="Name"
              value={name}
              onChange={(v) => setName(v)}
              disabled={mutation.isPending}
              helpText="Name of your product, ex: Cookie Subscription"
            />
            <TextField
              autoComplete="off"
              type="text"
              label="Description"
              value={description}
              onChange={(v) => setDescription(v)}
              disabled={mutation.isPending}
            />
            <TextField
              label="Price"
              type="number"
              value={unitAmount}
              onChange={(v) => setUnitAmount(v)}
              autoComplete="off"
            />
          </FormLayout>
        </BlockStack>
      </Modal.Section>
    </Modal>
  );
};
