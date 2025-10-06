import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


export const protect = async (req, res, next) => {
  let token;

  try {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];

      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

     
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } else {
      return res.status(401).json({ message: "Not authorized, no token provided" });
    }
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({ message: "Not authorized, token invalid or expired" });
  }
};


export const authorizeRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ message: `Access denied: ${role} only` });
    }

    next();
  };
};
