import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();

        const user = await User.findOne({verificationToken: token, verificationTokenExpiry: { $gt: Date.now() }});
        
        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
        
    }catch (error) {
        console.error("Error verifying email:", error);
        return NextResponse.json({ error: "Error verifying email" }, { status: 500 });
    }
}