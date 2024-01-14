import React from "react";
import { useNavigate } from "react-router-dom";
import Flag from "react-world-flags";
import { IndexTable, Text, Link, EmptyState } from "@shopify/polaris";
import { format } from "@shopify/dates";

type Account = {
  id: string;
  type: string;
  country: string;
  email?: string;
  created: number;
};

type Props = {
  accounts: Account[];
  hasNext: boolean;
  hasPrevious: boolean;
  onNext(accountId: string): void;
  onPrevious(accountId: string): void;
};

export const AccountsTable = ({
  accounts,
  hasNext,
  hasPrevious,
  onNext,
  onPrevious,
}: Props) => {
  const navigate = useNavigate();

  const onNavigation = (id: string) => {
    navigate(`/accounts/${id}`);
  };

  return accounts && accounts.length ? (
    <IndexTable
      selectable={false}
      itemCount={accounts.length}
      sortColumnIndex={3}
      sortDirection="descending"
      sortable={[false, false, false, false, true]}
      headings={[
        { title: "ID" },
        { title: "Email" },
        { title: "Country" },
        { title: "Type" },
        { title: "Created" },
      ]}
      pagination={{
        hasNext,
        hasPrevious,
        onNext: () => {
          onNext(accounts[accounts.length - 1]?.id);
        },
        onPrevious: () => {
          onPrevious(accounts[0]?.id);
        },
      }}
    >
      {accounts.map(({ id, type, country, email, created }, index) => (
        <IndexTable.Row
          id={id}
          key={id}
          position={index}
          onNavigation={onNavigation}
        >
          <IndexTable.Cell>
            <Link monochrome dataPrimaryLink url={`/accounts/${id}/onboarding`}>
              <Text variant="bodyMd" fontWeight="bold" as="span">
                {id}
              </Text>
            </Link>
          </IndexTable.Cell>
          <IndexTable.Cell>{email}</IndexTable.Cell>
          <IndexTable.Cell>
            <Flag code={country} width="20" />
            <span style={{ marginLeft: "8px" }}>{country}</span>
          </IndexTable.Cell>
          <IndexTable.Cell>{type}</IndexTable.Cell>
          <IndexTable.Cell>
            {format(new Date(created * 1000), "YYYY-MM-DD")}
          </IndexTable.Cell>
        </IndexTable.Row>
      ))}
    </IndexTable>
  ) : (
    <EmptyState
      fullWidth
      heading="No Accounts"
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      <p>Click "Create Account" to create new accounts.</p>
    </EmptyState>
  );
};
