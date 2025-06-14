import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const {searchParams} = new URL(req.url);
    const usernameID = searchParams.get('usernameID')

    if(!usernameID){
        return NextResponse.json({error: 'missing usernameID'}, {status: 400});
    }

    try {
        const res = await fetch('/api/ouid?nickname=${encodeURIComponent(usernameID)}');
        const data = await res.json();
        if(!res.ok){
            
        }
    }
    catch{

    }
}