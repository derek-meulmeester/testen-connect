import React from "react";
import { Layout, Page } from "@shopify/polaris";
import { ConnectPayouts } from "@stripe/react-connect-js";
import { useParams } from "react-router-dom";

import { StripeEmbeddedComponent } from "@/components";

export const Payouts = () => {
  const { accountId } = useParams();

  if (!accountId) {
    return <p>Error loading account</p>;
  }

  return (
    <Page title="Payouts" backAction={{ url: "/accounts" }}>
      <Layout>
        <Layout.Section>
          <StripeEmbeddedComponent accountId={accountId}>
            <ConnectPayouts />
          </StripeEmbeddedComponent>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
