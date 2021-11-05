import mongoose from "mongoose";

const connection = { isConnected: null };

async function connectDB() {
  if (connection.isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection.isConnected = db.connections[0].readyState;
    console.log(connection.isConnected);
  } catch (error) {
    console.log("failed to connect db", error.message);
  }
}

export default connectDB;
