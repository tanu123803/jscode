const API_KEY = "YOUR_OPENWEATHER_API_KEY";
let map;

// Fetch current weather by city name
async function fetchWeather(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    displayWeather(data);
    showMap(data.coord.lat, data.coord.lon);
  } catch (error) {
    alert("City not found!");
  }
}

// Display weather data
function displayWeather(data) {
  const weatherDiv = document.getElementById("weather");
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

  weatherDiv.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
    <p><b>Temperature:</b> ${data.main.temp}°C</p>
    <p><b>Condition:</b> ${data.weather[0].description}</p>
    <p><b>Humidity:</b> ${data.main.humidity}%</p>
    <p><b>Wind Speed:</b> ${data.wind.speed} m/s</p>
    <p><b>Sunrise:</b> ${sunrise}</p>
    <p><b>Sunset:</b> ${sunset}</p>
  `;
}

// Initialize Google Map
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 20.5937, lng: 78.9629 },
    zoom: 5,
  });
}

// Show map at coordinates
function showMap(lat, lon) {
  const location = { lat, lng: lon };
  map.setCenter(location);
  map.setZoom(8);
  new google.maps.Marker({ position: location, map });
}

// Search button
document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  if (city) fetchWeather(city);
});

// 5-Day Forecast button
document.getElementById("forecastBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  if (city) {
    localStorage.setItem("city", city);
    window.location.href = "forecast.html";
  } else {
    alert("Please enter a city name first!");
  }
});

// Get user's current location on load
window.onload = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  }
};

function success(position) {
  const { latitude, longitude } = position.coords;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  )
    .then((res) => res.json())
    .then((data) => {
      displayWeather(data);
      showMap(latitude, longitude);
    });
}

function error() {
  alert("Location access denied. Please search manually.");
}
