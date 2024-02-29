const apiKEY = "3733a6748b98e8d31d222d31443a6257";
const weatherData = document.getElementById("weather-data");
const inputCity = document.getElementById("city-input");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityVal = inputCity.value;
  console.log(cityVal);
  getWeatherData(cityVal);
});

async function getWeatherData(cityVal) {
  try {
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=${apiKEY}&units=metric`
    );
    if (!res.ok) {
      throw new Error("Network response is not ok");
    }
    const data = await res.json();

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed}m/s`,
    ];

    weatherData.querySelector(".icon").innerHTML = `
      <img
        src="http://openweathermap.org/img/wn/${icon}.png"
        alt="weather icon"
      />
    `;
    weatherData.querySelector(".temperature").textContent = `${temperature}°C`;
    weatherData.querySelector(".description").textContent = `${description}`;
    weatherData.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherData.querySelector(".icon").innerHTML = "";
    weatherData.querySelector(".temperature").textContent = "";
    weatherData.querySelector(".description").textContent =
      "Please type Name Correctly! try Again ";
    weatherData.querySelector(".details").innerHTML = details
      .map((detail) => `<div> </div>`)
      .join("");
  }
}
