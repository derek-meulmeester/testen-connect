import React from "react";
import { Layout, Page } from "@shopify/polaris";
import { ConnectPayments } from "@stripe/react-connect-js";
import { useParams } from "react-router-dom";

import { StripeEmbeddedComponent } from "@/components";

export const Payments = () => {
  const { accountId } = useParams();

  if (!accountId) {
    return <p>Error loading account</p>;
  }

  return (
    <Page title="Payments" backAction={{ url: "/accounts" }}>
      <Layout>
        <Layout.Section>
          <StripeEmbeddedComponent accountId={accountId}>
            <ConnectPayments />
          </StripeEmbeddedComponent>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
