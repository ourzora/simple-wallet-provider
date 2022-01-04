import { SyntheticEvent, useCallback } from "react";

import { useThemeConfig } from "../hooks/useThemeConfig";
import { ModalOverlay } from "./ModalOverlay";
import { ModalContent } from "./ModalContent";
import { useWalletModalState } from "../hooks/useWalletModalState";
import { CloseButton } from "../components/CloseButton";
import { useConnect } from "wagmi";

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
  const [{ data: account }] = useConnect();

  const openConnectWallet = useCallback((evt: SyntheticEvent) => {
    evt.preventDefault();
    openWallet();
  }, []);

  return (
    <ModalOverlay modalName={modalName} canClose={true}>
      {!!account || modalWalletOpen ? (
        <ModalContent title={modalTitle} ariaLabel={modalDescription}>
          <div {...getStyles("modalText")}>
            <div {...getStyles("modalHeader")}>
              <div {...getStyles("modalTitleText")}>{modalTitle}</div>
              <button {...getStyles("modalClose")} onClick={closeModal}>
                <CloseButton />
              </button>
            </div>
            {children}
            {error && (
              <p {...getStyles("modalError")}>
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
