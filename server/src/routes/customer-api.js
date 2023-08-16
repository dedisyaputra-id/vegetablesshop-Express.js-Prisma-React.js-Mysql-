import express from "express";
import transactionControllers from "../controllers/transaction-controllers.js";
import customerMiddleware from "../middleware/customerMiddleware.js";

const customerRouter = express.Router();

customerRouter.get(
  "/api/cart/",
  transactionControllers.get,
  customerMiddleware
);
customerRouter.post(
  "/api/cart/:productId",
  transactionControllers.post,
  customerMiddleware
);
customerRouter.put(
  "/api/cart/:orderNumber",
  transactionControllers.update,
  customerMiddleware
);
customerRouter.delete(
  "/api/cart/:orderNumber",
  transactionControllers.destroy,
  customerMiddleware
);
customerRouter.patch(
  "/api/cart/:orderNumber/checkout",
  transactionControllers.checkout,
  customerMiddleware
);

export default customerRouter;
