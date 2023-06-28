"use client";
import { Button, Container, Text } from "@mantine/core";
import ToggleColorScheme from "./components/colorScheme/ToggleColorScheme";
import { signIn, signOut, useSession } from "next-auth/react";
import { Prism } from "@mantine/prism";

export default function Home() {
  const { data: session, status } = useSession();
  console.log({ session, status });

  return (
    <Container mx={"auto"}>
      <Text>Hello world</Text>
      <Button onClick={() => signIn()}>Login</Button>
      <Button onClick={() => signOut()}>Logout</Button>

      {session && (
        <Prism language="json" withLineNumbers>
          {JSON.stringify(session, null, 2)}
        </Prism>
      )}
    </Container>
  );
}
