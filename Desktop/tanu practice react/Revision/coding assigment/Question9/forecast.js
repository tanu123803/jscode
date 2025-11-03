const API_KEY = "YOUR_OPENWEATHER_API_KEY";
const city = localStorage.getItem("city");

async function getForecast() {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();

    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = `<h2>${city}</h2>`;

    // Select data every 8th item (3-hour intervals → 8 = 24 hours)
    const dailyData = data.list.filter((_, index) => index % 8 === 0);

    dailyData.forEach((day) => {
      const date = new Date(day.dt * 1000).toLocaleDateString();
      forecastDiv.innerHTML += `
        <div class="day-card" style="background:#fff; border-radius:10px; margin:10px; padding:15px; display:inline-block; width:180px;">
          <p><b>${date}</b></p>
          <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">
          <p>${day.weather[0].description}</p>
          <p>🌡 ${day.main.temp_min}°C - ${day.main.temp_max}°C</p>
        </div>
      `;
    });
  } catch (error) {
    alert("Unable to load forecast data!");
  }
}

getForecast();
