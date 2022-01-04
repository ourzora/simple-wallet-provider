import React from "react";
import { Theme } from "../constants";
import { useThemeConfig } from "../hooks/useThemeConfig";

interface WalletOptionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: React.ElementType;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  iconStylesKey?: keyof typeof Theme;
}

export const WalletOption: React.FC<WalletOptionProps> = ({
  children,
  iconStylesKey,
  as,
  ...props
}) => {
  const { getStyles } = useThemeConfig();
  const Component = as || "button";

  return (
    <Component {...getStyles("walletOption")} {...props}>
      {children}
      {iconStylesKey && <div {...getStyles(iconStylesKey)} />}
    </Component>
  );
};
