import { axios } from "@/libs/axios/axios";
import { authOptions } from "@/libs/nextauth/authoptions";
import { getServerSession } from "next-auth";
import ShowPost from "../components/ShowPost";
import { Post } from "../../types";

async function getPost(id: string): Promise<Post | null> {
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
}

const page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const post = await getPost(params.id);
  console.log({ post });

  if (post === null) {
    return <div>Post Not Found!</div>;
  }

  return (
    <div>
      <ShowPost post={post} />
    </div>
  );
};
export default page;
