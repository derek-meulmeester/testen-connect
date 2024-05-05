import React from "react";
import { useLocation, matchPath } from "react-router-dom";
import { Navigation } from "@shopify/polaris";
import { CustomersMajor, SettingsMinor } from "@shopify/polaris-icons";

interface Props {
  onItemSelect: () => void;
}

export default function Sidenav(props: Props) {
  const { pathname } = useLocation();
  const { onItemSelect } = props;
  const match = matchPath("/accounts/:accountId/*", pathname);
  const { accountId } = match?.params || {};

  return (
    <Navigation location="/">
      <Navigation.Section
        fill
        items={[
          {
            url: "/accounts",
            label: "Accounts",
            icon: CustomersMajor,
            onClick: onItemSelect,
            selected: pathname.startsWith("/accounts"),
            subNavigationItems: accountId
              ? [
                  {
                    label: "Onboarding",
                    url: `/accounts/${accountId}/onboarding`,
                  },
                  {
                    label: "Manage",
                    url: `/accounts/${accountId}/manage`,
                  },
                  {
                    label: "Products",
                    url: `/accounts/${accountId}/products`,
                  },
                  {
                    label: "Payments",
                    url: `/accounts/${accountId}/payments`,
                  },
                  {
                    label: "Payouts",
                    url: `/accounts/${accountId}/payouts`,
                  },
                ]
              : undefined,
          },
          {
            url: "/settings",
            label: "Settings",
            icon: SettingsMinor,
            onClick: onItemSelect,
            selected: pathname.startsWith("/settings"),
          },
        ]}
      />
    </Navigation>
  );
}
