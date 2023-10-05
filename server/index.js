import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoute from "./routes/todoRoute.js";

const app = express();
dotenv.config();

//PORT
const PORT = 4000;

//connectDB
mongoose.set("strictQuery", false);
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connected failed");
  }
}
connectToDatabase();

app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use("/", todoRoute);

app.listen(PORT, () => {
  console.log(`CONNECT SERVER ON PORT ${PORT}`);
});
