import multer from "multer";
import storagefile from "../../utils/storagefile.js";

export const product = (req, res, next) => {
  const storage = multer({ storage: storagefile.productImg });

  storage.single("productImg");

  next();
};
