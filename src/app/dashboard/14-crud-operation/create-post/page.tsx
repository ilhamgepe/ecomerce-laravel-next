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
  MultiSelect,
  Text,
  TextInput,
  Textarea,
  rem,
} from "@mantine/core";
import { IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { CreatePost, CreatePostSchema } from "./zod/schema";
import { useEffect, useState } from "react";
import { axiosClient } from "@/libs/axios/axios";
import axios from "axios";

const page = () => {
  const [postImage, setPostImage] = useState<File | null>(null);
  const [Categories, setCategories] = useState<string[]>([]);
  const [categoryValue, setCategoryValue] = useState<string[]>([]);

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

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getCategories = async () => {
      try {
        const { data, status } = await axiosClient.get("/api/S16/categories", {
          cancelToken: source.token,
        });

        const memek = data.data;
        memek.map((item: any) => {
          setCategories((prev) => [...prev, item.name]);
        });
      } catch (error) {
        console.log({ error });
      }
    };
    getCategories();

    return () => {
      source.cancel();
    };
  }, []);
  return (
    <Container fluid>
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
          </Group>
          <Divider />
        </Card.Section>
        <Card.Section p="xl">
          <form
            onSubmit={handleSubmit(async (event) => {
              console.log("memek jalan");

              const formData = new FormData();
              formData.append("category", JSON.stringify(categoryValue));
              formData.append("postImage", postImage!);
              formData.append("title", event.title);
              formData.append("description", event.description);

              try {
                const { data, status } = await axiosClient({
                  method: "POST",
                  url: "/api/S16/create-post",
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
            <MultiSelect
              data={Categories}
              limit={5}
              searchable
              placeholder="Pick category (optional)"
              value={...categoryValue}
              onChange={(e) => setCategoryValue([...e])}
              creatable
              getCreateLabel={(query) => `+ create ${query}`}
              onCreate={(query) => {
                setCategories((prev) => [...prev, query]);
                return query;
              }}
              maxSelectedValues={3}
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
