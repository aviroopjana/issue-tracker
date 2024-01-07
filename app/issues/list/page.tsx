import React from "react";
import { Table } from "@radix-ui/themes";
import Prisma from "@/prisma/client";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import IssueAction from "./IssueAction";
import BackButton from "../../components/BackButton";
import Link from "../../components/Link";
import { Status } from "@prisma/client";

interface Props {
  searchParams: { status: Status };
}

const IssuePage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const issues = await Prisma.issue.findMany({
    where: {
      status
    },
  });

  return (
    <div className="flex items-center justify-center h-screen">
      {/* Centered Container */}
      <div className="w-full max-w-4xl">
        <BackButton href="/" />
        <IssueAction />
        <Table.Root variant="surface" className="max-w-4xl">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Issue ID
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Issue Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Created At
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Last Updated At
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell className="hidden md:table-cell">
                  {issue.id}
                </Table.Cell>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>{issue.name}</Link>
                  <div className="block md:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.updatedAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
};

export default IssuePage;