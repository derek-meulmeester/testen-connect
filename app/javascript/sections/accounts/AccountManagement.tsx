import React from "react";
import { Layout, Page } from "@shopify/polaris";
import {
  ConnectAccountManagement,
  ConnectNotificationBanner,
} from "@stripe/react-connect-js";
import { useParams } from "react-router-dom";

import { StripeEmbeddedComponent } from "@/components";

export const AccountManagement = () => {
  const { accountId } = useParams();

  if (!accountId) {
    return <p>Error loading account</p>;
  }

  return (
    <Page title="Account Management" backAction={{ url: "/accounts" }}>
      <Layout>
        <StripeEmbeddedComponent accountId={accountId}>
          <Layout.Section>
            <ConnectNotificationBanner />
          </Layout.Section>
          <Layout.Section>
            <ConnectAccountManagement />
          </Layout.Section>
        </StripeEmbeddedComponent>
      </Layout>
    </Page>
  );
};
