import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import {
  AccountsList,
  AccountOnboarding,
  Payments,
  Payouts,
  NotFound,
  Settings,
  AccountManagement,
  ProductsList,
  ProductPage,
  CustomersList,
  SubscriptionsList,
  Documents,
  InvoicesList,
} from "@/sections";

export function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/accounts" element={<AccountsList />} />
      <Route
        path="/accounts/:accountId/onboarding"
        element={<AccountOnboarding />}
      />
      <Route
        path="/accounts/:accountId/manage"
        element={<AccountManagement />}
      />
      <Route path="/accounts/:accountId/products" element={<ProductsList />} />
      <Route
        path="/accounts/:accountId/products/:productId"
        element={<ProductPage />}
      />
      <Route
        path="/accounts/:accountId/customers"
        element={<CustomersList />}
      />
      <Route
        path="/accounts/:accountId/subscriptions"
        element={<SubscriptionsList />}
      />
      <Route path="/accounts/:accountId/invoices" element={<InvoicesList />} />
      <Route path="/accounts/:accountId/payments" element={<Payments />} />
      <Route path="/accounts/:accountId/payouts" element={<Payouts />} />
      <Route path="/accounts/:accountId/documents" element={<Documents />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/" element={<Navigate replace to="/accounts" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
