"use client";
import {
  Input,
  Container,
  Center,
  Flex,
  createStyles,
  rem,
  Card,
  PasswordInput,
  Button,
  TextInput,
  Text,
  Divider,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSignin, SignInSchema } from "./schema";
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

const SigninPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormSignin>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Flex align="center" justify="center" mih="100vh">
      <Card shadow="sm" padding="lg" radius="md" withBorder w={500}>
        <Card.Section>
          <Center>
            <h1>Sign In</h1>
          </Center>
        </Card.Section>
        <form
          onSubmit={handleSubmit((value) =>
            signIn("credentials", {
              ...value,
              redirect: true,
              callbackUrl: "/dashboard",
            })
          )}
        >
          <TextInput
            placeholder="your@mail.com"
            type="email"
            id="emailSignin"
            my={20}
            {...register("email")}
            error={errors.email?.message}
          />
          <PasswordInput
            id="passwordSignin"
            placeholder="password"
            my={20}
            {...register("password")}
            error={errors.password?.message}
          />
          <Button type="submit" fullWidth color="yellow">
            Submit
          </Button>
        </form>
        <Divider
          my="xs"
          label={
            <Text size={"md"} weight={500}>
              Login with Google
            </Text>
          }
          labelPosition="center"
        />
        <Flex>
          <Button
            variant="default"
            leftIcon={
              <Image
                src={"/images/google.png"}
                width={30}
                height={30}
                alt="google"
              />
            }
            size="md"
            fullWidth
            onClick={() =>
              signIn("google", { redirect: true, callbackUrl: "/dashboard" })
            }
          >
            Sign In with Google
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
};
export default SigninPage;
