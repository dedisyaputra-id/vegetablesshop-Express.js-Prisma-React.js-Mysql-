import express from "express";
import productController from "../controllers/product-controller.js";
import categoryController from "../controllers/category-controller.js";
import adminMiddleware from "../middleware/auth-middleware.js";
import userController from "../controllers/user-controller.js";
import multer from "multer";
import storagefile from "../../utils/storagefile.js";

const adminRouter = express.Router();
const fileUploadMiddlware = multer({ storage: storagefile.productImg }).single(
  "productImg"
);

adminRouter.use(adminMiddleware);
adminRouter.get("/api/products", productController.get);
adminRouter.post("/api/products", fileUploadMiddlware, productController.post);
adminRouter.put(
  "/api/products/:name",
  fileUploadMiddlware,
  productController.update
);
adminRouter.post("/api/categories", categoryController.post);
adminRouter.post("/api/:userId/logout", userController.logout);

export default adminRouter;
