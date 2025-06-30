require("dotenv").config();
// =======================
// Imports and Middleware
// =======================
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// =======================
// MongoDB Setup
// =======================

const { MongoClient } = require("mongodb");
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client
  .connect()
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

var api = require('./api.js');
api.setApp( app, client );
// =======================
// Start Server
// =======================
<<<<<<< HEAD
app.listen(5000, "0.0.0.0", () => {
=======
app.listen(5000,() => {
>>>>>>> f537c16bb8573f75b4ff89e1b79e9ad17a92c114
  console.log("Server running on port 5000");
});