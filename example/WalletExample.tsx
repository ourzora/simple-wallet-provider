import React, { Fragment } from "react";
import { Web3ConfigProvider } from "../src/Web3ConfigProvider";
import { useWalletState } from "../src/useWalletState";

const CLIENT_INFO = {
  name: "testing wallet connector",
  url: "http://localhost:1234",
  description: "testing wallet",
  icons: [],
};

const ConnectTrigger = () => {
  const { buttonAction, actionText, connectedInfo } = useWalletState();

  return (
    <Fragment>
      {connectedInfo}
      <button onClick={() => buttonAction()}>{actionText}</button>
    </Fragment>
  );
};

export const WalletExample = () => {
  return (
    <Web3ConfigProvider rpcUrl="" networkId={1} clientInfo={CLIENT_INFO}>
      <ConnectTrigger />
    </Web3ConfigProvider>
  );
};
