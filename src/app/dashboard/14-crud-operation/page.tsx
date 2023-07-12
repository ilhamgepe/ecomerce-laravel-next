"use client";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Group,
  Text,
} from "@mantine/core";
import Poststable from "./components/Poststable";

const page = () => {
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
              All Post
            </Text>
            <Box>
              <Button mr={"md"} color={"indigo"}>
                Create
              </Button>
              <Button color="orange">Trashed</Button>
            </Box>
          </Group>
          <Divider />
        </Card.Section>
        <Card.Section>
          <Poststable />
        </Card.Section>
      </Card>
    </Container>
  );
};
export default page;
