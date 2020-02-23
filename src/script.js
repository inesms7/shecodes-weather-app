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

function showCity(event) {
	event.preventDefault();
	let input = document.querySelector("#city");

	let heading = document.querySelector("h1");
	heading.innerHTML = `${input.value}`;

	let apiKey = "3cfbc7eebafcf9149917ab5969c53e6c";

	let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;

	axios.get(weatherUrl).then(showTemp);
}

let form = document.querySelector("#form");
form.addEventListener("submit", showCity);

let apiKey = "3cfbc7eebafcf9149917ab5969c53e6c";
let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

function showTemp(response) {
	let temperature = Math.round(response.data.main.temp);
	let currentLocation = response.data.name;

	let temperatureDegrees = document.querySelector("#temp");
	temperatureDegrees.innerHTML = `${temperature}ºC`;

	let h1 = document.querySelector("h1");
	h1.innerHTML = `${currentLocation}`;
}

axios.get(weatherUrl).then(showTemp);

function showLocation(position) {
	let apiKey = "3cfbc7eebafcf9149917ab5969c53e6c";

	let lat = position.coords.latitude;
	let lon = position.coords.longitude;

	let locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

	axios.get(`${locationUrl}`).then(showTemp);
}

function getPosition() {
	navigator.geolocation.getCurrentPosition(showLocation);
}

let button = document.querySelector("#location");
button.addEventListener("click", getPosition);

function changeTemp(event) {
	let temp1 = document.querySelector("#temp");
	temp1.innerHTML = `20ºC | 10ºC`;
}

function changeToF(event) {
	event.preventDefault();
	let temp2 = document.querySelector("#temp");
	temp2.innerHTML = Math.round((toFarenheit * 9) / 5 + 32);
}

let temperature2 = document.querySelector("#fht");
temperature2.addEventListener("click", changeToF);

let temperature = document.querySelector("#cel");
temperature.addEventListener("click", changeTemp);
