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
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    text-align: center;
  `,
  modalText: css`
    position: relative;
    pointer-events: auto;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 2px, rgba(0, 0, 0, 0.1) 0px 2px 10px;
    border-radius: 4px;
  `,
  modalContent: css`
    pointer-events: none;
    display: flex;
    flex: auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    overflow-x: hidden;
  `,
  walletOptionsWrapper: css`
    padding: 15px;
  `,
  walletOption: css`
    background: #dedede;
    border: 0 none;
    position: relative;
    width: 100%;
    padding: 20px 30px;
    margin-bottom: 20px;
    cursor: pointer;
    transition: 0.3s background-color ease-in-out;
    border-radius: 6px;
    font: inherit;

    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      background: #bbb;
    }
  `,
  walletOptionsList: css`
    padding: 30px;
    background: white;
  `,
  walletError: css`
    color: #b22222;
    width: 100%;
    text-align: center;
    max-width: 420px;
  `,
  modalTitleText: css`
    margin-top: 2px;
    font-size: 1em;
  `,
  modalHeader: css`
    position: relative;
    border-bottom: 2px solid #dedede;
    display: flex;
    justify-content: space-between;
    padding: 14px;
    align-content: center;
  `,
  modalClose: css`
    background: #fff;
    padding: 4px;
    border: 0 none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: #eee;
    }
  `,
  injectedIcon: css``,
  metamaskIcon: css``,
  walletConnectIcon: css``,
  modalConnectWalletButtonStyle: css``,
  modalError: css`
    padding: 12px;
    color: #8b0000;
  `,
};

export const Strings = {
  CONNECT_WALLET: "Connect Wallet",
  CONNECT_WALLET_ARIA_LABEL: "connect wallet modal",
  CONNECT_WALLET_BUTTON_TEXT: "Connect Wallet",
  CONNECTED_BUTTON_TEXT: "Connected to ",
  DISCONNECT_WALLET_BUTTON_TEXT: "Disconnect Wallet",
  PROMPT_PLEASE_CONNECT_PROMPT: "Please",
  PROMPT_CONNECT_ACTION: "connect your wallet",
  PROMPT_AFTER_CONNECT_TO_CONTINUE: "to continue",
  WALLETLINK_APP_NAME: "",
  WALLETLINK_APP_LOGO_URL: "",
};
