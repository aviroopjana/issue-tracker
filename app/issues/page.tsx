import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssuePage = () => {
  return (
    <Button>
      <Link href="/issues/new">New Issue</Link>
    </Button>
  );
};

export default IssuePage;
