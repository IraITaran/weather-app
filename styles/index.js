let now = new Date();
let minutes = now.getMinutes();
let hour = now.getHours();

let days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
let day = days[now.getDay()];

let date = document.querySelector(".current-weekday");
date.innerHTML = `${day} ${hour}:${minutes}`;

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", cityValue);

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector(".current-temperature");
  currentTemperature.innerHTML = `${temperature}°`;
}

function cityValue(event) {
  event.preventDefault();
  let cityName = document.querySelector("#name-of-city");
  let currentCity = document.querySelector(".current-city");
  currentCity.innerHTML = cityName.value;

  let apiKey = "980a8d5f4424856ca41f2ff003d92ffc";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=metric`;

  axios.get(url).then(showWeather);
}
