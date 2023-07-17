"use client";

import { Box, Button, Card, Container, Group, Text } from "@mantine/core";
import { Post } from "../../types";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ShowPost = ({ post }: { post: Post }) => {
  const route = useRouter();
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
            <Button onClick={() => route.back()}>back</Button>
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
