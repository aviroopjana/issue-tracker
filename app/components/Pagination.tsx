import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount < 1) return null;

  return (
    <Flex direction={"row"}>
      <Text>
        Page {currentPage} of {pageCount}
      </Text>
      <Button>
        <MdKeyboardDoubleArrowLeft/>
      </Button>
    </Flex>
  );
};

export default Pagination;
