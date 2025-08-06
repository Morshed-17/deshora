import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Databse connected", conn.connection.host);
  } catch (error) {
    console.log(`Error connecting Database ${error?.message}`);
    process.exit(-1);
  }
};

export default dbConnect;
