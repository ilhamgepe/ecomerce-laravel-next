import { authOptions } from "@/libs/nextauth/authoptions";
import { getServerSession } from "next-auth";
import { Data, Post } from "../../types";
import { axios } from "@/libs/axios/axios";
import { cache } from "react";

export const getPostWithId = cache(async (id: string): Promise<Post | null> => {
  const session = await getServerSession(authOptions);
  try {
    const { data, status } = await axios.get("/S16/posts/" + id, {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    });

    return data.data;
  } catch (error: any) {
    return null;
  }
});

export const getTrashedPosts = cache(
  async (page?: string): Promise<Data | null> => {
    const session = await getServerSession(authOptions);

    try {
      const { data, status } = await axios.get(
        "/S16/posts/trash" + (page ? `?page=${page}` : ""),
        {
          headers: {
            Authorization: `Bearer ${session?.user.access_token}`,
          },
        }
      );

      return data.data;
    } catch (error: any) {
      return null;
    }
  }
);
export const getTrashedPostWithId = cache(
  async (id: string): Promise<Post | null> => {
    const session = await getServerSession(authOptions);
    try {
      const { data, status } = await axios.get("/S16/posts/trash/" + id, {
        headers: {
          Authorization: `Bearer ${session?.user.access_token}`,
        },
      });

      return data.data;
    } catch (error: any) {
      return null;
    }
  }
);
