import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Card, Page, Layout, DescriptionList, Banner } from "@shopify/polaris";
import { useNavigate, useParams } from "react-router-dom";

import { PageLoadingState, Product } from "@/components";
import { headers } from "@/utilities";
import queryString from "query-string";

export const ProductPage = () => {
  const navigate = useNavigate();
  const { accountId, productId } = useParams();
  const [archiveError, setArchiveError] = React.useState<string | undefined>();
  const retrieveProductApi = () =>
    axios
      .get(`/api/stripe/products/${productId}?account_id=${accountId}`)
      .then((res) => res.data);

  const { isPending, error, data } = useQuery({
    queryKey: ["productRetrieve", productId],
    queryFn: retrieveProductApi,
  });

  const archiveMutation = useMutation({
    mutationFn: () => {
      const data = {
        account_id: accountId,
        active: !product?.active,
      };

      return axios
        .post(`/api/stripe/products/${productId}/archive`, data, {
          headers: headers(),
        })
        .then((res) => res.data);
    },
    onSuccess: () => {
      navigate(`/accounts/${accountId}/products`);
    },
    onError: (error: AxiosError) => {
      const data = error?.response?.data as any;
      setArchiveError(data?.error || "Unexpected error archiving product");
    },
  });

  const handleCreatePaymentLink = React.useCallback(() => {
    window.open(
      `/api/stripe/accounts/${accountId}/products/${productId}/link`,
      "_blank"
    );
  }, []);

  const handleCreateCheckoutLink = React.useCallback(() => {
    const email = encodeURIComponent("derekm+123@stripe.com");
    window.open(
      `/api/stripe/accounts/${accountId}/products/${productId}/checkout?email=${email}`,
      "_blank"
    );
  }, []);

  if (isPending) {
    return <PageLoadingState />;
  }

  let content;
  const product: Product | undefined = data;
  if (error) {
    content = <p>{`An error has occurred: ${error.message}`}</p>;
  } else if (product) {
    const { name, description } = product;

    content = (
      <Card>
        <DescriptionList
          items={[
            {
              term: "Name",
              description: name,
            },
            {
              term: "Description",
              description: description,
            },
          ]}
        />
      </Card>
    );
  } else {
    content = <p>An unexpected error has occurred!</p>;
  }

  return (
    <Page
      title={product?.name}
      backAction={{ url: `/accounts/${accountId}/products` }}
      primaryAction={{
        content: "Create payment link",
        onAction: handleCreatePaymentLink,
      }}
      secondaryActions={[
        {
          content: "Invite customer",
          accessibilityLabel: "Invite customer",
          onAction: handleCreateCheckoutLink,
        },
        {
          content: product?.active ? "Archive" : "Activate",
          accessibilityLabel: "Archive product",
          loading: archiveMutation.isPending,
          onAction: () => {
            archiveMutation.mutate();
          },
        },
      ]}
    >
      <Layout>
        {archiveError && (
          <Layout.Section>
            <Banner tone="critical">
              <p>{archiveError}</p>
            </Banner>
          </Layout.Section>
        )}
        <Layout.Section>{content}</Layout.Section>
      </Layout>
    </Page>
  );
};
