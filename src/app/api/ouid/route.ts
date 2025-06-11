import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const { searchParams } = new URL(req.url);
    const nickname = searchParams.get('nickname');
    console.log('hello');

    if(!nickname){
        return NextResponse.json({error: 'missing username'}, {status: 400})
    }
    try{
        const ouidUrl:string = process.env.NEXT_PUBLIC_FD_URL+`tfd/v1/id?user_name=${encodeURIComponent(nickname)}`;
        const response = await fetch(ouidUrl, {method: 'GET', headers: {'x-nxopen-api-key': process.env.FD_API_KEY!},});
        if(!response.ok){
            return NextResponse.json({error: 'failed to fetch ouid'}, {status: response.status})
        }
        const data = await response.json();
        return NextResponse.json(data);
    }
    catch{
        return NextResponse.json({error: 'internal server error'}, {status: 500});
    }
}