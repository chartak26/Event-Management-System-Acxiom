const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/auth", require("./routes/auth"));
app.use("/admin", require("./routes/admin"));
app.use("/vendor", require("./routes/vendor"));
app.use("/user", require("./routes/user"));

app.listen(5000, () => console.log("Server running on port 5000"));
