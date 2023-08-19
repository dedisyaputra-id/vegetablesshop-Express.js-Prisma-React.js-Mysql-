import express from "express";
import productController from "../controllers/product-controller.js";
import categoryController from "../controllers/category-controller.js";
import adminMiddleware from "../middleware/auth-middleware.js";
import userController from "../controllers/user-controller.js";
const adminRouter = express.Router();

adminRouter.use(adminMiddleware);
adminRouter.get("/api/products", productController.get);
adminRouter.post("/api/products", productController.post);
adminRouter.post("/api/categories", categoryController.post);
adminRouter.post("/api/:userId/logout", userController.logout);

export default adminRouter;
