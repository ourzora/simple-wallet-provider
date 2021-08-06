import { getAddress, isAddress } from "@ethersproject/address";

export function shortenAddress(address: string, chars = 4): string {
  const isValid = isAddress(address);
  if (!isValid) {
    console.error(`Invalid 'address' parameter '${address}'.`);
    return "";
  }

  const parsed = getAddress(address);
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}
