import { createContext } from "react";
import { Strings, Theme } from "./constants";
import type { Web3ConfigurationContextType } from "./types";

export const Web3ConfigurationContext =
  createContext<Web3ConfigurationContextType>({
    networkId: undefined,
    rpcUrl: undefined,
    connectors: undefined,
    theme: Theme,
    strings: Strings,
  });
