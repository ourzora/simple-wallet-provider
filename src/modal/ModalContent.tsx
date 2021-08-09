import { DialogContent, DialogContentProps } from "@reach/dialog";
import { ReactNode } from "react";
import { useThemeConfig } from "../hooks/useThemeConfig";

export interface ModalContentProps extends DialogContentProps {
  className?: string;
  title?: string;
  size?: "small" | "normal";
  ariaLabel?: string;
  canClose?: boolean;
}

export const ModalContent = ({
  title,
  ariaLabel,
  children,
}: {
  title: string;
  ariaLabel: string;
  children: ReactNode;
}) => {
  const { getStyles } = useThemeConfig();
  return (
    <DialogContent
      aria-label={ariaLabel}
      title={title}
      {...getStyles("modalContent")}
    >
      {children}
    </DialogContent>
  );
};
