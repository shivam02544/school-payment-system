import mongoose from "mongoose";
const url = process.env.DB_URL;
export const connectDb = async () => {
  try {
    await mongoose.connect(url, {
      dbName: "npps",
      bufferCommands: false,
    });
    console.log("connected");
  } catch (e) {
    console.log("Error: " + e);
  }
};
