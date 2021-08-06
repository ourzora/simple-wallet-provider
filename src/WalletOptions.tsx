import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { SUPPORTED_WALLETS, WalletInfo } from "./utils/wallets";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { isClientSide } from "./constants";
import { isMobile } from "react-device-detect";
import { AbstractConnector } from "@web3-react/abstract-connector";
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from "@web3-react/walletconnect-connector";
import { WalletOption } from "./WalletOption";
import { UserRejectedRequestError as UserRejectedRequestErrorInjected } from "@web3-react/injected-connector";
import { Web3ConfigurationContext } from "./config";
import { useThemeConfig } from "./useThemeConfig";

export const WalletOptions: React.FC = () => {
  const { deactivate, error, active, activate } = useWeb3React();
  const { getStyles } = useThemeConfig();
  const { connectors, networkId } = useContext(Web3ConfigurationContext);

  // @ts-ignore
  const hasWeb3 = isClientSide && !!window?.web3;
  // @ts-ignore
  const hasInjected = isClientSide && !!window?.ethereum;
  // @ts-ignore
  const isMetaMask = isClientSide && !!window?.ethereum?.isMetaMask;

  const handleActivate = useCallback(
    async (
      connector: AbstractConnector,
      onError?: (error: Error) => void,
      throwErrors?: boolean
    ) => {
      if (
        connector instanceof WalletConnectConnector &&
        connector.walletConnectProvider?.wc?.uri
      ) {
        connector.walletConnectProvider = undefined;
      }

      await activate(connector, onError, throwErrors);
      return Promise.resolve();
    },
    [activate]
  );

  const walletOptions = useMemo(() => {
    const options = Object.values(SUPPORTED_WALLETS);

    if (isMobile) {
      return !hasWeb3 && !hasInjected ? options.filter((o) => o.mobile) : [];
    }

    if (!hasInjected) {
      return options.filter(
        (o) => !o.mobileOnly && o.connectorKey !== "injectedConnector"
      );
    }

    if (isMetaMask) {
      return options.filter((o) => o.name !== "Injected" && !o.mobileOnly);
    }

    return options.filter((o) => !o.mobileOnly);
  }, [hasInjected, hasWeb3, isMetaMask]);

  const renderWalletOptions = useMemo(
    () =>
      walletOptions.map((option: WalletInfo, idx) => {
        const { name, connectorKey, iconStyle } = option;
        if (!connectorKey || !connectors) {
          return null;
        }

        return (
          <WalletOption
            key={idx}
            iconStylesKey={iconStyle}
            onClick={() => handleActivate(connectors[connectorKey])}
          >
            {name}
          </WalletOption>
        );
      }),
    [handleActivate, walletOptions]
  );

  useEffect(() => {
    if (error && !active) {
      deactivate();
    }
    // reset modal state on next mount vs. preserve bad state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(error);

  return (
    <div {...getStyles("walletOptionsList")}>
      {renderWalletOptions}
      {error && (
        <div {...getStyles("walletError")}>
          {error instanceof UnsupportedChainIdError
            ? `Your wallet is connected to the wrong network, please connect it to ${
                networkId === 1 ? "mainnet" : "the rinkeby testnet"
              }`
            : error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ? "Looks like you didn't approve your wallet, if this was an accident please try again."
            : error?.message || "There was an error connecting to your wallet"}
        </div>
      )}
    </div>
  );
};
