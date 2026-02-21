const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", async (req, res) => {
 try {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) return res.status(400).send("All fields required");
  const user = new User({ name, email, password, role });
  await user.save();
  res.send({ message: "User registered" });
 } catch (error) {
  res.status(500).send(error.message);
 }
});

router.post("/login", async (req, res) => {
 try {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) return res.status(401).send("Invalid credentials");
  const token = jwt.sign({ id: user._id, role: user.role }, "secretkey", { expiresIn: "1h" });
  res.send({ token, user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
 } catch (error) {
  res.status(500).send(error.message);
 }
});

module.exports = router;
