/*Date*/

let today = new Date();
let paragraph = document.querySelector("#date");
let paragraph2 = document.querySelector("#time");

let hour = today.getHours();
if (hour < 10) {
    hour = `0${hour}`;
}

let minutes = today.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}

let days = ["Sunday", "Monday", "Tuesday", "Thursday", "Friday", "Saturday"];
let day = days[today.getDay()];

let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

let month = months[today.getMonth()];

let Tday = today.getDate();

let year = today.getFullYear();

paragraph.innerHTML = `${month} ${Tday}, ${year}`;
paragraph2.innerHTML = `${day}, ${hour}:${minutes}`;



function defineHours(timestamp) {

    let today = new Date(timestamp);
    let hour = today.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }

    let minutes = today.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${hour}:${minutes}`;
}


/*Search Engine*/

let apiKey = "3cfbc7eebafcf9149917ab5969c53e6c";


function showTemp(response) {
    let temperature = document.querySelector("#temp");
    let cityElement = document.querySelector("h1");
    let description = document.querySelector("h4");
    let sun = document.querySelector("#sunny");

    celsiusTemp = response.data.main.temp;

    temperature.innerHTML = Math.round(celsiusTemp);
    cityElement.innerHTML = response.data.name;
    description.innerHTML = response.data.weather[0].description;
    sun.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}


function showForecast(response) {
    let forecastElement = document.querySelector("#container_forecast");
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let index = 0; index < 6; index++) {
        forecast = response.data.list[index];
        forecastElement.innerHTML += `

                <div class = "col"> 
                     <img
                     src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
                </div> 
                
                <div class="w-100"></div>
                 <div class="col"> 
                    <p class="date" id="forecast_date"> ${defineHours(forecast.dt * 1000)}</p>
                </div>
                
                <div class="w-100">
                </div> 
                <div class="col"> 
                    <p class="status"
                        id="forecast-status"></p></div>
                <div class="w-100"> 
                </div> 
                <div class="col"> 
                    <p id="forecast-temp"><strong>
                        ${Math.round(forecast.main.temp_max)}°</strong> 
                        | ${Math.round(forecast.main.temp_min)}°
                    </p>
                </div>`

    }
}

function search(city) {
    let apiKey = "3cfbc7eebafcf9149917ab5969c53e6c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemp);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showForecast);

}

function searchCity(event) {
    event.preventDefault();
    let city = document.querySelector("#city");
    search(city.value);
}

function getLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}


function searchLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showTemp);
}


function showFahrenheit(event) {
    event.preventDefault();
    let celsiusToFahrenheit = document.querySelector("#temp");
    let changeTemperature = (celsiusTemp * 9) / 5 + 32;
    celsiusToFahrenheit.innerHTML = Math.round(changeTemperature);
}

function showCelsius(event) {
    event.preventDefault();
    let FahrenheiToCelsius = document.querySelector("#temp");
    FahrenheiToCelsius.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let searchForm = document.querySelector("#form");
searchForm.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#location");
currentLocationButton.addEventListener("click", getLocation);

let changeToFahrenheit = document.querySelector("#fht");
changeToFahrenheit.addEventListener("click", showFahrenheit);

let changeToCelsius = document.querySelector("#cel");
changeToCelsius.addEventListener("click", showCelsius);

search("Rome");