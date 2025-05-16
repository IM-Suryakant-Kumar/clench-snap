import mongoose from "mongoose";

const connectDB = async (url: any) => await mongoose.connect(url);

export default connectDB;
