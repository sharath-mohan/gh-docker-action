const express = require("express");
require("dotenv/config");
const { MongoClient } = require("mongodb");
// import { MongoClient, ServerApiVersion } from "mongodb";
const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_DB_USER_NAME = process.env.MONGO_DB_USER_NAME || "";
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD || "";

const MONGO_DB_URL = `mongodb+srv://${MONGO_DB_USER_NAME}:${MONGO_DB_PASSWORD}@cluster0.vhxptw9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(MONGO_DB_URL);
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
app.get("/", async (req, res) => {
  try {
    await client.connect();
    // const database = client.db("sample_mflix");
    // const movies = database.collection("movies");
    // const query = { title: "Back to the Future" };
    // const movie = await movies.findOne(query);
    // return res.json({ movie });
    await client.db("admin").command({ ping: 1 });
    res.json({ msg: "connected successfully" });
  } catch (error) {
    res.status(400).json({ error });
  } finally {
    await client.close();
  }
});

// app.listen(PORT, () => {
//   console.log(`app running successfully on ${PORT}`);
// });
module.exports = { app };
