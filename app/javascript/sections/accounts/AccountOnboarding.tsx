import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ConnectAccountOnboarding } from "@stripe/react-connect-js";
import { Action, BlockStack, Layout, Page, Text } from "@shopify/polaris";

import { useAttributeControls } from "@/sections";
import {
  AccountLinkModal,
  PageLoadingState,
  StripeEmbeddedComponent,
} from "@/components";

type StepViews = {
  step: string;
  startTime: Date;
};

export const AccountOnboarding = () => {
  const [linkModalOpen, setLinkModalOpen] = React.useState(false);
  const [stepViews, setStepViews] = React.useState<StepViews[]>([]);
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
  const dateFormat = new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "medium",
  });
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

  const onStepChange = ({ step }) => {
    setStepViews([
      ...stepViews,
      {
        step,
        startTime: new Date(),
      },
    ]);
  };

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
        <Layout.Section variant="oneThird">
          <BlockStack gap="500">
            {AttributeControls}
            <div>
              <Text variant="headingMd" as="h5">
                Step views
              </Text>
              {stepViews.map(({ step, startTime }) => {
                return (
                  <Text as="p" key={`${step}-${startTime}`}>
                    <Text as="span" tone="subdued">
                      {dateFormat.format(startTime)}
                      {": "}
                    </Text>
                    <Text as="span" tone="magic-subdued" fontWeight="semibold">
                      {step}
                    </Text>
                  </Text>
                );
              })}
            </div>
          </BlockStack>
        </Layout.Section>
        <Layout.Section>
          <div
            style={{
              marginLeft: window.outerWidth >= 1024 ? "50px" : undefined,
              paddingBottom: "50px",
            }}
          >
            <StripeEmbeddedComponent accountId={accountId}>
              <ConnectAccountOnboarding
                onExit={onExit}
                privacyPolicyUrl={privacyPolicyUrl}
                fullTermsOfServiceUrl={fullToSUrl}
                recipientTermsOfServiceUrl={recipientToSUrl}
                skipTermsOfServiceCollection={skipTosCollection}
                onStepChange={onStepChange}
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
          </div>
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
