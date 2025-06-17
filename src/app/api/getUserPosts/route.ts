export const runtime = 'nodejs';

import {NextRequest, NextResponse} from 'next/server';
import {PrismaClient} from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET(){
    const posts = await prisma.post.findMany({
        include: {user: true}
    });

    return NextResponse.json(posts, {status: 201});
}