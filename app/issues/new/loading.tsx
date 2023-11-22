import BackButton from "@/app/components/BackButton";
import { Box } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const loading = () => {
  return (
    <div>
      <BackButton href="/issues" />
      <Box className="max-w-xl">
        <Skeleton />
        <Skeleton height={"20rem"} />
      </Box>
    </div>
  );
};

export default loading;
