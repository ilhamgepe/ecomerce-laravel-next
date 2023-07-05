"use client";
import { DropZoneButton } from "@/app/components/button/DropZoneButton";
import { Text } from "@mantine/core";

const page = () => {
  return (
    <div>
      <Text mb="md">FUNDAMENTAL UPLOAD IMAGE TO STORAGE</Text>
      <DropZoneButton />
    </div>
  );
};
export default page;
