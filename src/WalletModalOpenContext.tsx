import { createContext } from "react";

export const WalletModalOpenContext = createContext<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}>({ isOpen: false, setIsOpen: () => {} });
