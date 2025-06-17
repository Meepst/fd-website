export const runtime = 'nodejs';

import {PrismaClient} from '@/generated/prisma';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest){
    try{
        const body = req.json();
        const {title, content, userID} = body;

        const post = await.prisma.post.create({
            data: {
                title,
                content,
                user: {connect: {id: Number(userID)}},
            },
        });

        return NextResponse.json(post, {status: 201});
    }catch(error){
        console.log(error);
        return NextResponse.json({error: 'Failed to create user post'}, {status: 500});
    }
}