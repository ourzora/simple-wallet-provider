import { useContext } from "react";
import {
  WalletModalOpenContext,
  WALLET_MODAL_NAME,
} from "../context/WalletModalOpenContext";

export const useWalletModalState = () => {
  const openContext = useContext(WalletModalOpenContext);
  return {
    openWallet: () => {
      openContext.setOpenModalName(WALLET_MODAL_NAME);
    },
    openModalByName: (name: string) => {
      openContext.setOpenModalName(name);
    },
    closeModal: () => {
      openContext.setOpenModalName(null);
    },
    openModalName: openContext.openModalName,
    modalWalletOpen: openContext.openModalName === WALLET_MODAL_NAME,
  };
};
