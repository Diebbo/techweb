const apiKey = "551c36f828e99995d93563d004b99200"; //metti qui la tua chiave
const citySelect = document.getElementById("city-select");
const weatherCards = document.getElementById("weather-cards"); //div to fill with weather cards
const form = document.getElementById("city-form"); //form to get the city
// const cities = ["Milano", "Roma", "Bologna", "Palermo", "Napoli", "Torino", "Firenze"];
//for the home exercise using Promise.all

function clearWeatherCards() {
  weatherCards.innerHTML = "";
  //removes the weather cards from the div
}

function getWeather(selectedCity, apiKey) {
  clearWeatherCards();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&lang=it&units=metric&appid=${apiKey}`;

  console.log(url);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let card = `<div class="card" style="width: 12rem;">
  <img class="card-img-top" src="https://scholar.googleusercontent.com/citations?view_op=view_photo&user=NQbKzs4AAAAJ&citpid=3" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Tempo di ${selectedCity}</h5>
    <p class="card-text">${data.weather[0].description} - ${data.main.temp} gradi (feels like ${data.main.feels_like})</p>
  </div>
</div>`;

      var tempElement = document.createElement("div");
      tempElement.innerHTML = card;

      // Append the DOM element to the container
      document
        .getElementById("card-container")
        .appendChild(tempElement.firstChild);
    });
}

//oppure:
// async function getWeather(selectedCity, apiKey) {
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&lang=it&units=metric&appid=${apiKey}`;
//   riempi se vuoi usare invece async await
//}

form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevents form from refreshing page
  const selectedCity = document.getElementById("city-select").value;
  getWeather(selectedCity, apiKey);
});
