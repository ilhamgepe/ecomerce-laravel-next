"use client";
import { axiosClient } from "@/libs/axios/axios";
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
import { IconEdit } from "@tabler/icons-react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Post } from "../../types";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

interface ErrorObject {
  [key: string]: string[];
}
const EditPost = ({ post }: { post: Post }) => {
  const oldCategoryName = post.categories.map((category) => category.name);
  const { data: session } = useSession();
  const route = useRouter();

  const [postImage, setPostImage] = useState<File | null>(null);
  const [Categories, setCategories] = useState<string[]>([]);
  const [categoryValue, setCategoryValue] = useState<string[]>([]);
  const [error, setError] = useState<ErrorObject | null>(null);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);

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
      } catch (error: any) {
        setError(error.errors);
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
              Edit Post: {post.title}
            </Text>
          </Group>
          <Divider />
        </Card.Section>
        <Card.Section p="xl">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const category =
                categoryValue.length > 0 ? categoryValue : oldCategoryName;

              const formData = new FormData();
              formData.append("category", JSON.stringify(category));

              formData.append("title", title);
              formData.append("description", description);
              if (postImage) {
                formData.append("postImage", postImage!);
              }

              try {
                notifications.show({
                  id: "edit-post",
                  title: "Loading Your Data",
                  message: "Updateing Post",
                });
                const { data, status } = await axios({
                  method: "POST",
                  url:
                    "http://ecomerce_fundamental.test/api/S16/posts/" + post.id,
                  data: formData,
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${session?.user.access_token}`,
                    Accept: "application/json",
                  },
                });
                notifications.clean();

                route.replace(`/dashboard/14-crud-operation/posts/${post.id}`);
              } catch (error: any) {
                console.log({ error });
                setError(error.response.data.errors);
              }
            }}
          >
            {error &&
              Object.keys(error).map((key) => (
                <Box key={key}>
                  {error[key].map((message) => (
                    <Text key={message} color="red">
                      {message}
                    </Text>
                  ))}
                </Box>
              ))}
            <Center>
              <Image src={post.image} alt="image" width={400} height={400} />
            </Center>
            <FileInput
              label="Change image"
              placeholder="Change Your post image"
              icon={<IconEdit size={rem(14)} />}
              mb="md"
              accept="image/png,image/jpeg,image/jpg"
              onChange={(e) => setPostImage(e)}
            />
            <TextInput
              label="Title"
              placeholder="Title"
              mb="md"
              value={title ? title : post.title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <MultiSelect
              data={Categories}
              limit={10}
              searchable
              placeholder="Pick category (optional)"
              value={
                categoryValue.length !== 0 ? categoryValue : oldCategoryName
              }
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
              value={description ? description : post.description}
              onChange={(e) => setDescription(e.target.value)}
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
export default EditPost;
