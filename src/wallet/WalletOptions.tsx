import React, { useEffect, useMemo } from "react";
import { WalletOption } from "./WalletOption";
import { useThemeConfig } from "../hooks/useThemeConfig";
import { useWalletModalState } from "../hooks/useWalletModalState";
import { useConnect } from "wagmi";

export const WalletOptions: React.FC = () => {
  const { getStyles } = useThemeConfig();
  const { closeModal, modalWalletOpen } = useWalletModalState();

  const [{ data, error }, connect] = useConnect();

  console.log({data})

  // Close modal if connected
  useEffect(() => {
    if (data.connected && modalWalletOpen) {
      closeModal();
    }
  }, [data.connected, modalWalletOpen, closeModal]);

  const renderWalletOptions = useMemo(
    () =>
      data.connectors.map((x) => (
        <WalletOption
          name={x.id}
          key={x.id}
          onClick={() => connect(x)}
          title={x.name}
        >
          {x.name}
          {!x.ready && " (unsupported)"}
        </WalletOption>
      )),
    [connect]
  );

  return (
    <div {...getStyles("walletOptionsList")}>
      {renderWalletOptions}
      {error && <div>{error?.message ?? "Failed to connect"}</div>}
    </div>
  );
};
