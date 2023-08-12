import express from "express";
import publicRouter from "../routes/public-api.js";
import errorMiddleware from "../middleware/error-middleware.js";
import adminRouter from "../routes/admin-api.js";
import customerRouter from "../routes/customer-api.js";

const web = express();

web.use(express.json());

web.use(customerRouter);
web.use(publicRouter);
web.use(adminRouter);
web.use(errorMiddleware);

export default web;
