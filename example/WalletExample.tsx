import React from "react";
import {Web3ConfigProvider} from '../src/Web3ConfigProvider';
import { useWalletOpen } from "../src/useWalletOpen";

const CLIENT_INFO = {
  name: 'testing wallet connector',
  url: 'http://localhost:1234',
  description: 'testing wallet',
  icons: [],
};

const ConnectTrigger = () => {
  const {openWallet} = useWalletOpen();

  return (
    <button onClick={() => openWallet()}>
      open wallet
    </button>
  )

}

export const WalletExample = () => {

  return (
    <Web3ConfigProvider rpcUrl="https://google.com" networkId={1} clientInfo={CLIENT_INFO}>
      <ConnectTrigger />
    </Web3ConfigProvider>
  );
};
