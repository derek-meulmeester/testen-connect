import React from "react";
import {
  Page,
  Layout,
  Card,
  BlockStack,
  Text,
  InlineCode,
  Link,
} from "@shopify/polaris";

import { railsData, truncate } from "@/utilities";

export default function Settings() {
  const platformId = railsData("stripe.platformId");
  const publishableKey = railsData("stripe.publishableKey");

  return (
    <Page title="Settings">
      <Layout>
        <Layout.AnnotatedSection
          id="platformInformation"
          title="Platform"
          description="Useful information and links for the platform being used to create Connected Accounts."
        >
          <Card>
            <BlockStack gap="500">
              <div>
                <Text variant="headingMd" as="h4">
                  Platform Token
                </Text>
                <Text as="span">
                  <InlineCode>
                    <Link url={`http://go/view/${platformId}`}>
                      {platformId}
                    </Link>
                  </InlineCode>
                </Text>{" "}
                <Text as="span">
                  <Link url={`http://go/loginas/${platformId}`}>Login as</Link>
                </Text>
              </div>
              <div>
                <Text variant="headingMd" as="h4">
                  Publishable key:
                </Text>
                <Text as="span">
                  <InlineCode>
                    <Link url={`http://go/o/${publishableKey}`}>
                      {truncate(publishableKey, 60)}
                    </Link>
                  </InlineCode>
                </Text>
              </div>
            </BlockStack>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}
