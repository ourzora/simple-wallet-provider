import React, { Fragment } from "react";
import { useWalletButton, Web3ConfigProvider } from "../src/";

const ConnectTrigger = () => {
  const { buttonAction, actionText, connectedInfo } = useWalletButton();

  return (
    <Fragment>
      {connectedInfo}
      <button onClick={() => buttonAction()}>{actionText}</button>
    </Fragment>
  );
};

export const WalletExample = () => {
  return (
    <Web3ConfigProvider rpcUrl={undefined} networkId={1}>
      <ConnectTrigger />
    </Web3ConfigProvider>
  );
};
