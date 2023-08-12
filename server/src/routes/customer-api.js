import express from "express";
import transactionControllers from "../controllers/transaction-controllers.js";
import customerMiddleware from "../middleware/customerMiddleware.js";

const customerRouter = express.Router();

customerRouter.use(customerMiddleware);
customerRouter.post("/api/cart/:productId", transactionControllers.post);

export default customerRouter;
