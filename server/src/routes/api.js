import express from "express";
import authMiddleware from "../middleware/auth-middleware.js";
import productController from "../controllers/product-controller.js";
import categoryController from "../controllers/category-controller.js";

const apiRouter = express.Router();

apiRouter.use(authMiddleware);
apiRouter.get("/api/products", productController.get);
apiRouter.post("/api/products", productController.post);
apiRouter.post("/api/categories", categoryController.post);

export default apiRouter;
