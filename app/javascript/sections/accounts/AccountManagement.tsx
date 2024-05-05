import React from "react";
import { Layout, Page } from "@shopify/polaris";
import { ConnectAccountManagement } from "@stripe/react-connect-js";
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
        <Layout.Section>
          <StripeEmbeddedComponent accountId={accountId}>
            <ConnectAccountManagement />
          </StripeEmbeddedComponent>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
