import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Flag from "react-world-flags";
import { IndexTable, Text, Link, EmptyState } from "@shopify/polaris";
import { format } from "@shopify/dates";

export type Product = {
  id: string;
  active: boolean;
  default_price: string;
  description: string;
  livemode: boolean;
  name: string;
  object: string;
  type: string;
  created: number;
  updated: number;
};

type Props = {
  products: Product[];
  hasNext: boolean;
  hasPrevious: boolean;
  onNext(accountId: string): void;
  onPrevious(accountId: string): void;
};

export const ProductsTable = ({
  products,
  hasNext,
  hasPrevious,
  onNext,
  onPrevious,
}: Props) => {
  const { accountId } = useParams();
  const navigate = useNavigate();

  const onNavigation = (id: string) => {
    navigate(`/accounts/${accountId}/products/${id}`);
  };

  return products && products.length ? (
    <IndexTable
      selectable={false}
      itemCount={products.length}
      sortColumnIndex={3}
      sortDirection="descending"
      sortable={[false, false, false, false, true]}
      headings={[
        { title: "ID" },
        { title: "Name" },
        { title: "Description" },
        { title: "Active" },
        { title: "Created" },
      ]}
      pagination={{
        hasNext,
        hasPrevious,
        onNext: () => {
          onNext(products[products.length - 1]?.id);
        },
        onPrevious: () => {
          onPrevious(products[0]?.id);
        },
      }}
    >
      {products.map(({ id, name, description, active, created }, index) => (
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
              url={`/accounts/${accountId}/products/${id}`}
            >
              <Text variant="bodyMd" fontWeight="bold" as="span">
                {id}
              </Text>
            </Link>
          </IndexTable.Cell>
          <IndexTable.Cell>{name}</IndexTable.Cell>
          <IndexTable.Cell>{description}</IndexTable.Cell>
          <IndexTable.Cell>{`${active}`}</IndexTable.Cell>
          <IndexTable.Cell>
            {format(new Date(created * 1000), "YYYY-MM-DD")}
          </IndexTable.Cell>
        </IndexTable.Row>
      ))}
    </IndexTable>
  ) : (
    <EmptyState
      fullWidth
      heading="No Products"
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      <p>Click "Create Product" to create new products.</p>
    </EmptyState>
  );
};
