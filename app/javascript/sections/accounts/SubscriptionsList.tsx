import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Bleed, Card, Page, Layout } from "@shopify/polaris";
import { useParams } from "react-router-dom";

import { SubscriptionsTable, PageLoadingState } from "@/components";
import { PageInfo, pagingQueryParams } from "@/utilities";

export const SubscriptionsList = () => {
  const { accountId } = useParams();
  const [pageInfo, setPageInfo] = React.useState<PageInfo>({
    limit: 15,
    page: 1,
  });

  const listSubscriptionsApi = () =>
    axios
      .get(
        `/api/stripe/subscriptions?account_id=${accountId}&${pagingQueryParams(pageInfo)}`
      )
      .then((res) => res.data);

  const { isPending, error, data } = useQuery({
    queryKey: ["subscriptionsList", accountId, pagingQueryParams(pageInfo)],
    queryFn: listSubscriptionsApi,
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
          <SubscriptionsTable
            subscriptions={data.data}
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
    <Page title="Subscriptions">
      <Layout>
        <Layout.Section>{content}</Layout.Section>
      </Layout>
    </Page>
  );
};
