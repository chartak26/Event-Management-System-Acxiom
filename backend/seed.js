const mongoose = require("mongoose");
const Product = require("./models/Product");
const User = require("./models/User");
const Membership = require("./models/Membership");

const connectDB = require("./config/db");

async function seed() {
  await connectDB();
  
  // Add sample users
  const users = await User.create([
    { name: "Admin", email: "admin@example.com", password: "admin", role: "admin" },
    { name: "Vendor", email: "vendor@example.com", password: "vendor", role: "vendor" },
    { name: "User", email: "user@example.com", password: "user", role: "user" }
  ]);
  
  // Add sample products
  await Product.create([
    { name: "Event Ticket", price: 100, vendorId: "sample" },
    { name: "Catering Service", price: 500, vendorId: "sample" },
    { name: "Decoration", price: 200, vendorId: "sample" }
  ]);

  // Add sample membership for user
  const user = users.find(u => u.role === "user");
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 6);
  await Membership.create({
    membershipNumber: "MEM123456",
    userId: user._id,
    duration: 6,
    startDate,
    endDate
  });
  
  console.log("Data seeded");
  process.exit();
}

seed();