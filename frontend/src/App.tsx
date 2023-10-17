import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [title, setTitle] = useState("");
	const [decks, setDecks] = useState([]);

	async function handleCreateDeck(e: { preventDefault: () => void }) {
		e.preventDefault();
		await fetch("http://localhost:3000/decks", {
			method: "POST",
			body: JSON.stringify({
				title,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		setTitle("");
	}

	useEffect(() => {
		async function fetchDecks() {
			const response = await fetch("http://localhost:3000/decks");
			const newDecks = await response.json();
			setDecks(newDecks);
		}
		fetchDecks();
	}, []);

	return (
		<div className="App">
			<div className="decks">
				{decks.map((deck) => (
					<li>{deck.title}</li>
				))}
			</div>
			<form onSubmit={handleCreateDeck}>
				<label htmlFor="deck-title">Deck Title</label>
				<input
					id="deck-title"
					value={title}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setTitle(e.target.value);
						console.log(title);
					}}
				/>
				<button>Create Deck</button>
			</form>
		</div>
	);
}

export default App;
