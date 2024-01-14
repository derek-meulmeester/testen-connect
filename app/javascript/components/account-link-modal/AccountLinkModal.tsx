import React from "react";
import { Modal, FormLayout, Select, BlockStack } from "@shopify/polaris";
import queryString from "query-string";

import {
  accountLinkTypes,
  collectFieldOptions,
  collectFutureRequirementsOptions,
} from "@/utilities";

interface Props {
  accountId: string;
  open: boolean;
  onClose(): void;
}

export const AccountLinkModal = ({ accountId, open, onClose }: Props) => {
  const [linkType, setLinkType] = React.useState("account_onboarding");
  const [fields, setFields] = React.useState("currently_due");
  const [futureReqs, setFutureReqs] = React.useState("omit");

  const handleCreateLink = () => {
    const params = queryString.stringify({
      type: linkType,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "collection_options[fields]": fields,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "collection_options[future_requirements]": futureReqs,
    });

    window.open(
      `/api/stripe/account/${accountId}/account_link?${params}`,
      "_blank",
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create Account Link"
      primaryAction={{
        content: "Create",
        onAction: handleCreateLink,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: onClose,
        },
      ]}
    >
      <Modal.Section>
        <BlockStack gap="500">
          <FormLayout>
            <Select
              label="Link Type"
              options={accountLinkTypes}
              onChange={(val) => setLinkType(val)}
              value={linkType}
            />
            <Select
              label="Fields"
              options={collectFieldOptions}
              onChange={(val) => setFields(val)}
              value={fields}
            />
            <Select
              label="Future requirements"
              options={collectFutureRequirementsOptions}
              onChange={(val) => setFutureReqs(val)}
              value={futureReqs}
            />
          </FormLayout>
        </BlockStack>
      </Modal.Section>
    </Modal>
  );
};
