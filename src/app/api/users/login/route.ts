import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        console.log("Received data:", { email, password });

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }
        
        const token = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email,
    
        }, process.env.JWT_SECRET!, { expiresIn: "1h" });
        console.log("Generated token:", token);

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