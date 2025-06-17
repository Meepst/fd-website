export const runtime = 'nodejs';

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: NextRequest){
    try{
        const body = await req.json();
        const {username, email, password} = body;

        const user = await prisma.user.create({
            data: {username, email, password}
        });

        return NextResponse.json(user, {status: 201});
    } catch(error) {
        console.error(error);
        return NextResponse.json({error: 'failed to create user'}, {status: 500});
    }
}