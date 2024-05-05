import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IndexTable, Text, Link, EmptyState } from "@shopify/polaris";
import { format } from "@shopify/dates";

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  currency: string;
  created: number;
};

type Props = {
  customers: Customer[];
  hasNext: boolean;
  hasPrevious: boolean;
  onNext(accountId: string): void;
  onPrevious(accountId: string): void;
};

export const CustomersTable = ({
  customers,
  hasNext,
  hasPrevious,
  onNext,
  onPrevious,
}: Props) => {
  const { accountId } = useParams();
  const navigate = useNavigate();

  const onNavigation = (id: string) => {
    navigate(`/accounts/${accountId}/customers/${id}`);
  };

  return customers && customers.length ? (
    <IndexTable
      selectable={false}
      itemCount={customers.length}
      sortColumnIndex={3}
      sortDirection="descending"
      sortable={[false, false, false, false, true]}
      headings={[
        { title: "ID" },
        { title: "Name" },
        { title: "Email" },
        { title: "Phone" },
        { title: "Created" },
      ]}
      pagination={{
        hasNext,
        hasPrevious,
        onNext: () => {
          onNext(customers[customers.length - 1]?.id);
        },
        onPrevious: () => {
          onPrevious(customers[0]?.id);
        },
      }}
    >
      {customers.map(({ id, name, email, phone, created }, index) => (
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
              url={`/accounts/${accountId}/customers/${id}`}
            >
              <Text variant="bodyMd" fontWeight="bold" as="span">
                {id}
              </Text>
            </Link>
          </IndexTable.Cell>
          <IndexTable.Cell>{name}</IndexTable.Cell>
          <IndexTable.Cell>{email}</IndexTable.Cell>
          <IndexTable.Cell>{phone}</IndexTable.Cell>
          <IndexTable.Cell>
            {format(new Date(created * 1000), "YYYY-MM-DD")}
          </IndexTable.Cell>
        </IndexTable.Row>
      ))}
    </IndexTable>
  ) : (
    <EmptyState
      fullWidth
      heading="No Customers"
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      <p>
        Customers are automatically created when you generate and share a
        payment link from a product.
      </p>
    </EmptyState>
  );
};
