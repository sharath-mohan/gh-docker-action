const express = require("express");
require("dotenv/config");
const { MongoClient } = require("mongodb");
const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_DB_USER_NAME = process.env.MONGO_DB_USER_NAME || "";
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD || "";

const MONGO_DB_URL = `mongodb+srv://${MONGO_DB_USER_NAME}:${MONGO_DB_PASSWORD}@cluster0.vhxptw9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(MONGO_DB_URL);

app.get("/", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");
    const query = { title: "Back to the Future" };
    const movie = await movies.findOne(query);
    return res.json({ movie });
  } catch (error) {
    res.status(400).json({ error });
  } finally {
    await client.close();
  }
});

module.exports = { app };
