function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();

  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[now.getDay()];
  return `${day} ${hour}:${minutes}`;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  let days = ["Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
              <div class="col-2">
                <div class="forecast-date">${day}</div>
                <img
                  src="http://openweathermap.org/img/wn/50d@2x.png"
                  width="42"
                />
                <div class="forecast-temperatures">
                  <span class="forecast-temperature-max">18°C</span>
                  <span class="forecast-temperature-min">12°C</span>
                </div>
              </div>
     `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "980a8d5f4424856ca41f2ff003d92ffc";

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#current-weekday");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "980a8d5f4424856ca41f2ff003d92ffc";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#name-of-city");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature;

let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Kharkiv");
