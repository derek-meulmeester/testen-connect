import React from "react";
import { Frame } from "@shopify/polaris";

import { DashboardRoutes } from "./DashboardRoutes";

import { Topbar, Sidenav } from "@/components";

const logo = {
  topBarSource: "/images/logo.png",
  width: 160,
  url: "/",
  accessibilityLabel: "Testen-Connect",
};

export default function DashboardFrame() {
  const [mobileNavigationActive, setMobileNavigationActive] =
    React.useState(false);
  const toggleMobileNavigationActive = React.useCallback(() => {
    setMobileNavigationActive(
      (mobileNavigationActive) => !mobileNavigationActive,
    );
  }, []);

  return (
    <Frame
      logo={logo}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigationActive}
      topBar={<Topbar onNavigationToggle={toggleMobileNavigationActive} />}
      navigation={
        <Sidenav
          onItemSelect={() => {
            if (mobileNavigationActive) {
              toggleMobileNavigationActive();
            }
          }}
        />
      }
    >
      <DashboardRoutes />
    </Frame>
  );
}
