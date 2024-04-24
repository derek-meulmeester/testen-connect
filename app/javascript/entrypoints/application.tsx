import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider as PolarisProvider } from "@shopify/polaris";

import { SettingsContextProvider } from "@/context";
import { AdapterLink, DashboardFrame } from "@/components";

import "@shopify/polaris/build/esm/styles.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PolarisProvider i18n={{}} linkComponent={AdapterLink}>
        <BrowserRouter>
          <SettingsContextProvider>
            <DashboardFrame />
          </SettingsContextProvider>
        </BrowserRouter>
      </PolarisProvider>
    </QueryClientProvider>
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const node = document.getElementById("mount");
  const root = createRoot(node!);

  root.render(<App />);
});
