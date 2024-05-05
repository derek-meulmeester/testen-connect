import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IndexTable, Text, Link, EmptyState } from "@shopify/polaris";
import { format } from "@shopify/dates";

export type Subscription = {
  id: string;
  status: string;
  customer: string;
  currency: string;
  created: number;
};

type Props = {
  subscriptions: Subscription[];
  hasNext: boolean;
  hasPrevious: boolean;
  onNext(accountId: string): void;
  onPrevious(accountId: string): void;
};

export const SubscriptionsTable = ({
  subscriptions,
  hasNext,
  hasPrevious,
  onNext,
  onPrevious,
}: Props) => {
  const { accountId } = useParams();
  const navigate = useNavigate();

  const onNavigation = (id: string) => {
    navigate(`/accounts/${accountId}/subscriptions/${id}`);
  };

  return subscriptions && subscriptions.length ? (
    <IndexTable
      selectable={false}
      itemCount={subscriptions.length}
      sortColumnIndex={3}
      sortDirection="descending"
      sortable={[false, false, false, false, true]}
      headings={[
        { title: "ID" },
        { title: "Customer" },
        { title: "Status" },
        { title: "Currency" },
        { title: "Created" },
      ]}
      pagination={{
        hasNext,
        hasPrevious,
        onNext: () => {
          onNext(subscriptions[subscriptions.length - 1]?.id);
        },
        onPrevious: () => {
          onPrevious(subscriptions[0]?.id);
        },
      }}
    >
      {subscriptions.map(
        ({ id, customer, status, currency, created }, index) => (
          <IndexTable.Row
            id={id}
            key={id}
            position={index}
            onNavigation={onNavigation}
          >
            <IndexTable.Cell>
              <Link
                monochrome
                dataPrimaryLink
                url={`/accounts/${accountId}/subscriptions/${id}`}
              >
                <Text variant="bodyMd" fontWeight="bold" as="span">
                  {id}
                </Text>
              </Link>
            </IndexTable.Cell>
            <IndexTable.Cell>{customer}</IndexTable.Cell>
            <IndexTable.Cell>{status}</IndexTable.Cell>
            <IndexTable.Cell>{`${currency}`.toUpperCase()}</IndexTable.Cell>
            <IndexTable.Cell>
              {format(new Date(created * 1000), "YYYY-MM-DD")}
            </IndexTable.Cell>
          </IndexTable.Row>
        )
      )}
    </IndexTable>
  ) : (
    <EmptyState
      fullWidth
      heading="No subscriptions"
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      <p>
        Create products which are sold on a recurring basis. When a Customer
        pays through a payment link, subscriptions will automatically get
        created.
      </p>
    </EmptyState>
  );
};
