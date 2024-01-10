"use client";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);

  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push('?' + params.toString());
  };

  if (pageCount < 1) return null;

  return (
    <Flex direction={"row"} align={"center"} gap={"2"}>
      <Text size={"2"}>
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        disabled={currentPage === 1}
        variant="soft"
        onClick={() => changePage(1)}
      >
        <MdKeyboardDoubleArrowLeft />
      </Button>
      <Button
        disabled={currentPage === 1}
        variant="soft"
        onClick={() => changePage(currentPage - 1)}
      >
        <BsChevronLeft />
      </Button>
      <Button
        disabled={currentPage === pageCount}
        variant="soft"
        onClick={() => changePage(currentPage + 1)}
      >
        <BsChevronRight />
      </Button>
      <Button
        disabled={currentPage === pageCount}
        variant="soft"
        onClick={() => changePage(pageCount)}
      >
        <MdKeyboardDoubleArrowRight />
      </Button>
    </Flex>
  );
};

export default Pagination;
