import React, { PropsWithChildren, useMemo } from "react";

type SettingContextProps = {
  externalAccountCollection: boolean;
  setExternalAccountCollection(value: boolean): void;
};

const SettingsContext = React.createContext<SettingContextProps>({
  externalAccountCollection: false,
  setExternalAccountCollection: () => {},
});

export const useSettingsContext = () => React.useContext(SettingsContext);

export function SettingsContextProvider({
  children,
}: PropsWithChildren<Partial<SettingContextProps>>) {
  const [externalAccountCollection, _setExternalAccountCollection] =
    React.useState(
      localStorage.getItem("externalAccountCollection") === "true",
    );

  const setExternalAccountCollection = React.useCallback(
    (value: boolean) => {
      _setExternalAccountCollection(value);
      localStorage.setItem("externalAccountCollection", `${value}`);
    },
    [_setExternalAccountCollection],
  );

  const memoizedValue = useMemo(() => {
    return {
      externalAccountCollection,
      setExternalAccountCollection,
    };
  }, [externalAccountCollection, setExternalAccountCollection]);

  return (
    <SettingsContext.Provider value={memoizedValue}>
      {children}
    </SettingsContext.Provider>
  );
}
