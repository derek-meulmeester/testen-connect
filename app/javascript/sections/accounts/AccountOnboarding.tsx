import React from "react";
import { useParams } from "react-router-dom";
import { ConnectAccountOnboarding } from "@stripe/react-connect-js";
import { Layout, Page } from "@shopify/polaris";

import { useAttributeControls } from "@/sections";
import { AccountLinkModal, StripeEmbeddedComponent } from "@/components";

export const AccountOnboarding = () => {
  const [linkModalOpen, setLinkModalOpen] = React.useState(false);
  const { accountId } = useParams();
  const { attributeValues, AttributeControls } = useAttributeControls();
  const {
    privacyPolicyUrl,
    fullToSUrl,
    recipientToSUrl,
    skipTosCollection,
    includeEventuallyDue,
    includeFutureRequirements,
  } = attributeValues;

  const onExit = React.useCallback(() => {
    // eslint-disable-next-line no-alert
    window.alert("onExit emitted!");
  }, []);

  if (!accountId) {
    return <p>Error loading account</p>;
  }

  return (
    <Page
      title="Account Onboarding"
      backAction={{ url: "/accounts" }}
      secondaryActions={[
        {
          content: "Hosted Onboarding",
          onAction: () => setLinkModalOpen(true),
        },
      ]}
    >
      <Layout>
        <Layout.Section variant="oneThird">{AttributeControls}</Layout.Section>
        <Layout.Section>
          <StripeEmbeddedComponent accountId={accountId}>
            <ConnectAccountOnboarding
              onExit={onExit}
              privacyPolicyUrl={privacyPolicyUrl}
              fullTermsOfServiceUrl={fullToSUrl}
              recipientTermsOfServiceUrl={recipientToSUrl}
              skipTermsOfServiceCollection={skipTosCollection}
              collectionOptions={{
                fields: includeEventuallyDue
                  ? "eventually_due"
                  : "currently_due",
                futureRequirements: includeFutureRequirements
                  ? "include"
                  : "omit",
              }}
            />
          </StripeEmbeddedComponent>
        </Layout.Section>
      </Layout>
      <AccountLinkModal
        accountId={accountId}
        open={linkModalOpen}
        onClose={() => setLinkModalOpen(false)}
      />
    </Page>
  );
};
