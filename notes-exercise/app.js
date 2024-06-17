const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const passwd = require("./secrets/passwd.js");

const app = express();
const port = 3000;

const uri = `mongodb+srv://diego:${passwd}@clusternote.symr1ol.mongodb.net/?retryWrites=true&w=majority&appName=ClusterNote`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

app.get("/note/:title", (req, res) => {
	try {
		const database = client.db("NoteMenager");
		const notes = database.collection("Note");
		// Query for a movie that has the title 'Back to the Future'
		const query = { title: req.params.title };
		const note = notes.findOne(query).then((note) => {
			res.send(note);

		});
//		res.send(note);
	} finally {
		// Ensures that the client will close when you finish/error
		client.close().then(() => console.log("Client closed"));
	}
});


app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
