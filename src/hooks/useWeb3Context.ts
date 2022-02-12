import type { Provider } from "@ethersproject/providers";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

type MockWeb3Context = {
  provider: Provider;
  chainId?: number;
  account?: string;
  active: boolean;
  error?: Error;
  deactivate: () => void;
};

/**
 * @deprecated useWeb3Context compat shim for `wagmi` hooks tool
 * @returns provider shim
 */
export const useWeb3Context = (): MockWeb3Context => {
  const [{ data: accountData, error }, disconnect] = useAccount();
  // use default chainid
  const [chainId, setChainId] = useState(accountData?.connector?.chains[0].id);
  useEffect(() => {
    (async () => {
      // update with correct chainid
      setChainId(await accountData?.connector?.getChainId());
    })();
  });

  return {
    provider: accountData?.connector?.getProvider(),
    chainId,
    active: !!accountData,
    error,
    account: accountData?.address,
    deactivate: disconnect,
  };
};
