document.addEventListener("DOMContentLoaded", function () {
  function GetAPI() {
    const newName = document.getElementById("inputcity").value;
    const cityName = document.getElementById("cityname");
    cityName.innerHTML = "---" + newName + "--";

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${newName}&appid=e19062db83c3ae61e40d3c134921009c`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log the data object to the console for inspection

        // Get the current date and time
        const currentDate = new Date();
        const currentTime = currentDate.toLocaleTimeString();

        // Display current date and time
        document.getElementById("currentDate").innerHTML = currentDate.toDateString();
        document.getElementById("centerTime").innerHTML = "Time: " + currentTime;

          // Get the current temperature, wind speed, and humidity
          const currentTemp = data.list[0].main.temp - 273.15;
          const currentTempCelsius = currentTemp;
          const currentTempFahrenheit = (currentTempCelsius * 9) / 5 + 32;
          const currentWindSpeed = data.list[0].wind.speed;
          const currentHumidity = data.list[0].main.humidity;
  
          // Display current temperature, wind speed, and humidity in the center element
          document.getElementById("centerTemp").innerHTML = "Temperature: " + currentTempFahrenheit.toFixed(1) + "°F";
          document.getElementById("centerWindSpeed").innerHTML = "Wind Speed: " + currentWindSpeed.toFixed(1) + " m/s";
          document.getElementById("centerHumidity").innerHTML = "Humidity: " + currentHumidity.toFixed(1) + "%";

        // Process the weather data for future days
        for (let i = 1; i <= 5; i++) {
          const temps = [];
          const descriptions = [];
          const humidities = [];
          const windSpeeds = [];

          // Calculate average, minimum, and maximum temperatures, humidity, and wind speed for the day
          for (let j = 0; j < 8; j++) {
            const tempCelsius = data.list[(i - 1) * 8 + j].main.temp - 273.15;
            const tempFahrenheit = (tempCelsius * 9) / 5 + 32;
            temps.push(tempFahrenheit);
            descriptions.push(data.list[(i - 1) * 8 + j].weather[0].description);
            humidities.push(data.list[(i - 1) * 8 + j].main.humidity);
            windSpeeds.push(data.list[(i - 1) * 8 + j].wind.speed);
          }

          const averageTemp = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
          const minTemp = Math.min(...temps);
          const maxTemp = Math.max(...temps);
          const averageHumidity = humidities.reduce((sum, humidity) => sum + humidity, 0) / humidities.length;
          const averageWindSpeed = windSpeeds.reduce((sum, windSpeed) => sum + windSpeed, 0) / windSpeeds.length;

          // Get the date for the day
          const day = new Date(currentDate);
          day.setDate(currentDate.getDate() + i);

          // Display date, average temperature, minimum temperature, maximum temperature, humidity, wind speed, and weather description for the day
          const dayElement = document.getElementById("day" + i + "date");
          dayElement.innerHTML = day.toDateString().substring(4);
          dayElement.style.fontWeight = "extra-bold";
          document.getElementById("day" + i + "date").innerHTML = day.toDateString().substring(4);
          document.getElementById("day" + i + "temp").innerHTML = " " + averageTemp.toFixed(1) + "°F";
          document.getElementById("day" + i + "min").innerHTML = "Min Temp: " + minTemp.toFixed(1) + "°F";
          document.getElementById("day" + i + "max").innerHTML = "Max Temp: " + maxTemp.toFixed(1) + "°F";
          document.getElementById("day" + i + "humidity").innerHTML = "Humidity: " + averageHumidity.toFixed(1) + "%";
          document.getElementById("day" + i + "windspeed").innerHTML = "Wind Speed: " + averageWindSpeed.toFixed(1) + " m/s";
          document.getElementById("day" + i + "desc").innerHTML = " " + descriptions[0];
          document.getElementById("img" + i).src = "https://openweathermap.org/img/wn/" + data.list[(i - 1) * 8].weather[0].icon + ".png";
        }
      });
  }
// Function to save search history to localStorage
function saveSearchHistory(city) {
  let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  searchHistory.push(city);
  const maxEntries = 5;
  if (searchHistory.length > maxEntries) {
    searchHistory = searchHistory.slice(-maxEntries);
  }
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// Function to retrieve search history from localStorage
function getSearchHistory() {
  return JSON.parse(localStorage.getItem('searchHistory')) || [];
}

// Example usage
const searchInput = document.getElementById('inputcity');
const searchButton = document.getElementById('searchBtn');
const searchHistoryContainer = document.getElementById('searchHistoryContainer');

searchButton.addEventListener('click', function() {
  const city = searchInput.value;
  saveSearchHistory(city);
  displaySearchHistory();
  getWeatherData(city);
});

function displaySearchHistory() {
  searchHistoryContainer.innerHTML = '';
  const searchHistory = getSearchHistory();
  const historyList = document.createElement('ol');
  searchHistory.forEach(function(city) {
    const historyItem = document.createElement('li');
    const historyLink = document.createElement('a');
    historyLink.textContent = city;
    historyLink.href = "#";
    historyLink.addEventListener('click', function() {
      searchInput.value = city;
      searchButton.click();
    });
    historyItem.appendChild(historyLink);
    historyList.appendChild(historyItem);
    });
    searchHistoryContainer.appendChild(historyList);
}

function getWeatherData(city) {
  // Your code to fetch weather data and display it goes here
  // Use the `city` parameter to fetch the weather data for the selected city
}

// Call the displaySearchHistory function when the app loads
document.addEventListener('DOMContentLoaded', function() {
  displaySearchHistory();
});
  document.getElementById("searchBtn").addEventListener("click", GetAPI);
});

