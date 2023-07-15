"use client";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Group,
  Pagination,
  ScrollArea,
  Table,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Data, Post } from "../../types";
import { useSearchParams } from "next/navigation";

interface PoststableProps {
  posts: Post[];
  data: Data;
}
const Poststable = ({ posts, data }: PoststableProps) => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page")!, 10);

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
                <ActionIcon>
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
              <Button color="orange">Trashed</Button>
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
  );
};
export default Poststable;
