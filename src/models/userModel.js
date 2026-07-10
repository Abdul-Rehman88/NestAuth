import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    userName:{
        type: String,
        required: [true, "Please provide a username"],
    },
    email:{
        type: String,
        required: [true, "Please provide an email"],
        unique: true
    },
    password:{
        type: String,
            required: [true, "Please provide a password"]
        },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
}) 

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User