import BackButton from "@/app/components/BackButton";
import { Box } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const loading = () => {
  return (
    <div className="flex items-start justify-center h-screen">
      <div className="w-full max-w-4xl">
        <BackButton href="/issues" />
        <Box className="max-w-xl">
          <Skeleton />
          <Skeleton height={"20rem"} />
        </Box>
      </div>
    </div>
  );
};

export default loading;
