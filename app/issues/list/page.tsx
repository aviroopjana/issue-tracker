import React from "react";
import { Table } from "@radix-ui/themes";
import Prisma from "@/prisma/client";
import NextLink from "next/link";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import IssueAction from "./IssueAction";
import BackButton from "../../components/BackButton";
import Link from "../../components/Link";
import { Issue, Status } from "@prisma/client";
import { BsArrowUp } from "react-icons/bs";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue };
}

const IssuePage = async ({ searchParams }: Props) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "IssueID", value: "id" },
    { label: "Title", value: "name" },
    {
      label: "Status",
      value: "status",
      className: "hidden md:table-cell",
    },
    {
      label: "Created",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
    {
      label: "Last Updated",
      value: "updatedAt",
      className: "hidden md:table-cell",
    },
  ];

  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const issues = await Prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
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
              {columns.map((column) => (
                <Table.ColumnHeaderCell
                  key={column.value}
                  className={column.className}
                >
                  <NextLink
                    href={{
                      query: { ...searchParams, orderBy: column.value },
                    }}
                  >
                    {column.label}
                  </NextLink>
                  {column.value === searchParams.orderBy && (
                    <BsArrowUp className="inline" />
                  )}
                </Table.ColumnHeaderCell>
              ))}
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
