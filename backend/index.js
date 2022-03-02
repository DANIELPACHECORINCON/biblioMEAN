import express from "express";
import cors from "cors";
import db from "./db/db.js";
import bookRoute from "./routes/bookRoute.js";
import lendingRoute from "./routes/lendingRoute.js";
import roleRoute from "./routes/roleRoute.js";
import userRoute from "./routes/userRote.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/user", userRoute);
app.use("/api/role", roleRoute);
app.use("/api/book", bookRoute);
app.use("/api/lending", lendingRoute);

app.listen(process.env.PORT, () =>
  console.log("Backend server running on port: " + process.env.PORT)
);

db.dbconnection();
