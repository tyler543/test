require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const { MongoClient } = require("mongodb");
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect().then(() => console.log("MongoDB Connected"));

const api = require("./api.js");
api.setApp(app, client);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});