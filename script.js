// API Key and Base URL
const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your API key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// DOM Elements
const locationInput = document.getElementById("location-input");
const searchButton = document.getElementById("search-button");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const weatherConditionElement = document.getElementById("weather-condition");
const weatherIconElement = document.getElementById("weather-icon");
const precipitationElement = document.getElementById("precipitation");
const humidityElement = document.getElementById("humidity");
const windSpeedElement = document.getElementById("wind-speed");
const forecastElement = document.getElementById("forecast");

// Fetch Weather Data
async function fetchWeatherData(location) {
 try {
  const response = await fetch(`${BASE_URL}?q=${location}&appid=${API_KEY}&units=metric`);
  const data = await response.json();
  return data;
 } catch (error) {
  console.error("Error fetching weather data:", error);
 }
}

// Update UI with Weather Data
function updateUI(data) {
 if (data.cod === "404") {
  alert("Location not found. Please try again.");
  return;
 }

 // Update Current Weather
 locationElement.textContent = `${data.name}, ${data.sys.country}`;
 temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
 weatherConditionElement.textContent = data.weather[0].main;
 humidityElement.textContent = `${data.main.humidity} %`;
 windSpeedElement.textContent = `${data.wind.speed} km/h`;

 // Update Weather Icon
 const iconCode = data.weather[0].icon;
 weatherIconElement.className = `bx bx-${getWeatherIcon(iconCode)}`;

 // Update Date and Day
 const date = new Date();
 const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
 document.getElementById("day").textContent = days[date.getDay()];
 document.getElementById("date").textContent = date.toLocaleDateString();
}

// Map OpenWeatherMap Icons to Boxicons
function getWeatherIcon(iconCode) {
 const iconMap = {
  "01d": "sun", // Clear sky (day)
  "01n": "moon", // Clear sky (night)
  "02d": "cloud", // Few clouds (day)
  "02n": "cloud", // Few clouds (night)
  "03d": "cloud", // Scattered clouds
  "03n": "cloud", // Scattered clouds
  "04d": "cloud", // Broken clouds
  "04n": "cloud", // Broken clouds
  "09d": "cloud-rain", // Shower rain
  "09n": "cloud-rain", // Shower rain
  "10d": "cloud-drizzle", // Rain
  "10n": "cloud-drizzle", // Rain
  "11d": "cloud-lightning", // Thunderstorm
  "11n": "cloud-lightning", // Thunderstorm
  "13d": "cloud-snow", // Snow
  "13n": "cloud-snow", // Snow
  "50d": "cloud", // Mist
  "50n": "cloud", // Mist
 };
 return iconMap[iconCode] || "sun";
}

// Event Listener for Search Button
searchButton.addEventListener("click", async () => {
 const location = locationInput.value.trim();
 if (location) {
  const weatherData = await fetchWeatherData(location);
  updateUI(weatherData);
 } else {
  alert("Please enter a location.");
 }
});
