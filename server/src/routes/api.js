import express from "express";
import authMiddleware from "../middleware/auth-middleware.js";
import productController from "../controllers/product-controller.js";

const apiRouter = express.Router();

apiRouter.use(authMiddleware);
apiRouter.get("/api/products", productController.get);

export default apiRouter;
