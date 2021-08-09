import { useWeb3React } from "@web3-react/core";
import { useThemeConfig } from "./useThemeConfig";
import { shortenAddress } from "../utils/address";
import { useWalletModalState } from "./useWalletModalState";

export const useWalletButton = () => {
  const { active, account, deactivate } = useWeb3React();
  const { getString } = useThemeConfig();
  const { openWallet } = useWalletModalState();

  const addressShortened = account ? shortenAddress(account) : undefined;
  const actionText = !account
    ? getString("CONNECT_WALLET_BUTTON_TEXT")
    : getString("DISCONNECT_WALLET_BUTTON_TEXT");
  return {
    active,
    openModal: () => openWallet(),
    buttonAction: () => {
      active ? deactivate() : openWallet();
    },
    connectedInfo: active
      ? `${getString("CONNECTED_BUTTON_TEXT")} ${addressShortened}`
      : undefined,
    account: account
      ? {
          address: account,
          addressShortened,
        }
      : undefined,
    actionText,
  };
};
