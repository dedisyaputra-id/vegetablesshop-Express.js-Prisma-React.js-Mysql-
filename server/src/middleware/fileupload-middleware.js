import multer from "multer";
import storagefile from "../../utils/storagefile.js";

export const product = (req, res, next) => {
  multer({
    storage: storagefile.productImg,
  }).single("productImg");

  next();
};
