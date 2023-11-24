import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"
import { issueSchema } from "../../validationSchema";

export async function POST(request: NextRequest) {
    const body = await request.json();

    const validation = issueSchema.safeParse(body);

    if(!validation.success) {
        return NextResponse.json(validation.error.errors, {status: 400})
    }

    const newIssue = await prisma.issue.create({
        data: {
            name: body.name,
            description: body.description
        }
    });

    return NextResponse.json(newIssue, {status: 201});
}