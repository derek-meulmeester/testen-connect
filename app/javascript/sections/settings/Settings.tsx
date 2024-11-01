import React from "react";
import {
  Page,
  Layout,
  Card,
  BlockStack,
  Text,
  InlineCode,
  Link,
  FormLayout,
  Checkbox,
} from "@shopify/polaris";

import { railsData, truncate } from "@/utilities";
import { useSettingsContext } from "@/context";

export default function Settings() {
  const platformId = railsData("stripe.platformId");
  const publishableKey = railsData("stripe.publishableKey");
  const { externalAccountCollection, setExternalAccountCollection } =
    useSettingsContext();

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

        {/* Always collect external account with auth disabled */}
        {/* <Layout.AnnotatedSection
          id="componentFeatures"
          title="Component Features"
          description="Control what features are enabled on Embedded Components."
        >
          <Card>
            <BlockStack gap="500">
              <FormLayout>
                <Checkbox
                  label="External account collection"
                  helpText="This only applies to custom accounts. When selected Stripe collects External Account information during onboarding."
                  checked={externalAccountCollection}
                  onChange={(value) => setExternalAccountCollection(value)}
                />
              </FormLayout>
            </BlockStack>
          </Card>
        </Layout.AnnotatedSection> */}
      </Layout>
    </Page>
  );
}
