import {NextRequest, NextResponse} from 'next/server';

export async function GET(req: NextRequest){
    const {searchParams} = new URL(req.url);
    const ouid = searchParams.get('ouid');

    if(!ouid){
        return NextResponse.json({error: 'missing ouid'}, {status: 400});
    }

    try{
        const basicUrl = `process.env.NEXT_PUBLIC_FD_URL+tfd/v1/user/basic?ouid=${encodeURIComponent(ouid)}`;
        const response = await fetch(basicUrl, {method: 'GET', headers: {'x-nxopen-api-key': process.env.FD_API_KEY!}});
        if(!response.ok){
            return NextResponse.json({error: 'failed to fetch user profile'}, {status: response.status});
        }
        const data = await response.json();
        return NextResponse.json(data);
    }
    catch{
        return NextResponse.json({error: 'internal server error'}, {status: 500})
    }
}