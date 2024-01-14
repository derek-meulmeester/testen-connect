import React from "react";
import { Layout, SkeletonBodyText, Card, SkeletonPage } from "@shopify/polaris";

export const AccountsListSkeleton = () => {
  return (
    <SkeletonPage primaryAction>
      <Layout>
        <Layout.Section>
          <Card>
            <SkeletonBodyText lines={15} />
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
};
