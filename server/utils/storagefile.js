import multer from "multer";
import path from "path";

const productImg = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../server/src/assets/products");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

export default {
  productImg,
};
