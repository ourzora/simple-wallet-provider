import type { Provider } from "@ethersproject/providers";
import { useAccount } from "wagmi";

type MockWeb3Context = {
  provider: Provider,
  chainId: number,
  account?: string,
  deactivate: () => void,
};

/**
 * @deprecated useWeb3Context compat shim for `wagmi` hooks tool 
 * @returns provider shim
 */
export const useWeb3Context = (): MockWeb3Context => {
  const [{data: accountData}, disconnect] = useAccount();
  return {
    provider: accountData?.connector?.getProvider(),
    chainId: accountData?.connector?.getChainId(),
    account: accountData?.address,
    deactivate: disconnect,
  }
}