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

        // Get the current date
        const currentDate = new Date();

        // Display current date
        document.getElementById("currentDate").innerHTML = currentDate.toDateString();

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

  document.getElementById("searchBtn").addEventListener("click", GetAPI);
});

