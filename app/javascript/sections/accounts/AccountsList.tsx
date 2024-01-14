import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Bleed, Card, Page, Layout } from "@shopify/polaris";
import { useNavigate, useSearchParams } from "react-router-dom";

import { AccountCreateModal, AccountsTable } from "@/components";
import { AccountsListSkeleton } from "@/sections";
import { PageInfo, pagingQueryParams } from "@/utilities";

export const AccountsList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [modalOpen, setModalOpen] = React.useState(
    searchParams.get("create") === "true",
  );
  const [pageInfo, setPageInfo] = React.useState<PageInfo>({
    limit: 15,
    page: 1,
  });

  const listAccountsApi = () =>
    axios
      .get(`/api/stripe/accounts?${pagingQueryParams(pageInfo)}`)
      .then((res) => res.data);

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["accountsList", pagingQueryParams(pageInfo)],
    queryFn: listAccountsApi,
  });

  const onNext = React.useCallback(
    (accountId: string) => {
      const { page } = pageInfo;
      const newPage = page + 1;

      setPageInfo({
        ...pageInfo,
        page: newPage,
        direction: "next",
        cursor: accountId,
      });
    },
    [pageInfo, setPageInfo],
  );

  const onPrevious = React.useCallback(
    (accountId: string) => {
      const { page } = pageInfo;
      const newPage = page - 1 < 1 ? 1 : page - 1;

      setPageInfo({
        ...pageInfo,
        page: newPage,
        direction: newPage === 1 ? undefined : "previous",
        cursor: newPage === 1 ? undefined : accountId,
      });
    },
    [pageInfo, setPageInfo],
  );

  const onCreated = React.useCallback(
    (accountId: string) => {
      refetch();
      navigate(`/accounts/${accountId}/onboarding`);
    },
    [refetch, navigate],
  );

  if (isPending) {
    return <AccountsListSkeleton />;
  }

  let content;
  if (error) {
    content = <p>{`An error has occurred: ${error.message}`}</p>;
  } else if (data) {
    content = (
      <Card>
        <Bleed marginInline="400" marginBlock="400">
          <AccountsTable
            accounts={data.data}
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
      title="Accounts"
      primaryAction={{
        content: "Create Account",
        onAction: () => {
          setModalOpen(true);
        },
      }}
    >
      <Layout>
        <Layout.Section>{content}</Layout.Section>
      </Layout>
      <AccountCreateModal
        open={modalOpen}
        onCreated={onCreated}
        onClose={() => {
          setModalOpen(false);
        }}
      />
    </Page>
  );
};
