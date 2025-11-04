const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

module.exports = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.redirect("/register");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error("JWT invalide ou expiré:", err.message);
    res.clearCookie("token");
    return res.redirect("/register");
  }
};
