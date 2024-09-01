/* eslint-disable @typescript-eslint/naming-convention */
import { capabilityReducer } from "./capabilities";

export const accountTypes = [
  { label: "Custom", value: "custom" },
  { label: "Express", value: "express" },
  { label: "Standard", value: "standard" },
  { label: "UA1", value: "ua1" },
  { label: "UA2", value: "ua2" },
  { label: "UA3", value: "ua3" },
  { label: "UA5", value: "ua5" },
  { label: "UA7", value: "ua7" },
];

export const countries = [
  { label: "United States", value: "US" },
  { label: "Australia", value: "AU" },
  { label: "Austria", value: "AT" },
  { label: "Belgium", value: "BE" },
  { label: "Brazil", value: "BR" },
  { label: "Bulgaria", value: "BG" },
  { label: "Canada", value: "CA" },
  { label: "Croatia", value: "HR" },
  { label: "Cyprus", value: "CY" },
  { label: "Czech", value: "CZ" },
  { label: "Denmark", value: "DK" },
  { label: "Estonia", value: "EE" },
  { label: "Finland", value: "FI" },
  { label: "France", value: "FR" },
  { label: "Germany", value: "DE" },
  { label: "Ghana", value: "GH" },
  { label: "Gibraltar", value: "GI" },
  { label: "Greece", value: "GR" },
  { label: "Hong", value: "HK" },
  { label: "Hungary", value: "HU" },
  { label: "India", value: "IN" },
  { label: "Indonesi", value: "ID" },
  { label: "Ireland", value: "IE" },
  { label: "Italy", value: "IT" },
  { label: "Japan", value: "JP" },
  { label: "Kenya", value: "KE" },
  { label: "Latvia", value: "LV" },
  { label: "Liechtenstein", value: "LI" },
  { label: "Lithuania", value: "LT" },
  { label: "Luxembourg", value: "LU" },
  { label: "Malaysia", value: "MY" },
  { label: "Malta", value: "MT" },
  { label: "Mexico", value: "MX" },
  { label: "Netherlands", value: "NL" },
  { label: "New Zealand", value: "NZ" },
  { label: "Nigeria", value: "NG" },
  { label: "Norway", value: "NO" },
  { label: "Poland", value: "PL" },
  { label: "Portugal", value: "PT" },
  { label: "Romania", value: "RO" },
  { label: "Singapore", value: "SG" },
  { label: "Slovakia", value: "SK" },
  { label: "Slovenia", value: "SI" },
  { label: "South Africa", value: "ZA" },
  { label: "Spain", value: "ES" },
  { label: "Sweden", value: "SE" },
  { label: "Switzerland", value: "CH" },
  { label: "Thailand", value: "TH" },
  { label: "United Arab Emirates", value: "AE" },
  { label: "United Kingdom", value: "GB" },
];

const typeConfigs = {
  standard: { type: "standard" },
  custom: { type: "custom" },
  express: { type: "express" },
  ua1: {
    controller: {
      fees: { payer: "application" },
      losses: { payments: "stripe" },
      requirement_collection: "stripe",
      stripe_dashboard: { type: "full" },
    },
  },
  ua2: {
    controller: {
      fees: { payer: "account" },
      losses: { payments: "stripe" },
      requirement_collection: "stripe",
      stripe_dashboard: { type: "full" },
    },
  },
  ua3: {
    controller: {
      fees: { payer: "account" },
      losses: { payments: "application" },
      requirement_collection: "stripe",
      stripe_dashboard: { type: "express" },
    },
  },
  ua5: {
    controller: {
      fees: { payer: "application" },
      losses: { payments: "application" },
      requirement_collection: "stripe",
      stripe_dashboard: { type: "express" },
    },
  },
  ua7: {
    controller: {
      fees: { payer: "account" },
      losses: { payments: "stripe" },
      requirement_collection: "stripe",
      stripe_dashboard: { type: "none" },
    },
  },
};

type AccountCreateOptions = {
  type: string;
  country: string;
  email?: string;
  capabilities: string[];
};

export const formatAccountCreateData = ({
  type,
  country,
  email,
  capabilities,
}: AccountCreateOptions) => {
  const data: Record<string, unknown> = {
    ...typeConfigs[type],
    country,
    capabilities: capabilities.length
      ? capabilities.reduce(capabilityReducer, {})
      : undefined,
  };

  if (email) {
    data.email = email;
  }

  return data;
};
