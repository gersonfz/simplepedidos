import mongoose from "mongoose";
import { ENV_CONFIG_PROCES } from "../config.js";

const URI = ENV_CONFIG_PROCES.MONGO_URI;

export const connectDB = async () => {
    try {
        await mongoose.connect(URI)
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error); 
    }
}