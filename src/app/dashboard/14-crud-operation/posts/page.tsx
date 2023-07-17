import { axios } from "@/libs/axios/axios";
import { authOptions } from "@/libs/nextauth/authoptions";
import { getServerSession } from "next-auth";
import { Data } from "../types";
import Poststable from "./components/Poststable";

async function getAllPosts(page?: string): Promise<Data | null> {
  const session = await getServerSession(authOptions);

  try {
    const { data, status } = await axios.get(
      "/S16/posts" + (page ? `?page=${page}` : ""),
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

const PostPage = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  const posts = await getAllPosts(searchParams.page);

  if (posts === null) {
    return <div>Post Not Found!</div>;
  }
  return (
    <div>
      <Poststable data={posts} posts={posts.data} />
    </div>
  );
};
export default PostPage;
