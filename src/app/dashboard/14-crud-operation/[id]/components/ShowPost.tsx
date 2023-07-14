"use client";

import { Box, Card, Container, Group, Text } from "@mantine/core";
import { Post } from "../../types";
import Image from "next/image";

const ShowPost = ({ post }: { post: Post }) => {
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
              {post.title}
            </Text>
          </Group>
        </Card.Section>
        <Container fluid>
          <Box
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            })}
          >
            <Image src={post.image} alt="image" width={400} height={400} />
          </Box>
          <Text>{post.description}</Text>
        </Container>
      </Card>
    </Container>
  );
};
export default ShowPost;
