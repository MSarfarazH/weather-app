//Naming the needed containers
const searchInput = document.querySelector("#search-input");
//const citiesInputEl = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const currentEl = document.querySelector("#currentWeather");
const cities = []

var saveSearchHistory = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
};

//Assigning action to the submit button
searchButton.addEventListener("click", weatherData);
saveSearchHistory()

//For todays date
var today = new Date(date);
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

//What the 'Submit' button does; Fetching api data and displaying it.
function weatherData() {
  const searchValue = searchInput.value;

  var lat;
  var lon;
  console.log(searchValue);
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&appid=4faf9d217984276ad6eaf8a085f08b57`
  )
    .then((response) => response.json())
    .then(function (data) { 
    console.log(data);

    // To display the current city
    const cityName = JSON.stringify(data[0].name);
    $('#currentCity').html(searchValue);
    // console.log(cityName);

      lat = data[0].lat;
      lon = data[0].lon;
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=4faf9d217984276ad6eaf8a085f08b57`
      )
        .then((response) => response.json())
        .then((data) => {
        console.log(data);
        
        displayWeather(data)
        });
    });
    function displayWeather(data) {

        const dateEl = document.querySelector("#currentDate")
        dateEl.innerText = `Date: ${today.Date}`
        
        const windEl = document.querySelector("#wind")
        windEl.innerText = `Wind: ${data.current.wind_speed} MPH`

        const tempEl = document.querySelector("#temp")
        tempEl.innerText = `Temp: ${data.current.temp}`

        const humidityEl = document.querySelector("#humidity")
        humidityEl.innerText = `humidity: ${data.current.humidity}%`

        const uvEl = document.querySelector("#uvindex")
        uvEl.innerText = `UV index: ${data.current.uvi}`
        

        
    }
      }
    

