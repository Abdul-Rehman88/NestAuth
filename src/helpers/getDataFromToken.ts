import { NextResponse, NextRequest } from "next/server";

import jwt, { JwtPayload } from "jsonwebtoken";

interface MyTokenPayload extends JwtPayload {
  id: string
  // add other fields you signed into the token
}



export const getDataFromToken = (request: NextRequest) => {
 try {
       
    const token = request.cookies.get("token")?.value || "";
    
    if (!token) {
        return NextResponse.json({ error: "Token not found" }, { status: 400 });
    }

    const decodedToken: MyTokenPayload = jwt.verify(token, process.env.JWT_SECRET!) as MyTokenPayload;
    return decodedToken.id
    
    }catch (error){
        console.error("Error during token data retrieval:", error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}