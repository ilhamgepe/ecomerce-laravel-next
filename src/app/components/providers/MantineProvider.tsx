"use client";
import { ReactNode, useState } from "react";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider as MantineProv,
} from "@mantine/core";
import { useColorScheme, useHotkeys, useLocalStorage } from "@mantine/hooks";

const MantineProvider = ({ children }: { children: ReactNode }) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["ctrl+i", () => toggleColorScheme()]]);
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProv theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        {children}
      </MantineProv>
    </ColorSchemeProvider>
  );
};
export default MantineProvider;
