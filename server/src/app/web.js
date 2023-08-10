import express from "express";
import publicRouter from "../routes/public-api.js";
import errorMiddleware from "../middleware/error-middleware.js";
import adminRouter from "../routes/admin-api.js";

const web = express();

web.use(express.json());

web.use(publicRouter);
web.use(adminRouter);
web.use(errorMiddleware);

export default web;
