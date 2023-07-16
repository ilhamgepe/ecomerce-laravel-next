import { axios } from "@/libs/axios/axios";
import { authOptions } from "@/libs/nextauth/authoptions";
import { getServerSession } from "next-auth";
import { Data } from "../../types";
import TrashedPost from "./TrashedPost";
import { Metadata } from "next";
import { getTrashedPost } from "../server";

export const metadata: Metadata = {
  title: "Trashed Post",
  description: "this is trashed post",
};

const TrashedPage = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  const posts = await getTrashedPost(searchParams.page);

  if (posts === null) {
    return <div>Post Not Found!</div>;
  }
  return (
    <div>
      <TrashedPost data={posts} posts={posts.data} />
    </div>
  );
};
export default TrashedPage;
