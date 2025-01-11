import express from "express";
import accountRoutes from "./routes/account.js";
import authRoutes from "./routes/auth.js";
import feedRoutes from "./routes/feed.js";
import groupRoutes from "./routes/groups.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(accountRoutes);
app.use("/auth", authRoutes);
app.use("/feed", feedRoutes);
app.use(groupRoutes);

app.get((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

await mongoose.connect(
  "mongodb+srv://pet-search-api:Sundevil1896***@cluster0.wxoa6.mongodb.net/petsearch?retryWrites=true&w=majority&appName=Cluster0"
);
app.listen(8080);
