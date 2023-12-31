import BackButton from "@/app/components/BackButton";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Box, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  await delay(2000);

  if (!issue) {
    notFound();
  }

  return (
    <div className="px-48 pt-20">
      <div className="w-full max-w-4xl">
        <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
          <Box>
            <BackButton href="/issues" />
            <Heading>{issue.name}</Heading>
            <Flex className="space-x-3 mt-2 mb-5">
              <IssueStatusBadge status={issue.status} />
              <p>{issue.createdAt.toDateString()}</p>
            </Flex>
            <Card className="prose max-w-2xl">
              <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
          </Box>
          {session && (
            <Box className="mt-10">
              <Flex direction={"column"} className="space-y-3 w-40">
                <AssigneeSelect issue={issue}/>
                <EditIssueButton issueId={issue.id} />
                <DeleteIssueButton issueId={issue.id} />
              </Flex>
            </Box>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default IssueDetailsPage;
