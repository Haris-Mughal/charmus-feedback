import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("*---- DATABASE ALREADY CONNECTED ----*");
    return;
  }

  try {
    mongoose.connect(process.env.MONGODB_URI || "");

    connection.isConnected = mongoose.connections[0].readyState;

    console.log("*---- DATABASE CONNECTED SUCCESSFULLY ----*");
  } catch (err) {
    console.log("*---- DATABASE CONNECTION FAILED: ", err);
    process.exit(1);
  }
}
