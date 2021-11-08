import { useWeb3React } from "@web3-react/core";
import { SyntheticEvent, useCallback } from "react";

import { useThemeConfig } from "../hooks/useThemeConfig";
import { ModalOverlay } from "./ModalOverlay";
import { ModalContent } from "./ModalContent";
import { useWalletModalState } from "../hooks/useWalletModalState";
import { CloseButton } from "src/components/CloseButton";

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
  const { openWallet, closeModal, modalWalletOpen } = useWalletModalState();
  const { account } = useWeb3React();

  const openConnectWallet = useCallback((evt: SyntheticEvent) => {
    evt.preventDefault();
    openWallet();
  }, []);

  return (
    <ModalOverlay modalName={modalName} canClose>
      {account || modalWalletOpen ? (
        <ModalContent title={modalTitle} ariaLabel={modalDescription}>
          <div {...getStyles("modalHeader")}>
            <div>{modalTitle}</div>
            <button onClick={closeModal}>
              <CloseButton />
            </button>
          </div>
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
            {getString("PROMPT_PLEASE_CONNECT_PROMPT")}
            <a href="#" onClick={openConnectWallet}>
              {getString("PROMPT_CONNECT_ACTION")}
            </a>
            {getString("PROMPT_AFTER_CONNECT_TO_CONTINUE")}
          </div>
        </ModalContent>
      )}
    </ModalOverlay>
  );
};
