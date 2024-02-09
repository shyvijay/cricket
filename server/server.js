const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.unsubscribe(bodyParser.json());

mongoose.connect(
  "mongodb+srv://admin:password1234@cricket.ptjjrub.mongodb.net/"
);
const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to database");
});
const playerSchema = mongoose.Schema({
  name: String,
  team: String,
  runs: Number,
  wickets: Number,
});

const Player = mongoose.model("Player", playerSchema);

//routes setup
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/api/players", async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    console.log("Error", error.message);
  }
});

app.post("/api/players", async (req, res) => {
  try {
    const newPlayer = await Player(req.body);
    const savedPlayer = await newPlayer.save();
    res.json(savedPlayer);
  } catch (error) {
    console.log("Error", error.message);
  }
});

app.put("/api/players/:id", async (req, res) => {
  try {
    const updatedPlayer = await Player.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPlayer);
  } catch (error) {
    console.log("Error", error.message);
  }
});

app.delete("/api/delete/:id", async (req, res) => {
  try {
    await Player.findByIdAndDelete(req.params.id);
    res.send("Player deleted successfully");
  } catch (error) {
    console.log("Error", error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
