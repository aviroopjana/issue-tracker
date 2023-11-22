import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <Heading>{issue.name}</Heading>
      <Flex className="space-x-3 mt-2 mb-5">
        <IssueStatusBadge status={issue.status} /> 
        <p>{issue.createdAt.toDateString()}</p>
      </Flex>  
      <Card className="prose max-w-2xl">
        <ReactMarkdown>{issue.description}</ReactMarkdown>    
    </Card>  
    </div>
  );
};

export default IssueDetailsPage;
