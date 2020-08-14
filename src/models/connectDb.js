import mongoose from "mongoose";

async function connectDb() {
  return await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
}

export default connectDb;
