import { useThemeConfig } from "../hooks/useThemeConfig";
import { ModalOverlay } from "./ModalOverlay";
import { ModalContent } from "./ModalContent";
import { useWeb3React } from "@web3-react/core";
import { SyntheticEvent, useCallback } from "react";
import { useWalletModalState } from "src/hooks/useWalletModalState";

export const ModalActionLayout = ({
  children,
  error,
  modalTitle,
  modalName,
  modalDescription,
}: {
  modalTitle: string;
  modalDescription: string;
  modalName: string;
  children: any;
  error?: string;
}) => {
  const { getString, getStyles } = useThemeConfig();
  const { openWallet, modalWalletOpen } = useWalletModalState();
  const { account } = useWeb3React();

  const openConnectWallet = useCallback((evt: SyntheticEvent) => {
    evt.preventDefault();
    openWallet();
  }, []);

  return (
    <ModalOverlay modalName={modalName} canClose>
      {account || modalWalletOpen ? (
        <ModalContent title={modalTitle} ariaLabel={modalDescription}>
          <div {...getStyles("modalText")}>
            {children}
            {error && (
              <p className="error">
                <br />
                {error}
              </p>
            )}
          </div>
        </ModalContent>
      ) : (
        <ModalContent
          title={getString("CONNECT_WALLET")}
          ariaLabel={getString("CONNECT_WALLET")}
        >
          <div {...getStyles("modalText")}>
            Please
            <a href="#" onClick={openConnectWallet}>
              connect your wallet
            </a>
            to continue
          </div>
        </ModalContent>
      )}
    </ModalOverlay>
  );
};
