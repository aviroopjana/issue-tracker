import { issueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props{
    params: {id: string}
}

export async function PATCH(request: NextRequest, {params}: Props) {
    const body = await request.json();
    const validate = await issueSchema.safeParse(body);

    if(!validate.success) {
        return NextResponse.json(validate.error.errors);
    }

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!issue) {
        return NextResponse.json({ error: "Invalid Issue"}, {status: 400});
    }

    const updateIssue = await prisma.issue.update({
        where: {
            id: issue.id
        },
        data: {
            name: body.name,
            description: body.description
        }
    });

    if(!updateIssue) {
        return NextResponse.json({ error: "Invalid Request"},{status: 402});
    }

    return NextResponse.json(updateIssue, {status: 200});
}