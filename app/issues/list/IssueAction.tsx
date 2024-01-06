import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import FilterIssueStatus from "./FilterIssueStatus";

const IssueAction = () => {
  return (
    <Flex mb={"5"} justify={"between"}>
      <FilterIssueStatus/>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueAction;
