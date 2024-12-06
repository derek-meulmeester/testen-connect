/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { useNavigate } from "react-router-dom";
import Flag from "react-world-flags";
import {
  IndexTable,
  InlineStack,
  Text,
  Link,
  EmptyState,
  Icon,
} from "@shopify/polaris";
import { AlertCircleIcon, ClipboardCheckIcon } from "@shopify/polaris-icons";
import { format } from "@shopify/dates";

type AccountRequirements = {
  errors: string[];
};

type Account = {
  id: string;
  details_submitted?: boolean;
  type: string;
  business_type: string;
  country: string;
  email?: string;
  created: number;
  controller: {
    stripe_dashboard: {
      type: "full" | "express" | "none";
    };
  };
  requirements: AccountRequirements;
};

type Props = {
  accounts: Account[];
  hasNext: boolean;
  hasPrevious: boolean;
  onNext(accountId: string): void;
  onPrevious(accountId: string): void;
};

const AccountIcon = ({ details_submitted, requirements }: Account) => {
  if (requirements.errors.length > 0) {
    return (
      <div>
        <Icon source={AlertCircleIcon} tone="critical" />
      </div>
    );
  }

  if (details_submitted) {
    return (
      <div>
        <Icon source={ClipboardCheckIcon} tone="success" />
      </div>
    );
  }

  return null;
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
        { title: "Business type" },
        { title: "Type" },
        { title: "Dashboard" },
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
      {accounts.map((account, index) => {
        const { id, type, business_type, controller, country, email, created } =
          account;

        return (
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
                url={`/accounts/${id}/onboarding`}
              >
                <InlineStack gap="100" wrap={false} blockAlign="center">
                  <Text variant="bodyMd" fontWeight="bold" as="span">
                    {id}
                  </Text>

                  <AccountIcon {...account} />
                </InlineStack>
              </Link>
            </IndexTable.Cell>
            <IndexTable.Cell>{email}</IndexTable.Cell>
            <IndexTable.Cell>
              <Flag code={country} width="20" />
              <span style={{ marginLeft: "8px" }}>{country}</span>
            </IndexTable.Cell>
            <IndexTable.Cell>{business_type}</IndexTable.Cell>
            <IndexTable.Cell>{type}</IndexTable.Cell>
            <IndexTable.Cell>
              {controller?.stripe_dashboard?.type}
            </IndexTable.Cell>
            <IndexTable.Cell>
              {format(new Date(created * 1000), "YYYY-MM-DD")}
            </IndexTable.Cell>
          </IndexTable.Row>
        );
      })}
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
