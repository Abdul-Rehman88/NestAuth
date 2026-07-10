import mongoose from "mongoose";

export async function connectDB() {
    try {
        const uri = process.env.MONGOOSE_URI;
        if (!uri) {
            throw new Error("MONGOOSE_URI is not defined in the environment variables.");
        }
        const db = mongoose.connection;
        db.on("connected", () => {
            console.log("Connected to MongoDB");
        });
        db.on("error", (error) => {
            console.error("Error connecting to MongoDB:", error);
            process.exit(1);
        });
        await mongoose.connect(uri);
        
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}



