"use client";
import { useTheme } from "@emotion/react";
import {
  ActionIcon,
  Button,
  DefaultMantineColor,
  Group,
  ScrollArea,
  Table,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Post, RootPost } from "../types";
import { useSession } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";

const Poststable = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const search = searchParams.get("page");
  const { data: session } = useSession();

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
                  href={"/dashboard/14-crud-operation/" + row.id}
                  component={Link}
                >
                  <IconEye />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="edit">
                <ActionIcon>
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

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getPost = async () => {
      if (session) {
        try {
          const { data, status }: { data: RootPost; status: number } =
            await axios.get(`http://ecomerce_fundamental.test/api/S16/posts`, {
              cancelToken: source.token,
              headers: {
                Authorization: `Bearer ${session?.user.access_token}`,
              },
            });
          setPosts(data.data.data);
        } catch (error: any) {
          setError(error.errors);
        }
      }
    };

    getPost();

    return () => source.cancel();
  }, [session]);
  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm" highlightOnHover>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
export default Poststable;
