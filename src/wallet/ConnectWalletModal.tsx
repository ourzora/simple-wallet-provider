import { useThemeConfig } from "../hooks/useThemeConfig";
import { WalletOptions } from "./WalletOptions";
import { ModalActionLayout } from "../modal/ModalActionLayout";

export const ConnectWalletModal = () => {
  const { getString, getStyles } = useThemeConfig();

  return (
    <ModalActionLayout
      modalTitle={getString("CONNECT_WALLET")}
      modalDescription={getString("CONNECT_WALLET_ARIA_LABEL")}
    >
      <div {...getStyles("walletOptionsWrapper")}>
        <WalletOptions />
      </div>
    </ModalActionLayout>
  );
};
