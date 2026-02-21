const router = require("express").Router();
const User = require("../models/User");
const Membership = require("../models/Membership");
const { auth, adminOnly } = require("../middleware/auth");

router.use(auth);
router.use(adminOnly);

router.get("/users", async (req, res) => {
 try {
  const users = await User.find().select("-password");
  res.send(users);
 } catch (error) {
  res.status(500).send(error.message);
 }
});

router.post("/add-membership", async (req, res) => {
 try {
  const { userId, duration } = req.body;
  if (!userId || !duration) return res.status(400).send("User ID and duration required");
  const membershipNumber = "MEM" + Date.now();
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + duration);
  const membership = new Membership({ membershipNumber, userId, duration, startDate, endDate });
  await membership.save();
  res.send({ message: "Membership added", membership });
 } catch (error) {
  res.status(500).send(error.message);
 }
});

router.put("/update-membership", async (req, res) => {
 try {
  const { membershipNumber, action, newDuration } = req.body; // action: extend or cancel
  const membership = await Membership.findOne({ membershipNumber });
  if (!membership) return res.status(404).send("Membership not found");
  if (action === "cancel") {
   membership.status = "cancelled";
  } else if (action === "extend") {
   membership.endDate.setMonth(membership.endDate.getMonth() + (newDuration || 6));
  }
  await membership.save();
  res.send({ message: "Membership updated", membership });
 } catch (error) {
  res.status(500).send(error.message);
 }
});

router.get("/memberships", async (req, res) => {
 try {
  const memberships = await Membership.find().populate("userId", "name email");
  res.send(memberships);
 } catch (error) {
  res.status(500).send(error.message);
 }
});

module.exports = router;
