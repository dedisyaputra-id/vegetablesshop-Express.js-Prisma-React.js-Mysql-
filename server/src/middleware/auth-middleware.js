import responseError from "../error/error.js";
import prisma from "../app/database.js";

const authMiddleware = async (req, res, next) => {
  const token = req.get("Authorization");

  if (!token) {
    res.status(401).json({
      errors: "Unauthorized",
    });
  } else {
    const user = await prisma.user.findFirst({
      where: {
        token: token,
      },
      select: {
        token: true,
      },
    });

    if (!user) {
      res.status(401).json({
        errors: "Unauthorized",
      });
    } else {
      req.user = user;
      next();
    }
  }
};

export default authMiddleware;
