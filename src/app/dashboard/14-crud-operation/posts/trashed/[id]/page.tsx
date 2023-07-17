import { Metadata, ResolvingMetadata } from "next";
import { getPostWithId, getTrashedPostWithId } from "../../server";
import ShowPost from "../../components/ShowPost";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const id = params.id;
  const post = await getTrashedPostWithId(id);
  return {
    title: post ? post?.title : "Post Not Found!",
  };
}
const page = async ({ params, searchParams }: Props) => {
  const post = await getTrashedPostWithId(params.id);

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
