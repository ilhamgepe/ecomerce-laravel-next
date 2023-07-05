"use client";
import { Skeleton } from "@mantine/core";

const loading = () => {
  return (
    <div>
      <Skeleton width={"70%"} h={10} mb={"sm"} />
      <Skeleton width={"100%"} h={100} mb={"md"} />
      <Skeleton width={"100%"} h={20} />
    </div>
  );
};
export default loading;
