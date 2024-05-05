import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Bleed, Card, Page, Layout } from "@shopify/polaris";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import {
  PageLoadingState,
  ProductCreateModal,
  ProductsTable,
} from "@/components";
import { PageInfo, pagingQueryParams } from "@/utilities";

export const ProductsList = () => {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const [searchParams] = useSearchParams();
  const [modalOpen, setModalOpen] = React.useState(
    searchParams.get("create") === "true"
  );
  const [pageInfo, setPageInfo] = React.useState<PageInfo>({
    limit: 15,
    page: 1,
  });

  const listProductsApi = () =>
    axios
      .get(
        `/api/stripe/products?account_id=${accountId}&${pagingQueryParams(pageInfo)}`
      )
      .then((res) => res.data);

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["productsList", accountId, pagingQueryParams(pageInfo)],
    queryFn: listProductsApi,
  });

  const onNext = React.useCallback(
    (cursor: string) => {
      const { page } = pageInfo;
      const newPage = page + 1;

      setPageInfo({
        ...pageInfo,
        page: newPage,
        direction: "next",
        cursor: cursor,
      });
    },
    [pageInfo, setPageInfo]
  );

  const onPrevious = React.useCallback(
    (cursor: string) => {
      const { page } = pageInfo;
      const newPage = page - 1 < 1 ? 1 : page - 1;

      setPageInfo({
        ...pageInfo,
        page: newPage,
        direction: newPage === 1 ? undefined : "previous",
        cursor: newPage === 1 ? undefined : cursor,
      });
    },
    [pageInfo, setPageInfo]
  );

  const onCreated = React.useCallback(
    (priceId: string) => {
      refetch();
      navigate(`/accounts/${accountId}/products/${priceId}`);
    },
    [refetch, navigate]
  );

  if (isPending) {
    return <PageLoadingState />;
  }

  let content;
  if (error) {
    content = <p>{`An error has occurred: ${error.message}`}</p>;
  } else if (data) {
    content = (
      <Card>
        <Bleed marginInline="400" marginBlock="400">
          <ProductsTable
            products={data.data}
            hasNext={data.has_more}
            hasPrevious={pageInfo.page > 1}
            onNext={onNext}
            onPrevious={onPrevious}
          />
        </Bleed>
      </Card>
    );
  } else {
    content = <p>An unexpected error has occurred!</p>;
  }

  return (
    <Page
      title="Products"
      primaryAction={{
        content: "Create Product",
        onAction: () => {
          setModalOpen(true);
        },
      }}
    >
      <Layout>
        <Layout.Section>{content}</Layout.Section>
      </Layout>
      <ProductCreateModal
        open={modalOpen}
        onCreated={onCreated}
        onClose={() => {
          setModalOpen(false);
        }}
      />
    </Page>
  );
};
