import getCSRFToken from "@shopify/csrf-token-fetcher";

export const headers = () => {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "X-CSRF-Token": getCSRFToken(),
  };
};
