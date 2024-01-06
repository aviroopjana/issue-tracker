import { patchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/authOptions";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();
  const validate = await patchIssueSchema.safeParse(body);

  if (!validate.success) {
    return NextResponse.json(validate.error.errors);
  }

  const { assignIssueToUserId } = body;

  if (assignIssueToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assignIssueToUserId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
    }
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid Issue" }, { status: 400 });
  }

  const updateIssue = await prisma.issue.update({
    where: {
      id: issue.id,
    },
    data: {
      name: body.name,
      description: body.description,
      assignIssueToUserId,
    },
  });

  if (!updateIssue) {
    return NextResponse.json({ error: "Invalid Request" }, { status: 402 });
  }

  return NextResponse.json(updateIssue, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid issue" }, { status: 400 });
  }

  await prisma.issue.delete({
    where: {
      id: issue.id,
    },
  });

  return NextResponse.json("");
}
