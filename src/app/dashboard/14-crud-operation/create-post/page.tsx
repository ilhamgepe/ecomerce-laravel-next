"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  Center,
  Container,
  Divider,
  FileInput,
  Group,
  Text,
  TextInput,
  Textarea,
  rem,
} from "@mantine/core";
import { IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { CreatePost, CreatePostSchema } from "./zod/schema";
import { useState } from "react";
import { axiosClient } from "@/libs/axios/axios";

const page = () => {
  const [postImage, setPostImage] = useState<File | null>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreatePost>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  return (
    <Container>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Group
            position="apart"
            py={"md"}
            px={"xl"}
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            })}
          >
            <Text size={"xl"} weight={"bold"}>
              Create Post
            </Text>
            <Box>
              <Button mr={"md"} color={"indigo"}>
                Back
              </Button>
            </Box>
          </Group>
          <Divider />
        </Card.Section>
        <Card.Section p="xl">
          <form
            onSubmit={handleSubmit(async (event) => {
              const formData = new FormData();
              formData.append("postImage", postImage!);
              formData.append("title", event.title);
              formData.append("description", event.description);
              try {
                const { data, status } = await axiosClient({
                  method: "POST",
                  url: "api/S16/create-post",
                  data: formData,
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                  },
                });
                console.log({ data, status });
              } catch (error) {
                console.log({ error });
              }
            })}
          >
            <FileInput
              label="Post image"
              placeholder="Your post image"
              icon={<IconUpload size={rem(14)} />}
              mb="md"
              accept="image/png,image/jpeg,image/jpg"
              onChange={(e) => setPostImage(e)}
            />
            <TextInput
              label="Title"
              placeholder="Title"
              mb="md"
              {...register("title")}
              error={errors.title?.message}
            />
            <Textarea
              label="Description"
              placeholder="Description"
              autosize
              mb="md"
              {...register("description")}
              error={errors.description?.message}
            />
            <Button type="submit" fullWidth>
              Submit
            </Button>
          </form>
        </Card.Section>
      </Card>
    </Container>
  );
};
export default page;
