import { ModalContent } from "./ModalContent";
import { ModalOverlay } from "./ModalOverlay";
import { useThemeConfig } from "./useThemeConfig";
import { WalletOptions } from "./WalletOptions";

export const ConnectWalletModal = () => {
  const { getString, getStyles } = useThemeConfig();

  return (
    <ModalOverlay canClose>
      <ModalContent
        title={getString("CONNECT_WALLET")}
        ariaLabel={getString("CONNECT_WALLET_ARIA_LABEL")}
      >
        <div {...getStyles("walletOptionsWrapper")}>
          <WalletOptions />
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};
