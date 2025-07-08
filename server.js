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
app.use(express.json());
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
app.listen(5000,() => {
  console.log("Server running on port 5000");
});