const router = require("express").Router();
const Product = require("../models/Product");
const Order = require("../models/Order");
const Membership = require("../models/Membership");
const { auth } = require("../middleware/auth");

router.use(auth);

router.get("/products", async (req, res) => {
 try {
  const products = await Product.find();
  res.send(products);
 } catch (error) {
  res.status(500).send(error.message);
 }
});

router.post("/order", async (req, res) => {
 try {
  const order = new Order(req.body);
  await order.save();
  res.send({ message: "Order placed", order });
 } catch (error) {
  res.status(500).send(error.message);
 }
});

router.get("/orders/:id", async (req, res) => {
 try {
  const orders = await Order.find({ userId: req.params.id });
  res.send(orders);
 } catch (error) {
  res.status(500).send(error.message);
 }
});

router.get("/membership/:userId", async (req, res) => {
 try {
  const membership = await Membership.findOne({ userId: req.params.userId });
  res.send(membership);
 } catch (error) {
  res.status(500).send(error.message);
 }
});

router.put("/update-membership/:id", async (req, res) => {
 try {
  const { action, newDuration } = req.body;
  const membership = await Membership.findById(req.params.id);
  if (!membership || membership.userId.toString() !== req.user.id) return res.status(403).send("Unauthorized");
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

module.exports = router;
