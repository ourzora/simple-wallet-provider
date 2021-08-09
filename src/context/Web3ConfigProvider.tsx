import { Web3ConfigurationContext } from "../config";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { Fragment, ReactNode, useMemo, useState } from "react";
import { WalletClientInfo } from "../types";
import { Theme, Strings } from "../constants";
import { WalletModalOpenContext } from "./WalletModalOpenContext";
import { ConnectWalletModal } from "../wallet/ConnectWalletModal";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibraryByNetwork } from "../utils/getLibrary";
import Web3ReactManager from "./Web3ReactManager";

export const Web3ConfigProvider = ({
  rpcUrl,
  networkId,
  children,
  clientInfo,
  theme = {},
  strings = {},
}: {
  theme?: Partial<typeof Theme>;
  strings?: Partial<typeof Strings>;
  rpcUrl?: string;
  networkId: number;
  children: ReactNode;
  clientInfo: WalletClientInfo;
}) => {
  const injectedConnector = new InjectedConnector({
    supportedChainIds: [networkId],
  });

  const walletConnectConnector = rpcUrl
    ? new WalletConnectConnector({
        rpc: { [networkId]: rpcUrl },
        bridge: "https://zora.bridge.walletconnect.org",
        qrcode: true,
        pollingInterval: 15000,
        qrcodeModalOptions: {
          mobileLinks: ["rainbow", "metamask", "trust", "imtoken", "argent"],
        },
        clientMeta: clientInfo,
      })
    : undefined;

  const config = {
    networkId: networkId,
    rpcUrl: rpcUrl,
    connectors: {
      injectedConnector,
      walletConnectConnector,
    },
    theme: Object.assign({}, Theme, theme),
    strings: Object.assign({}, Strings, strings),
  };

  const [openModalName, setOpenModalName] = useState<string | null>(null);
  const getLibrary = useMemo(() => getLibraryByNetwork(networkId), [networkId]);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WalletModalOpenContext.Provider
        value={{ openModalName, setOpenModalName }}
      >
        <Web3ConfigurationContext.Provider value={config}>
          <Web3ReactManager>
            <Fragment>
              <ConnectWalletModal />
              {children}
            </Fragment>
          </Web3ReactManager>
        </Web3ConfigurationContext.Provider>
      </WalletModalOpenContext.Provider>
    </Web3ReactProvider>
  );
};
