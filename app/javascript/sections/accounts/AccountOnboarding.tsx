import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ConnectAccountOnboarding } from "@stripe/react-connect-js";
import { Action, Layout, Page } from "@shopify/polaris";

import { useAttributeControls } from "@/sections";
import {
  AccountLinkModal,
  PageLoadingState,
  StripeEmbeddedComponent,
} from "@/components";

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
  const retrieveAccountApi = () =>
    axios.get(`/api/stripe/account/${accountId}`).then((res) => res.data);

  const {
    isPending,
    error,
    data: account,
  } = useQuery({
    queryKey: ["accountRetrieve", accountId],
    queryFn: retrieveAccountApi,
  });

  const onExit = React.useCallback(() => {
    // eslint-disable-next-line no-alert
    window.alert("onExit emitted!");
  }, []);

  const openStandardDashboard = React.useCallback(() => {
    window.open("https://dashboard.stripe.com", "_blank");
  }, []);

  const openExpressDashboard = React.useCallback(() => {
    window.open(`/api/stripe/account/${accountId}/login_link`, "_blank");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!accountId) {
    return <p>No account provided</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isPending) {
    return <PageLoadingState />;
  }

  const secondaryActions: Action[] = [];
  switch (account.controller?.stripe_dashboard?.type) {
    case "express":
      secondaryActions.push({
        content: "Express dashboard",
        onAction: openExpressDashboard,
      });
      break;
    case "full":
      secondaryActions.push({
        content: "Standard dashboard",
        onAction: openStandardDashboard,
      });
      break;
  }

  return (
    <Page
      title="Account Onboarding"
      backAction={{ url: "/accounts" }}
      secondaryActions={[
        ...secondaryActions,
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
