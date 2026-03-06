require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { connectDB, sequelize } = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const claimRoutes = require("./routes/claim.routes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/claim", claimRoutes)

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});