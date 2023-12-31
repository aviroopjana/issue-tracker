import BackButton from "@/app/components/BackButton";
import { Box, Card, Flex } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const loading = () => {
  return (
    <div className="px-48 pt-20">
      <div className="w-full max-w-4xl">
        <Box>
          <BackButton href="/issues" />
          <Skeleton className="max-w-xl" />
          <Flex className="space-x-3 mt-2 mb-5">
            <Skeleton width={"5rem"} />
            <Skeleton width={"8rem"} />
          </Flex>
          <Card className="prose max-w-2xl">
            <Skeleton count={3} />
          </Card>
        </Box>
      </div>
    </div>
  );
};

export default loading;
