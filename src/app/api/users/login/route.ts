import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

interface MyTokenPayload {
  id: string;
  username: string;
  email: string;
  // add other fields you signed into the token
}

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        console.log("email and password:", { email, password });

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }
        if(!user.isVerified) {
            return NextResponse.json({ success: false, message: "Please verify your email" })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }
        
        const token = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email,
    
        } as MyTokenPayload, process.env.TOKEN_SECRET!, { expiresIn: "1h" });

        const response = NextResponse.json({
            message: "Login successful",
            success: true
        });
        response.cookies.set("token", token, { httpOnly: true });
        return response;
        
    }catch (error){
        console.error("Error during login:", error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
} 