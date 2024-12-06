import React from "react";
import { useLocation, matchPath } from "react-router-dom";
import { Navigation } from "@shopify/polaris";
import { PersonIcon, SettingsIcon } from "@shopify/polaris-icons";

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
            icon: PersonIcon,
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
                    label: "Payments",
                    url: `/accounts/${accountId}/payments`,
                  },
                  {
                    label: "Payouts",
                    url: `/accounts/${accountId}/payouts`,
                  },
                  {
                    label: "Documents",
                    url: `/accounts/${accountId}/documents`,
                  },
                ]
              : undefined,
          },
          {
            url: "/settings",
            label: "Settings",
            icon: SettingsIcon,
            onClick: onItemSelect,
            selected: pathname.startsWith("/settings"),
          },
        ]}
      />
    </Navigation>
  );
}
