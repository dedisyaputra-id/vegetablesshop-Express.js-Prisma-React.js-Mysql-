import express from "express";
import transactionControllers from "../controllers/transaction-controllers.js";
import customerMiddleware from "../middleware/customerMiddleware.js";

const customerRouter = express.Router();

customerRouter.use(customerMiddleware);
customerRouter.get("/api/cart/", transactionControllers.get);
customerRouter.post("/api/cart/:productId", transactionControllers.post);
customerRouter.put("/api/cart/:orderNumber", transactionControllers.update);
customerRouter.delete("/api/cart/:orderNumber", transactionControllers.destroy);
customerRouter.put(
  "/api/cart/:orderNumber/checkout",
  transactionControllers.checkout
);

export default customerRouter;
