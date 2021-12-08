import type { InjectedConnector } from "@web3-react/injected-connector";
import type { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { Strings, Theme } from "./constants";

export type Web3ConfigurationContextType = {
  networkId?: number;
  rpcUrl?: string;
  connectors?: {
    walletConnectConnector?: WalletConnectConnector;
    walletLinkConnector?: WalletLinkConnector;
    injectedConnector: InjectedConnector;
  };
  theme: typeof Theme;
  strings: typeof Strings;
};

export enum ConnectorType {
  WALLETCONNECT = "WALLETCONNECT",
  WALLETLINK = "WALLETLINK",
  INJECTED = "INJECTED",
}

export enum ModalType {
  LIST_MODAL = "LIST_MODAL",
  BID_MODAL = "BID_MODAL",
  MANAGE_MODAL = "MANAGE_MODAL",
}
