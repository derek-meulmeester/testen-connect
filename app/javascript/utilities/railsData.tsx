declare global {
  interface Window {
    RailsData?: Record<string, any>;
  }
}

export function railsData(path = "") {
  if (!isRailsDataPresent()) return;

  let result;
  let data = window.RailsData;

  path.split(".").forEach((key) => {
    if (!data) {
      return;
    }

    result = data[key];
    data = data[key];
  });

  return result;
}

export function isRailsDataPresent() {
  return Boolean(typeof window !== "undefined" && window.RailsData);
}
