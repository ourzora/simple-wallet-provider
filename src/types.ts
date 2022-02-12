import { Strings, Theme } from "./constants";

export type Web3ConfigurationContextType = {
  networkId?: number;
  rpcUrl?: string;
  connectors: any[];
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
