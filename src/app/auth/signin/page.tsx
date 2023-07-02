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
  Loader,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSignin, SignInSchema } from "./schema";
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SigninPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorSignin, setErrorSignin] = useState<string | undefined>("");
  const router = useRouter();

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
          onSubmit={handleSubmit((value) => {
            setLoading(true);
            signIn("credentials", {
              ...value,
              redirect: false,
            }).then((e) => {
              if (e?.error !== null) {
                setLoading(false);
                setErrorSignin(e?.error);
              }
              return router.replace("/dashboard");
            });
          })}
        >
          <Text align="center" color="red" weight={500} italic>
            {errorSignin}
          </Text>
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
          <Button type="submit" fullWidth color="yellow" disabled={loading}>
            {loading ? <Loader size={"sm"} /> : "Submit"}
          </Button>
        </form>
        <Divider
          my="xs"
          label={
            <Text size={"md"} weight={500}>
              OR
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
            disabled={loading}
            onClick={() =>
              signIn("google", { redirect: true, callbackUrl: "/dashboard" })
            }
          >
            Continue with Google
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
};
export default SigninPage;
