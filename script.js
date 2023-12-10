

function GetAPI() {
    const newName = document.getElementById("inputcity");
    const cityName = document.getElementById("cityname");
    cityName.innerHTML = "---" + newName.value + "--";
  
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + newName.value + '&appid=eef815747e53f2d4940ca279d8b75b2')
      .then(response => response.json())
      .then(data => {
        // Process the weather data
        for(i=0; i<5; i++)
            document.getElementById("day" +(i + 1) + "Min").innerHTML = "Min" + Number(data.list[i].main.temp_min
        -285.53).toFixed(1) + "0"
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
  