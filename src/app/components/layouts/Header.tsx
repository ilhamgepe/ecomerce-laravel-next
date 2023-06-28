"use client";
import {
  Burger,
  Header as MantineHeader,
  MantineTheme,
  MediaQuery,
  Text,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import ToggleColorScheme from "../colorScheme/ToggleColorScheme";
const Header = ({
  opened,
  setOpened,
  theme,
}: {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  theme: MantineTheme;
}) => {
  const { data: session } = useSession();
  console.log({ session });

  return (
    <MantineHeader height={{ base: 50, md: 70 }} p="md">
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o: boolean) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>

        {/* @ts-ignore */}
        <Text>{session?.user?.name || "anjing"}</Text>
        <ToggleColorScheme my={"sm"} />
      </div>
    </MantineHeader>
  );
};
export default Header;
