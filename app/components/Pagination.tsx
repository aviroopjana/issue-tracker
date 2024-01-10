import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount < 1) return null;

  return (
    <Flex direction={"row"} align={"center"} gap={"2"}>
      <Text size={"2"}>
        Page {currentPage} of {pageCount}
      </Text>
      <Button disabled={currentPage === 1} variant="soft">
        <MdKeyboardDoubleArrowLeft/>
      </Button>
      <Button disabled={currentPage === 1} variant="soft">
        <BsChevronLeft/>
      </Button>
      <Button disabled={currentPage === pageCount} variant="soft">
        <BsChevronRight/>
      </Button>
      <Button disabled={currentPage === 1} variant="soft">
        <MdKeyboardDoubleArrowRight/>
      </Button>
    </Flex>
  );
};

export default Pagination;
