import express from "express";
import authMiddleware from "../middleware/auth-middleware.js";
import productController from "../controllers/product-controller.js";
import categoryController from "../controllers/category-controller.js";

const adminRouter = express.Router();

adminRouter.use(authMiddleware);
adminRouter.get("/api/products", productController.get);
adminRouter.post("/api/products", productController.post);
adminRouter.post("/api/categories", categoryController.post);

export default adminRouter;
