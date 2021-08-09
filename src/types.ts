import type { InjectedConnector } from "@web3-react/injected-connector";
import type { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { Strings, Theme } from "./constants";

export type Web3ConfigurationContextType = {
  networkId?: number;
  rpcUrl?: string;
  connectors?: {
    walletConnectConnector?: WalletConnectConnector;
    injectedConnector: InjectedConnector;
  };
  theme: typeof Theme;
  strings: typeof Strings;
};

export enum ConnectorType {
  WALLETCONNECT = "WALLETCONNECT",
  INJECTED = "INJECTED",
}

export type WalletClientInfo = {
  name: string;
  url: string;
  description: string;
  icons: string[];
};

export enum ModalType {
  LIST_MODAL = "LIST_MODAL",
  BID_MODAL = "BID_MODAL",
  MANAGE_MODAL = "MANAGE_MODAL",
}
