import React from "react";
import { useQuery } from "@tanstack/react-query";
import { loadConnectAndInitialize } from "@stripe/connect-js";
import { ConnectComponentsProvider } from "@stripe/react-connect-js";
import axios, { AxiosError } from "axios";
import { Banner } from "@shopify/polaris";

import { headers, railsData } from "@/utilities";
import { useSettingsContext } from "@/context";
import { PageLoadingState } from "@/components";

interface Props {
  accountId: string;
}

export const StripeEmbeddedComponent = ({
  accountId,
  children,
}: React.PropsWithChildren<Props>) => {
  const { externalAccountCollection } = useSettingsContext();
  const [sessionError, setSessionError] = React.useState<string | undefined>(
    undefined,
  );
  const retrieveAccountApi = () =>
    axios.get(`/api/stripe/account/${accountId}`).then((res) => res.data);
  const {
    isPending,
    error: retrieveAccountError,
    data: account,
  } = useQuery({
    queryKey: ["accountRetrieve", accountId],
    queryFn: retrieveAccountApi,
  });

  const [stripeConnectInstance] = React.useState(() => {
    const fetchClientSecret = async () => {
      if (!accountId) {
        return undefined;
      }

      try {
        const data: Record<string, unknown> = {};
        if (account?.controller?.requirement_collection === "application") {
          data.externalAccountCollection = externalAccountCollection;
        }
        const url = `/api/stripe/account/${accountId}/account_session`;
        const response = await axios.post(url, data, {
          headers: headers(),
        });

        return response.data.client_secret;
      } catch (error) {
        const errorData = (error as AxiosError).response?.data as any;

        setSessionError(errorData?.error || "Unexpected error!");
        return undefined;
      }
    };

    return loadConnectAndInitialize({
      publishableKey: railsData("stripe.publishableKey"),
      fetchClientSecret,
      appearance: {
        overlays: "drawer",
        variables: {
          colorPrimary: "#3C3C3C",
          colorText: "#303030",
          buttonPrimaryColorBackground: "#3C3C3C",
          buttonPrimaryColorText: "#FFFFFF",
          buttonSecondaryColorBackground: "#FFFFFF",
          buttonSecondaryColorBorder: "#E5E5E5",
          buttonSecondaryColorText: "#1A1A1A",
          colorSecondaryText: "#616161",
          actionPrimaryColorText: "#3C3C3C",
          colorBorder: "#ADADAD",
          borderRadius: "8px",
          formHighlightColorBorder: "#3C3C3C",
          formAccentColor: "#3C3C3C",
          spacingUnit: "10px",
        },
      },
    });
  });

  if (retrieveAccountError) {
    return <Banner tone="critical">{retrieveAccountError.message}</Banner>;
  }

  if (isPending) {
    return <PageLoadingState />;
  }

  return (
    <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
      {sessionError && (
        <Banner tone="critical">
          <p>{sessionError}</p>
        </Banner>
      )}
      {children}
    </ConnectComponentsProvider>
  );
};
