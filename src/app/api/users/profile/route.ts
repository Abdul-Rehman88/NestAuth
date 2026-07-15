import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectDB();

export async function GET(request: NextRequest) {
    try {
        
        const userId= await getDataFromToken(request);
        const user = await User.findById(userId).select("-password"); // Exclude password from the response
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }
        return NextResponse.json({ 
            message: "User profile retrieved successfully",
            success: true,
         }, { status: 200 });

    }catch (error){
        console.error("", error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}