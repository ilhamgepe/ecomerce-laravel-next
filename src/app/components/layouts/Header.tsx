"use client";
import {
  Burger,
  Button,
  Group,
  Header as MantineHeader,
  MantineTheme,
  MediaQuery,
  Text,
} from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
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

  return (
    <MantineHeader height={{ base: 50, md: 70 }} p="md">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o: boolean) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>

        <Group>
          {session?.user?.name && <Text>{session?.user?.name}</Text>}
        </Group>
        <Group>
          <ToggleColorScheme my={"sm"} />
          <Button onClick={() => signOut()} variant="subtle" size="xs">
            Logout
          </Button>
        </Group>
      </div>
    </MantineHeader>
  );
};
export default Header;
