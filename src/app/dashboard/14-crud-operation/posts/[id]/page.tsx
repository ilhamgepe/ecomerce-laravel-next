import { Metadata } from "next";
import ShowPost from "../components/ShowPost";
import { getPostWithId } from "../server";

type Props = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props) {
  const id = params.id;
  const post = await getPostWithId(id);
  return {
    title: post ? post?.title : "Post Not Found!",
  };
}
const page = async ({ params }: Props) => {
  const post = await getPostWithId(params.id);

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
