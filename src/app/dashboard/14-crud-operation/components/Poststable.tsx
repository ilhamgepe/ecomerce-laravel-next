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
import Image from "next/image";

const Poststable = () => {
  const rows = [
    {
      id: 1,
      image: "https://picsum.photos/200/300",
      title: "Title 1",
      description:
        "Description 1 lorem ipsum dolor sit amet consectetur adipisicing elit. lorem Description 1 lorem ipsum dolor sit amet consectetur adipisicing elit. lorem Description 1 lorem ipsum dolor sit amet consectetur adipisicing elit. loremDescription 1 lorem ipsum dolor sit amet consectetur adipisicing elit. lorem Description 1 lorem ipsum dolor sit amet consectetur adipisicing elit. lorem",
      category: "Category 1",
      publishDate: "2022-01-01",
    },
  ].map((row, index) => (
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
        <Text>{row.category}</Text>
      </td>
      <td>
        <Text sx={() => ({ whiteSpace: "nowrap" })}>{row.publishDate}</Text>
      </td>
      <td>
        <Group>
          <Tooltip label="view">
            <ActionIcon>
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
  ));
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
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm" highlightOnHover>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
export default Poststable;
