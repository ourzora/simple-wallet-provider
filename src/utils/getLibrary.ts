import { Web3Provider } from "@ethersproject/providers";

export const getLibraryByNetwork =
  (networkId: number) =>
  (provider: any): Web3Provider | undefined => {
    const library = new Web3Provider(provider, networkId);
    library.pollingInterval = 15000;
    return library;
  };
