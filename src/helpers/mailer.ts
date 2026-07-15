import User from "@/models/userModel";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

interface sendEmailParams {
    email: string;
    emailType: string;
    userId: string;
}

export const sendEmail = async ({email, emailType, userId}: sendEmailParams) => 
    {
    try {
        const hashedToken = uuidv4();
        if (emailType === "VERIFY") {
            // Send verification email
            await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }); // 1 hour expiry
        } else if (emailType === "RESET") {
            // Send password reset email
            await User.findByIdAndUpdate(userId, { forgetPasswordToken: hashedToken, forgetPasswordTokenExpiry: Date.now() + 3600000 }); // 1 hour expiry 
    
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.mailTrapUser,
                pass: process.env.mailTrapPass
            }
        });

        const emailVerification= `<p>
            Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to   verify your email or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`
        const passwordReset= `<p>
            Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to reset your password or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/resetpassword?token=${hashedToken}
        </p>`

        const mailOptions = {
            from: "anonymous.anonymous6657@example.com",
            to: email,
            subject: emailType === "VERIFY" ? "Email Verification" : "Password Reset",
            html: emailType === "VERIFY" ? emailVerification : passwordReset
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}
