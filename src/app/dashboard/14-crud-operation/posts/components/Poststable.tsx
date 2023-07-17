"use client";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Group,
  Modal,
  Pagination,
  ScrollArea,
  Table,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Data, Post } from "../../types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { notifications } from "@mantine/notifications";

interface PoststableProps {
  posts: Post[];
  data: Data;
}
const Poststable = ({ posts, data }: PoststableProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page")!, 10)
    : 1;
  const [modalDeleteOpened, setmodalDeleteOpened] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    try {
      const { data, status } = await axios.delete(
        `http://ecomerce_fundamental.test/api/S16/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.access_token}`,
          },
        }
      );
      if (status === 204) {
        setmodalDeleteOpened(false);
        setSelectedPost(null);
        notifications.show({
          title: "Success",
          message: "Post deleted successfully",
          color: "indigo",
          autoClose: 5000,
        });
        router.refresh();
      }
    } catch (error: any) {
      console.log({ error });

      notifications.show({
        title: "Error",
        message: error.response.data.error || "Failed to delete post",
        color: "red",
        autoClose: 5000,
      });
    }
  };
  const rows = posts
    ? posts.map((row, index) => (
        <tr key={index}>
          <td>{row.id}</td>
          <td>
            <Image src={row.image} alt="image" width={100} height={100} />
          </td>
          <td>
            <Text>{row.title}</Text>
          </td>
          <td>
            <Text>{row.description}</Text>
          </td>
          <td>
            {row.categories &&
              row.categories.map((item, index) => (
                <Text key={index}>{item.name}</Text>
              ))}
          </td>
          <td>
            <Text sx={() => ({ whiteSpace: "nowrap" })}>{row.created_at}</Text>
          </td>
          <td>
            <Group>
              <Tooltip label="view">
                <ActionIcon
                  href={"/dashboard/14-crud-operation/posts/" + row.id}
                  component={Link}
                >
                  <IconEye />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="edit">
                <ActionIcon
                  href={
                    "/dashboard/14-crud-operation/posts/" + row.id + "/edit"
                  }
                  component={Link}
                >
                  <IconEdit />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="delete">
                <ActionIcon
                  onClick={() => {
                    setmodalDeleteOpened(true);
                    setSelectedPost(row.id);
                  }}
                >
                  <IconTrash />
                </ActionIcon>
              </Tooltip>
            </Group>
          </td>
        </tr>
      ))
    : null;
  const ths = (
    <tr>
      <th>#</th>
      <th>Image</th>
      <th>Title</th>
      <th>Description</th>
      <th>Category</th>
      <th>Publish Date</th>
      <th>Action</th>
    </tr>
  );

  return (
    <>
      <Modal
        opened={modalDeleteOpened}
        onClose={() => {
          setmodalDeleteOpened(false);
          setSelectedPost(null);
        }}
        title="Delete Post"
        centered
        withCloseButton={false}
      >
        <Text>Are you sure you want to delete this post?</Text>
        <Group
          sx={(theme) => ({
            display: "flex",
            width: 300,
            justifyContent: "space-between",
            alignItems: "center",
            margin: "auto",
            marginTop: theme.spacing.md,
          })}
        >
          <Button
            variant="outline"
            color="red"
            onClick={() => (selectedPost ? handleDelete(selectedPost) : null)}
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              setmodalDeleteOpened(false);
              setSelectedPost(null);
            }}
          >
            Cancel
          </Button>
        </Group>
      </Modal>
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
                All Post
              </Text>
              <Box>
                <Button
                  href={"/dashboard/14-crud-operation/create-post"}
                  component={Link}
                  mr={"md"}
                  color={"indigo"}
                >
                  Create
                </Button>
                <Button
                  color="orange"
                  href={"/dashboard/14-crud-operation/posts/trashed"}
                  component={Link}
                >
                  Trashed
                </Button>
              </Box>
            </Group>
            <Divider />
          </Card.Section>
          <Card.Section>
            {rows ? (
              <ScrollArea>
                <Table miw={800} verticalSpacing="sm" highlightOnHover>
                  <thead>{ths}</thead>
                  <tbody>{rows}</tbody>
                </Table>
              </ScrollArea>
            ) : (
              <Text size={"xl"} align="center" weight={"bold"} my={"xl"}>
                Post not available
              </Text>
            )}
            <Pagination.Root
              total={data.last_page}
              getItemProps={(page) => ({
                component: Link,
                href: `/dashboard/14-crud-operation/posts?page=${page}`,
              })}
              value={data.current_page}
            >
              <Group spacing={7} position="center" my="xl">
                <Pagination.Previous
                  component={Link}
                  href={
                    page === 1
                      ? "#"
                      : `/dashboard/14-crud-operation/posts?page=${page - 1}`
                  }
                />
                <Pagination.Items />
                <Pagination.Next
                  component={Link}
                  href={
                    page === data.last_page
                      ? "#"
                      : `/dashboard/14-crud-operation/posts?page=${page + 1}`
                  }
                />
              </Group>
            </Pagination.Root>
          </Card.Section>
        </Card>
      </Container>
    </>
  );
};
export default Poststable;
