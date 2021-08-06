import { useWeb3React } from "@web3-react/core";
import { useContext } from "react";
import { useThemeConfig } from "./useThemeConfig";
import { shortenAddress } from "./utils/address";
import { WalletModalOpenContext } from "./WalletModalOpenContext";

export const useWalletState = () => {
  const { active, account, deactivate } = useWeb3React();
  const { getString } = useThemeConfig();
  const {setIsOpen} = useContext(WalletModalOpenContext);
  const addressShortened = account ? shortenAddress(account) : undefined
  const actionText = !account
    ? getString("CONNECT_WALLET_BUTTON_TEXT")
    : getString("DISCONNECT_WALLET_BUTTON_TEXT");
  return {
    active,
    openModal: () => setIsOpen(true),
    buttonAction: () => {
      active ? deactivate() : setIsOpen(true)
    },
    connectedInfo: active ? `${getString("CONNECTED_BUTTON_TEXT")} ${addressShortened}` : undefined,
    account: account
      ? {
          address: account,
          addressShortened
        }
      : undefined,
    actionText,
  };
};
