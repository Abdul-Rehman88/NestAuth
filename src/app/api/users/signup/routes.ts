import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const { username, email, password } = await request.json();

        const user = await User.findOne({ email });

        if(user){
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUse = new User({
            username,
            email,
            password: hashedPassword,
        });
        const savedUser = await newUse.save();
        console.log("User created successfully:", savedUser);
        
        const mailResponse = await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        return NextResponse.json({ message: "User created successfully", mailResponse }, { status: 201 });
    

    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}