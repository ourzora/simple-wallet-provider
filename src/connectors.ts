/*
 * Thanks Uniswap ❤️🦄
 * https://github.com/Uniswap/uniswap-interface/blob/master/src/connectors/index.ts
 */

import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { ConnectorType, Web3ConfigurationContextType } from "./types";
import { LAST_CONNECTOR_KEY } from "./constants";

export function getConnectorType(connector: AbstractConnector) {
  if (connector instanceof WalletConnectConnector) {
    return ConnectorType.WALLETCONNECT;
  }
  return ConnectorType.INJECTED;
}

export function fetchLastConnectorType(
  connectors: NonNullable<Web3ConfigurationContextType["connectors"]>
): AbstractConnector {
  const last = sessionStorage.getItem(LAST_CONNECTOR_KEY);
  if (last === ConnectorType.WALLETCONNECT) {
    return connectors.walletConnectConnector;
  }

  return connectors.injectedConnector;
}

export function setLastConnectorType(connector?: AbstractConnector) {
  const connectorType = connector ? getConnectorType(connector) : undefined;
  if (!connectorType) {
    sessionStorage.removeItem(LAST_CONNECTOR_KEY);
    return;
  }

  return sessionStorage.setItem(LAST_CONNECTOR_KEY, connectorType);
}
