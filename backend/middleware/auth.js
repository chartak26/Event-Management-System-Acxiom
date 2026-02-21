const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
 const token = req.header("Authorization")?.replace("Bearer ", "");
 if (!token) return res.status(401).send("Access denied");
 try {
  const verified = jwt.verify(token, "secretkey");
  req.user = verified;
  next();
 } catch (error) {
  res.status(400).send("Invalid token");
 }
};

const adminOnly = (req, res, next) => {
 if (req.user.role !== "admin") return res.status(403).send("Admin access required");
 next();
};

module.exports = { auth, adminOnly };
