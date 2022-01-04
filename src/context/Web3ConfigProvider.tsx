import { Web3ConfigurationContext } from "../config";
import { Fragment, ReactNode, useState } from "react";
import { Theme, Strings } from "../constants";
import { WalletModalOpenContext } from "./WalletModalOpenContext";
import { ConnectWalletModal } from "../wallet/ConnectWalletModal";
import {
  Provider as WAGMIProvider,
  InjectedConnector,
  WalletConnectConnector,
  WalletLinkConnector,
  defaultChains,
} from "wagmi";

type ChainConfig = { chainId?: number };

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
  const connectors = ({ chainId }: ChainConfig) => {
    const chain = defaultChains.find((x) => x.id === chainId)!;
    const chains = [chain];
    return [
      new InjectedConnector({ chains }),
      new WalletConnectConnector({
        chains,
        options: { rpc: rpcUrl, qrcode: true },
      }),
      new WalletLinkConnector({
        chains,
        options: {
          appName: document ? document.title : "DApp",
          jsonRpcUrl: rpcUrl,
        },
      }),
    ];
  };

  const config = {
    networkId: networkId,
    rpcUrl: rpcUrl,
    connectors,
    theme: Object.assign({}, Theme, theme),
    strings: Object.assign({}, Strings, strings),
  };

  const [openModalName, setOpenModalName] = useState<string | null>(null);

  return (
    <WalletModalOpenContext.Provider
      value={{ openModalName, setOpenModalName }}
    >
      <WAGMIProvider autoConnect connectors={connectors}>
        <Web3ConfigurationContext.Provider value={config}>
          <Fragment>
            <ConnectWalletModal />
            {children}
          </Fragment>
        </Web3ConfigurationContext.Provider>
      </WAGMIProvider>
    </WalletModalOpenContext.Provider>
  );
};
