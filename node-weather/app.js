const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const apiKey = "551c36f828e99995d93563d004b99200"; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/weather', async (req, res) => {
  const city = req.body.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// https://dbpedia.org/sparql?query=SELECT%20?abstract%20WHERE%20{?city%20a%20dbo:City;%20rdfs:label%20%22Bologna%22@en.%20?city%20dbo:abstract%20?abstract.%20FILTER(langMatches(lang(?abstract),%22EN%22)%20||%20langMatches(lang(?abstract),%22en%22)).}%20LIMIT%201&format=json
