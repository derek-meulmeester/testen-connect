import React from "react";
import { EmptyState, Page } from "@shopify/polaris";

export default function NotFound() {
  return (
    <Page fullWidth>
      <EmptyState
        fullWidth
        heading="404 - Not Found"
        secondaryAction={{
          content: "Return home",
          url: "/",
        }}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <p>
          Hmm looks like something went wrong. We can't find the page you're
          looking for.
        </p>
      </EmptyState>
    </Page>
  );
}
