import { useContext } from "react";
import { WalletModalOpenContext } from "./WalletModalOpenContext";

export const useWalletOpen = () => {
  const openContext = useContext(WalletModalOpenContext);
  return {
    openWallet: () => {
      openContext.setIsOpen(true);
    },
  };
};
