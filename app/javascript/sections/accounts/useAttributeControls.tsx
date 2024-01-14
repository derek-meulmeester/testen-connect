import React from "react";
import { useSearchParams } from "react-router-dom";
import { FormLayout, Checkbox, TextField, Text, Link } from "@shopify/polaris";

export const useAttributeControls = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = React.useState("");
  const [fullToSUrl, setFullToSUrl] = React.useState("");
  const [recipientToSUrl, setRecipientToSUrl] = React.useState("");
  const [skipTosCollection, setSkipTosCollection] = React.useState(
    searchParams.get("skipToS") === "true",
  );
  const [includeEventuallyDue, setIncludeEventuallyDue] = React.useState(
    searchParams.get("eventuallyDue") === "true",
  );
  const [includeFutureRequirements, setIncludeFutureRequirements] =
    React.useState(searchParams.get("futureRequirements") === "true");

  const updateSearch = React.useCallback(
    (key: string, value: string) => {
      searchParams.set(key, value);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  const attributeValues = {
    privacyPolicyUrl,
    fullToSUrl,
    recipientToSUrl,
    skipTosCollection,
    includeEventuallyDue,
    includeFutureRequirements,
  };

  const AttributeControls = (
    <FormLayout>
      <Text variant="headingMd" as="h6">
        Custom Attributes
      </Text>
      <TextField
        label="Privacy Policy URL"
        value={privacyPolicyUrl}
        onChange={(value) => setPrivacyPolicyUrl(value)}
        autoComplete="off"
        helpText="Link to your privacy policy"
      />
      <TextField
        label="Full ToS URL"
        value={fullToSUrl}
        onChange={(value) => setFullToSUrl(value)}
        autoComplete="off"
        helpText={
          <span>
            Link to your{" "}
            <Link
              monochrome
              url="https://stripe.com/docs/connect/service-agreement-types#full"
            >
              full terms of service
            </Link>{" "}
            agreement
          </span>
        }
      />
      <TextField
        label="Recipient ToS URL"
        value={recipientToSUrl}
        onChange={(value) => setRecipientToSUrl(value)}
        autoComplete="off"
        helpText={
          <span>
            Link to your{" "}
            <Link
              monochrome
              url="https://stripe.com/docs/connect/service-agreement-types#recipient"
            >
              recipient terms of service
            </Link>{" "}
            agreement
          </span>
        }
      />
      <Checkbox
        label="Skip ToS Collection"
        checked={skipTosCollection}
        onChange={(value) => {
          setSkipTosCollection(value);
          updateSearch("skipToS", `${value}`);
        }}
        helpText={
          <span>
            If true, embedded onboarding skips terms of service collection and
            you must{" "}
            <Link
              monochrome
              url="https://stripe.com/docs/connect/updating-accounts#indicating-acceptance"
            >
              collect terms acceptance yourself
            </Link>
          </span>
        }
      />
      <Checkbox
        label="Include eventually due"
        checked={includeEventuallyDue}
        onChange={(value) => {
          setIncludeEventuallyDue(value);
          updateSearch("eventuallyDue", `${value}`);
        }}
        helpText={
          <span>
            If true, embedded onboarding collects{" "}
            <Link
              monochrome
              url="https://stripe.com/docs/connect/supported-embedded-components#requirements-collection-options"
            >
              eventually_due requirements
            </Link>
          </span>
        }
      />
      <Checkbox
        label="Include future requirements"
        checked={includeFutureRequirements}
        onChange={(value) => {
          setIncludeFutureRequirements(value);
          updateSearch("futureRequirements", `${value}`);
        }}
        helpText={
          <span>
            If true, embedded onboarding collects{" "}
            <Link
              monochrome
              url="https://stripe.com/docs/api/accounts/object#account_object-future_requirements"
            >
              future_requirements
            </Link>
          </span>
        }
      />
    </FormLayout>
  );
  return {
    AttributeControls,
    attributeValues,
  };
};
