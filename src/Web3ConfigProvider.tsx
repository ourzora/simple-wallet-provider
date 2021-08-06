import { Web3ConfigurationContext } from "./config";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { ReactNode, useMemo, useState } from "react";
import { WalletClientInfo } from "./types";
import { Theme, Strings } from "./constants";
import { WalletModalOpenContext } from "./WalletModalOpenContext";
import { ConnectWalletModal } from "./ConnectWalletModal";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibraryByNetwork } from "./utils/getLibrary";

export const Web3ConfigProvider = ({
  rpcUrl,
  networkId,
  children,
  clientInfo,
}: {
  rpcUrl: string;
  networkId: number;
  children: ReactNode;
  clientInfo: WalletClientInfo;
}) => {
  const injectedConnector = new InjectedConnector({
    supportedChainIds: [networkId],
  });

  const walletConnectConnector = new WalletConnectConnector({
    rpc: { [networkId]: rpcUrl },
    bridge: "https://zora.bridge.walletconnect.org",
    qrcode: true,
    pollingInterval: 15000,
    qrcodeModalOptions: {
      mobileLinks: ["rainbow", "metamask", "trust", "imtoken", "argent"],
    },
    clientMeta: clientInfo,
  });

  const config = {
    networkId: networkId,
    rpcUrl: rpcUrl,
    connectors: {
      injectedConnector,
      walletConnectConnector,
    },
    theme: Theme,
    strings: Strings,
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const getLibrary = useMemo(() => getLibraryByNetwork(networkId), [networkId]);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WalletModalOpenContext.Provider value={{ isOpen, setIsOpen }}>
        <Web3ConfigurationContext.Provider value={config}>
          <ConnectWalletModal />
          {children}
        </Web3ConfigurationContext.Provider>
      </WalletModalOpenContext.Provider>
    </Web3ReactProvider>
  );
};
