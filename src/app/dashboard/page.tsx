"use client";
import { Button, Container, Text } from "@mantine/core";
import { Prism } from "@mantine/prism";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const page = () => {
  const { data: session, status } = useSession();
  const getData = async () => {
    const { data, status } = await axios.get(
      "http://ecomerce_fundamental.test/sanctum/csrf-cookie",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session?.user.access_token}`,
        },
        withCredentials: true,
      }
    );
    console.log({ data, status });
  };

  return (
    <Container mx={"auto"}>
      <Text>Hello world</Text>
      <Button onClick={getData}>get data</Button>

      {session && (
        <Prism language="json" withLineNumbers>
          {JSON.stringify(session, null, 2)}
        </Prism>
      )}
    </Container>
  );
};
export default page;
