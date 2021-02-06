const weather = document.querySelector(".weather");
const city = document.querySelector(".city");

const API_KEY = "ab215e718aa6e47435be619b64e61344";
const COORDS = "coords";

function getWeather(lat, long) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const place = json.name;
      const temperature = json.main.temp;
      const temMax = json.main.temp_max;
      const temMin = json.main.temp_min;
      const feelsLike = json.main.feels_like;
      const humidity = json.main.humidity;
      const pressure = json.main.pressure;
      const windSpeed = json.wind.speed;
      weather.innerText = `현재 ${temperature}℃ (${temMax}/${temMin}) \n체감온도 ${feelsLike}도 \n습도 ${humidity}%`;
      city.innerText = `${place}`;
    });
}

function saveCoords(coordsOb) {
  localStorage.setItem(COORDS, JSON.stringify(coordsOb));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsOb = {
    latitude,
    longitude,
  };
  saveCoords(coordsOb);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("위치 정보에 접근할 수 없습니다.");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
