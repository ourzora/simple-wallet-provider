import { createContext } from "react";

export const WALLET_MODAL_NAME = "WALLET";

type ModalNameType = string | null;

export const WalletModalOpenContext = createContext<{
  openModalName: ModalNameType;
  setOpenModalName: (modalName: ModalNameType) => void;
}>({
  openModalName: null,
  setOpenModalName: (_modalName: ModalNameType) => {
    throw new Error("Open Modal Context Not Setup");
  },
});
