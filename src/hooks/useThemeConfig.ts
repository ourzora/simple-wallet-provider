import { useContext } from "react";
import { css } from "@emotion/css";
import { Web3ConfigurationContext } from "../config";
import { Theme, Strings } from "../constants";

type ThemeType = typeof Theme;

export function useThemeConfig() {
  const mediaContext = useContext(Web3ConfigurationContext);

  const getStyles = (themeKey: keyof ThemeType): any => {
    if (!(themeKey in mediaContext.theme)) {
      throw new Error(
        `"${String(themeKey)}" not found in [${Object.keys(
          mediaContext.theme
        ).join(", ")}]`
      );
    }
    const styles = mediaContext.theme[themeKey];
    return {
      className: `zora-wallet-${themeKey} ${css(styles)}`,
    };
  };

  const getString = (stringName: keyof typeof Strings) => {
    return mediaContext.strings[stringName];
  };

  return { getString, getStyles };
}
