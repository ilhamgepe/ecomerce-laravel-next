"use client";
import { useEffect, useRef, useState } from "react";
import {
  Text,
  Image,
  SimpleGrid,
  Flex,
  Group,
  Button,
  Box,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import { IconDownload, IconX } from "@tabler/icons-react";
import { axiosClient } from "@/libs/axios/axios";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function DropZoneButton() {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [loading, setloading] = useState(false);
  const { data: session } = useSession();

  const theme = useMantineTheme();
  const router = useRouter();

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    // console.log({ file, imageUrl });
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });

  const handleSubmit = async () => {
    if (files.length === 0) return;
    setloading(true);
    const formdata = new FormData();
    formdata.append("image", files[0]);
    formdata.append("MEMEK", "bajingan");

    try {
      const { data, status } = await axiosClient({
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${session?.user.access_token}`,
        },
        // url: "http://ecomerce_fundamental.test/api/F13/upload",
        url: "api/F13",
        data: formdata,
        onUploadProgress: (event: any) => {
          console.log(
            `Current progress:`,
            Math.round((event.loaded * 100) / event.total)
          );
        },
      });
      setloading(false);
      console.log("success submit image", { data, status });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return router.replace("/auth/signin");
        }
      }
      notifications.show({
        autoClose: 5000,
        title: "Failed to upload",
        message: "Ops! Something went wrong",
        color: "red",
        withCloseButton: true,
        styles: (theme) => ({
          title: {
            color: "red",
          },
        }),
      });
      setloading(false);
      console.log("error submiting image", { error });
    }
  };

  const handleReject = () => {
    notifications.show({
      autoClose: 5000,
      title: "Failed to upload",
      message: "You can only upload 1 image at a time & max file size is 5MB",
      color: "red",
      withCloseButton: true,
      styles: (theme) => ({
        title: {
          color: "red",
        },
      }),
    });
    setFiles([]);
  };

  return (
    <div>
      <Dropzone
        loading={loading}
        accept={IMAGE_MIME_TYPE}
        onDrop={(e) => setFiles(e)}
        onReject={() => handleReject()}
        maxFiles={1}
        maxSize={533 * 1024 * 1024}
      >
        <Dropzone.Accept>
          <IconDownload
            size={rem(50)}
            color={theme.colors[theme.primaryColor][6]}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX size={rem(50)} color={theme.colors.red[6]} stroke={1.5} />
        </Dropzone.Reject>
        <Text align="center">Drop images here</Text>
      </Dropzone>
      <Button mt="xl" fullWidth onClick={handleSubmit}>
        Submit
      </Button>

      <Group mt="xl" position="center">
        <Box>{previews}</Box>
      </Group>
    </div>
  );
}
