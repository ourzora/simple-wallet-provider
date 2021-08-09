import { Theme } from "../constants";
import { Web3ConfigurationContextType } from "../types";

type ConnectorsType = NonNullable<Web3ConfigurationContextType["connectors"]>;
export interface WalletInfo {
  connectorKey: keyof ConnectorsType;
  name: string;
  iconStyle: keyof typeof Theme;
  description: string;
  mobile?: true;
  mobileOnly?: true;
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connectorKey: "injectedConnector",
    name: "Injected",
    iconStyle: "injectedIcon",
    description: "Injected web3 provider.",
  },
  METAMASK: {
    connectorKey: "injectedConnector",
    name: "MetaMask",
    iconStyle: "metamaskIcon",
    description: "Easy-to-use browser extension.",
  },
  WALLET_CONNECT: {
    connectorKey: "walletConnectConnector",
    name: "WalletConnect",
    iconStyle: "walletConnectIcon",
    description: "Connect to Trust Wallet, Rainbow Wallet and more...",
    mobile: true,
  },
};
