import mongoose from "mongoose";
import colors from "colors";
export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connected to Database".bgGreen))
    .catch((err) => {
      console.error("failed to connect with mongo");
      console.error(err);
    });
};
