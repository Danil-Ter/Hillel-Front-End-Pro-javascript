const API_KEY = "302f0c63d718b6d903a3f14c23badbde";
const locationBtn = document.getElementById("location-btn");
const cityList = document.getElementById("city-list");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const description = document.getElementById("description");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const icon = document.getElementById("icon");

locationBtn.addEventListener("click", getLocation);
cityList.addEventListener("click", getWeatherByCity);
cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getWeatherByCity();
  }
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherData(lat, lon);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function getWeatherByCity(event) {
  if (event) {
    event.preventDefault();
    const city = event.target.getAttribute("data-city");
    if (city) {
      getWeatherData(null, null, city);
    }
  } else {
    const city = cityInput.value;
    if (city) {
      getWeatherData(null, null, city);
    }
  }
}

async function getWeatherData(lat, lon, city) {
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;
    if (lat && lon) {
      url += `&lat=${lat}&lon=${lon}`;
    } else if (city) {
      url += `&q=${city}`;
      localStorage.setItem("lastCity", city);
    } else {
      const lastCity = localStorage.getItem("lastCity");
      if (lastCity) {
        url += `&q=${lastCity}`;
      } else {
        url += `&q=Rome`;
      }
    }
    const response = await fetch(url);
    const data = await response.json();
    showWeatherData(data);
  } catch (error) {
    console.error(error);
    alert("An error occurred while fetching weather data.");
  }
}

function showWeatherData(data) {
  cityName.innerText = data.name;
  description.innerText = data.weather[0].description;
  temperature.innerText = Math.round(data.main.temp - 273.15) + "\u00B0C";
  humidity.innerText = "Humidity: " + data.main.humidity + " %";
  windSpeed.innerText = "Wind Speed: " + data.wind.speed + " m/s";
  pressure.innerText = "Pressure: " + data.main.pressure + " hPa";
  const visibilityMeters = data.visibility;
  const visibilityKilometers = (visibilityMeters / 1000).toFixed(2);
  const visibilityElement = document.getElementById("visibility");
  visibilityElement.innerText = "Visibility: " + visibilityKilometers + " km";
  const iconCode = data.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
  icon.setAttribute("src", iconUrl);
}

const lastCity = localStorage.getItem("lastCity");
getWeatherData(null, null, lastCity || "Rome");

const now = new Date();
const currentHour = now.getHours();
const currentMinute = now.getMinutes();

const time = `${currentHour}:${
  currentMinute < 10 ? "0" + currentMinute : currentMinute
} ${currentHour < 12 ? "AM" : "PM"}`;

const { month, date } = {
  month: now.toLocaleString("en-US", { month: "long" }),
  date: now.getDate(),
};

const dateTime = `${time}, ${month} ${date}`;
document.getElementById("datetime").textContent = dateTime;
