import { useCallback, useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { isMobile } from "react-device-detect";
import { Web3ConfigurationContext } from "../config";
import { isClientSide } from "../constants";
import { fetchLastConnectorType } from "src/connectors";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useEagerConnect() {
  const { activate, active } = useWeb3React();
  const { connectors } = useContext(Web3ConfigurationContext);
  const [tried, setTried] = useState(false);

  const attemptEagerInjected = useCallback(async () => {
    if (!connectors) {
      return;
    }
    const isAuthorized = await connectors.injectedConnector.isAuthorized();
    if (isAuthorized) {
      activate(connectors.injectedConnector, undefined, true).catch(() => {
        setTried(true);
      });
    } else {
      // @ts-ignore
      if (isMobile && window.ethereum) {
        activate(connectors.injectedConnector, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    }
  }, [activate]);

  const attemptEagerDefault = useCallback(
    (connector: AbstractConnector) => {
      return activate(connector, undefined, true).catch(() => {
        setTried(true);
      });
    },
    [activate]
  );

  const attemptEager = useCallback(
    (connector: AbstractConnector) => {
      if (connector instanceof InjectedConnector) {
        return attemptEagerInjected();
      }

      return attemptEagerDefault(connector);
    },
    [attemptEagerDefault, attemptEagerInjected]
  );

  useEffect(() => {
    if (!isClientSide || tried || !connectors) {
      return;
    }

    delay(500).then(() => {
      const connector = fetchLastConnectorType(connectors);
      attemptEager(connector).catch(() => setTried(true));
    });
    setTried(true);
  }, [activate, attemptEager, tried]);

  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}
