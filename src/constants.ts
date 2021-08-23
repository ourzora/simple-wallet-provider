import { css } from "@emotion/css";

export const LAST_CONNECTOR_KEY = "LAST_CONNECTOR";

export const isClientSide = typeof window !== "undefined";

export const Theme = {
  modalWrapper: css``,
  dialogOverlay: css`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0;
    margin: 0;
    z-index: 99999999;
    overflow: auto;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    text-align: center;
  `,
  modalText: css`
    pointer-events: auto;
    padding: 20px;
    background-color: white;
  `,
  modalContent: css`
    pointer-events: none;
    display: flex;
    flex: auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.05), 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 0;
    overflow-x: hidden;
  `,
  walletOptionsWrapper: css``,
  walletOption: css`
    position: relative;
    width: 100%;
    padding: 20px;
    margin-bottom: 20px;
    cursor: pointer;
    &:last-child {
      margin-bottom: 0;
    }
  `,
  walletOptionsList: css`
    padding: 30px;
    background: white;
  `,
  walletError: css`
    color: var(--punk-pink) !important;
    width: 100%;
    text-align: center;
  `,
  injectedIcon: css``,
  metamaskIcon: css``,
  walletConnectIcon: css``,
  modalConnectWalletButtonStyle: css``,
};

export const Strings = {
  CONNECT_WALLET: "connect wallet",
  CONNECT_WALLET_ARIA_LABEL: "connect wallet modal",
  CONNECT_WALLET_BUTTON_TEXT: "Connect Wallet",
  CONNECTED_BUTTON_TEXT: "Connected to ",
  DISCONNECT_WALLET_BUTTON_TEXT: "Disconnect Wallet",
};
