import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on("connected", () => console.log(" MongoDB Connected"));
    mongoose.connection.on("disconnected", () => console.log(" MongoDB Disconnected"));

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/minecraftmovie`);
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
};

export default connectDB;