import { Metadata, ResolvingMetadata } from "next";
import EditPost from "../../components/EditPost";
import { getPostWithId } from "../../server";

type Props = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props) {
  const post = await getPostWithId(params.id);
  return {
    title: post ? `Edit: ${post?.title}` : "Post Not Found!",
  };
}
const page = async ({ params }: { params: { id: string } }) => {
  const post = await getPostWithId(params.id);
  console.log(post);

  return <div>{post ? <EditPost post={post} /> : "Post Not Found!"}</div>;
};
export default page;
