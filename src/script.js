

function showTemp(response) {
	document.querySelector("h1").innerHTML = response.data.name;

	celsiusTemp = response.data.main.temp;

	document.querySelector("#temp").innerHTML = Math.round(celsiusTemp);

	let iconElement = document.querySelector("#forecast_image");
	iconElement.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);


}

function searchLocation(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
	axios.get(url).then(showTemp);
}


function dispalyForecast(response) {

	let forecastElement = document.querySelector("#container_forecast");
	forecastElement.innerHTML = null;
	let forecast = null;

	for (let index = 0; index < 6; index++) {
		forecast = response.data.list[index];
		forecastElement.innerHTML += `
			<div class="col">
				<img src="http://openweathermap.org/img/wn/${
			forecast.weather[0].icon
			}@2x.png" />
			</div> 
			<div class="w-100">
			</div>
			<div class="col">
				<p class="date" id="forecast_date">
					`
		$ {
			today
		}
		`</p>
			</div>
	  	<div class="w-100">
			</div>
			<div class="col">
				<p class="status" id="forecast-status">
					`
		$ {
			forecast.weather[0].description
		}
		`
				</p>
			</div>
			<div class="w-100">
			</div>
			<div class="col">
				<p id="forecast-temp">
					${Math.round(forecast.main.temp_max)} °C| ${Math.round(forecast.main.temp_min)}°C
				</p>
			</div>
		</div>
	

		
		`





		function search(city) {
			let weatherUrl = `
	https: //api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
			axios.get(weatherUrl).then(showTemp);

			apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
			axios.get(apiUrl2).then(displayForecast);
		}

		function searchCity(event) {
			event.preventDefault();
			let city = document.querySelector("#city").value;
			search(city);
		}

		function getLocation(event) {
			event.preventDefault();
			navigator.geolocation.getCurrentPosition(searchLocation);
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