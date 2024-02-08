const jwt=require("jsonwebtoken")
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(403).json({
            success: false,
            message: "Token has expired",
          });
        } else {
          return res.status(403).json({
            success: false,
            message: "Invalid Token",
          });
        }
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "You are not authorized",
    });
  }
};
module.exports=verifyToken