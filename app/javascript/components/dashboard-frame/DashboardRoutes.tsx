import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import {
  AccountsList,
  AccountOnboarding,
  Payments,
  Payouts,
  NotFound,
  Settings,
} from "@/sections";

export function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/accounts" element={<AccountsList />} />
      <Route
        path="/accounts/:accountId/onboarding"
        element={<AccountOnboarding />}
      />
      <Route path="/accounts/:accountId/payments" element={<Payments />} />
      <Route path="/accounts/:accountId/payouts" element={<Payouts />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/" element={<Navigate replace to="/accounts" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
