import express from "express";
import accountRoutes from "./routes/account.js";
import authRoutes from "./routes/auth.js";
import feedRoutes from "./routes/feed.js";
import groupRoutes from "./routes/groups.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.use(accountRoutes);
app.use("/auth", authRoutes);
app.use("/feed", feedRoutes);
app.use(groupRoutes);

await mongoose.connect(
  "mongodb+srv://pet-search-api:Sundevil1896***@cluster0.wxoa6.mongodb.net/petsearch?retryWrites=true&w=majority&appName=Cluster0"
);
app.listen(8080);
