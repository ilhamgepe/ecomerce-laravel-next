"use client";
import { Button, Container, Text } from "@mantine/core";
import ToggleColorScheme from "./components/colorScheme/ToggleColorScheme";
import { signIn, signOut, useSession } from "next-auth/react";
import { Prism } from "@mantine/prism";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();
  console.log({ session, status });

  return (
    <Container mx={"auto"}>
      <Text>Hello world</Text>
      <Link href={"/auth/signin"}>
        <Button>Login</Button>
      </Link>
      {session && <Button onClick={() => signOut()}>Logout</Button>}

      {session && (
        <Prism language="json" withLineNumbers>
          {JSON.stringify(session, null, 2)}
        </Prism>
      )}
    </Container>
  );
}
