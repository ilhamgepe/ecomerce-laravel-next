import chalk from "chalk";
import { Metadata } from "next";
import { getTrashedPosts } from "../server";
import TrashedPost from "./TrashedPost";

export const metadata: Metadata = {
  title: "Trashed Post",
  description: "this is trashed post",
};

const TrashedPage = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  const posts = await getTrashedPosts(searchParams.page);

  if (posts === null || posts.data.length === 0) {
    return <div>Trashed Post Not Found!</div>;
  }
  return (
    <div>
      <TrashedPost data={posts} posts={posts.data} />
    </div>
  );
};
export default TrashedPage;
