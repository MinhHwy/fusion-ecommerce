const jwt = require("jsonwebtoken");
const User = require("../models/user"); // ✅ đúng lowercase

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // 👇 LOG 1: xem JWT_SECRET server đang dùng
      console.log("JWT_SECRET:", process.env.JWT_SECRET);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
// 👇 LOG 2: xem payload giải mã được
      console.log("Decoded:", decoded);
      const user = await User.findById(decoded.id).select("-password");
// 👇 LOG 3 (khuyến nghị)
      console.log("User from DB:", user);
      // 🔥 BẮT BUỘC kiểm tra
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Auth error:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};


module.exports = { protect };
