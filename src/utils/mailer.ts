import nodemailer from "nodemailer";

interface sendEmailParams {
    email: string;
    emailType: string;
    userId: string;
}

export const sendEmail = async ({email, emailType, userId}: sendEmailParams) => 
    {
    try {
        const transporter = nodemailer.createTransport({
        host: "smtp.example.com",
        port: 587,
        secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        });

        const mailOptions = {
            from: "anonymous.anonymous6657@example.com",
            to: email,
            subject: emailType === "verification" ? "Email Verification" : "Password Reset",
            html: `Hello, this is 
            ${emailType === "verification"
                ? "Email Verification"
                : "Password Reset"
            } for userId: ${userId}`,   
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}
