import { Web3ConfigurationContext } from "../config";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { Fragment, ReactNode, useMemo, useState } from "react";
import { Theme, Strings } from "../constants";
import { WalletModalOpenContext } from "./WalletModalOpenContext";
import { ConnectWalletModal } from "../wallet/ConnectWalletModal";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibraryByNetwork } from "../utils/getLibrary";
import Web3ReactManager from "./Web3ReactManager";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import WalletLink from "walletlink";

export const Web3ConfigProvider = ({
  rpcUrl,
  networkId,
  children,
  theme = {},
  strings = {},
}: {
  theme?: Partial<typeof Theme>;
  strings?: Partial<typeof Strings>;
  rpcUrl?: string;
  networkId: number;
  children: ReactNode;
}) => {
  const injectedConnector = new InjectedConnector({
    supportedChainIds: [networkId],
  });

  let walletConnectConnector = undefined;
  if (rpcUrl) {
    const walletConnectConfig = {
      rpc: { [networkId]: rpcUrl },
      qrcode: true,
    };

    walletConnectConnector = new WalletConnectConnector(walletConnectConfig);

    // Workaround to skip dynamic provider load
    walletConnectConnector.walletConnectProvider = new WalletConnectProvider(
      walletConnectConfig
    );
  }

  let walletLinkConnector = undefined;
  if (rpcUrl && strings.WALLETLINK_APP_NAME) {
    const walletLinkConfig = {
      url: rpcUrl,
      supportedChainIds: [networkId],
      appName: strings.WALLETLINK_APP_NAME,
      appLogoUrl:
        strings.WALLETLINK_APP_LOGO_URL === ""
          ? undefined
          : strings.WALLETLINK_APP_LOGO_URL,
    };

    walletLinkConnector = new WalletLinkConnector(walletLinkConfig);
    walletLinkConnector.walletLink = new WalletLink(walletLinkConfig);
    // @ts-ignore
    walletLinkConnector.provider =
      walletLinkConnector.walletLink.makeWeb3Provider(rpcUrl, networkId);
  }

  const config = {
    networkId: networkId,
    rpcUrl: rpcUrl,
    connectors: {
      injectedConnector,
      walletConnectConnector,
      walletLinkConnector,
    },
    theme: Object.assign({}, Theme, theme),
    strings: Object.assign({}, Strings, strings),
  };

  const [openModalName, setOpenModalName] = useState<string | null>(null);
  const getLibrary = useMemo(() => getLibraryByNetwork(networkId), [networkId]);

  return (
    <WalletModalOpenContext.Provider
      value={{ openModalName, setOpenModalName }}
    >
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ConfigurationContext.Provider value={config}>
          <Web3ReactManager>
            <Fragment>
              <ConnectWalletModal />
              {children}
            </Fragment>
          </Web3ReactManager>
        </Web3ConfigurationContext.Provider>
      </Web3ReactProvider>
    </WalletModalOpenContext.Provider>
  );
};
