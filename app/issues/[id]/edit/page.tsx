import React from "react";
import IssueFormPage from "../../_components/IssueForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) notFound();

  return <IssueFormPage issue={issue} />;
};

export default EditIssuePage;
