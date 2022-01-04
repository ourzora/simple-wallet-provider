import { useThemeConfig } from "./useThemeConfig";
import { shortenAddress } from "../utils/address";
import { useWalletModalState } from "./useWalletModalState";
import { useAccount } from "wagmi";

export const useWalletButton = () => {
  const [{ data: account }, disconnect] = useAccount();
  const { getString } = useThemeConfig();
  const { openWallet } = useWalletModalState();

  const addressShortened = account
    ? shortenAddress(account.address)
    : undefined;
  const actionText = !account
    ? getString("CONNECT_WALLET_BUTTON_TEXT")
    : getString("DISCONNECT_WALLET_BUTTON_TEXT");
  return {
    active: !!account,
    openModal: () => openWallet(),
    buttonAction: () => {
      !!account ? disconnect() : openWallet();
    },
    connectedInfo: !!account
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
