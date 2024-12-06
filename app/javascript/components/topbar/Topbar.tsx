import React, { useState } from "react";
import { TopBar as PolarisTopbar, TopBarProps } from "@shopify/polaris";
import { CodeIcon, SettingsIcon, NoteIcon } from "@shopify/polaris-icons";

export default function Topbar(topBarProps: TopBarProps) {
  const user = {
    firstName: "Testen",
    lastName: "Connect",
    email: "",
  };
  const detail =
    user?.firstName || user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : undefined;

  const [userMenuActive, setUserMenuActive] = useState(false);
  const toggleUserMenuActive = () => {
    setUserMenuActive((userMenuActive) => !userMenuActive);
  };

  const userMenuActions = [
    {
      items: [
        {
          icon: SettingsIcon,
          content: "Settings",
          url: "/settings",
        },
        {
          icon: CodeIcon,
          content: "Code",
          url: "https://github.com/derek-meulmeester/testen-connect",
        },
        {
          icon: NoteIcon,
          content: "Docs",
          url: "https://stripe.com/docs/connect/get-started-connect-embedded-components",
        },
      ],
    },
  ];

  const userMenuMarkup = user && (
    <PolarisTopbar.UserMenu
      actions={userMenuActions}
      name={user.email}
      detail={detail}
      initials={`${user.firstName}`[0] || user.email[0]}
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  return (
    <PolarisTopbar
      showNavigationToggle
      userMenu={userMenuMarkup}
      {...topBarProps}
    />
  );
}
