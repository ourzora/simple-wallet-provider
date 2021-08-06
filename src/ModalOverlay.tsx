import { Fragment, ReactNode, useCallback, useContext, useEffect } from "react";
import { DialogOverlay } from "@reach/dialog";
import { WalletModalOpenContext } from "./WalletModalOpenContext";
import { useThemeConfig } from "./useThemeConfig";

export const ModalOverlay = ({
  children,
  canClose,
}: {
  children: ReactNode;
  canClose: boolean;
}) => {
  const { isOpen, setIsOpen } = useContext(WalletModalOpenContext);
  const { getStyles } = useThemeConfig();

  const handleOnDismiss = useCallback(() => {
    console.log("dismiss");
    if (canClose && setIsOpen) {
      setIsOpen(false);
    }
  }, [canClose, setIsOpen]);

  const onEscape = useCallback(
    (e: KeyboardEvent) => {
      if (!canClose) {
        return;
      }

      if (e.key === "Escape") {
        return setIsOpen(false);
      }
    },
    [canClose, setIsOpen]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.document.addEventListener("keydown", onEscape, true);
    return () => {
      window.document.removeEventListener("keydown", onEscape, true);
    };
  });

  return isOpen ? (
    <DialogOverlay onDismiss={handleOnDismiss} {...getStyles("dialogOverlay")}>
      {children}
    </DialogOverlay>
  ) : (
    <Fragment />
  );
};
