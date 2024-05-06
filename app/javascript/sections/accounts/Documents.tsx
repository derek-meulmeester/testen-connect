import React from "react";
import { Layout, Page } from "@shopify/polaris";
import { ConnectDocuments } from "@stripe/react-connect-js";
import { useParams } from "react-router-dom";

import { StripeEmbeddedComponent } from "@/components";

export const Documents = () => {
  const { accountId } = useParams();

  if (!accountId) {
    return <p>Error loading account</p>;
  }

  return (
    <Page title="Documents" backAction={{ url: "/accounts" }}>
      <Layout>
        <Layout.Section>
          <StripeEmbeddedComponent accountId={accountId}>
            <ConnectDocuments />
          </StripeEmbeddedComponent>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
