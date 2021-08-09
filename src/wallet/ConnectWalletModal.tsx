import { useThemeConfig } from "../hooks/useThemeConfig";
import { WalletOptions } from "./WalletOptions";
import { ModalActionLayout } from "../modal/ModalActionLayout";
import { WALLET_MODAL_NAME } from "../context/WalletModalOpenContext";

export const ConnectWalletModal = () => {
  const { getString, getStyles } = useThemeConfig();

  return (
    <ModalActionLayout
      modalName={WALLET_MODAL_NAME}
      modalTitle={getString("CONNECT_WALLET")}
      modalDescription={getString("CONNECT_WALLET_ARIA_LABEL")}
    >
      <div {...getStyles("walletOptionsWrapper")}>
        <WalletOptions />
      </div>
    </ModalActionLayout>
  );
};
