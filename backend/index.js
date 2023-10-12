import express from "express";
import mongoose from "mongoose";
import DeckModel from "./models/Deck.js";
import "dotenv/config";

const app = express();
const port = 3000;

await mongoose.connect(process.env.MONGO_URL);

app.use(express.json());

app.post("/decks", async (req, res) => {
	console.log(req.body);
	const newDeck = new DeckModel({
		title: req.body.title,
	});
	const a = await newDeck.save();
	res.send(a);
});

app.listen(port, () => {
	console.log(` app listening on port ${port}`);
});
