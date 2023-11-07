import mongoose from "mongoose";
// track the connection
let isConnected = false;
const connectToDataBase = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("DB connected already");
    return;
  }

  if (!process.env.MONGODB_URI) {
    console.log("Missing MONGODB_URI");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "witchmaker",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};

export default connectToDataBase;
