let today = new Date();

let paragraph = document.querySelector("#date");
let paragraph2 = document.querySelector("#time");

let hour = today.getHours();

let minutes = today.getMinutes();

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

let apiKey = "3cfbc7eebafcf9149917ab5969c53e6c";

function showTemp(response) {
	document.querySelector("h1").innerHTML = response.data.name;
	document.querySelector("#temp").innerHTML = Math.round(
		response.data.main.temp
	);
}

function searchLocation(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
	axios.get(url).then(showTemp);
}

function search(city) {
	let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(weatherUrl).then(showTemp);
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

let searchForm = document.querySelector("#form");
searchForm.addEventListener("submit", searchCity);

search("Rome");

let currentLocationButton = document.querySelector("#location");
currentLocationButton.addEventListener("click", getLocation);
