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

function searchCity(event) {
	event.preventDefault();
	let city = document.querySelector("#city").value;
	let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(weatherUrl).then(showTemp);
}

let searchForm = document.querySelector("#form");
searchForm.addEventListener("submit", searchCity);

//current location id  #location  | temperature #temp | #city | #form

//let currentLocationButton = document.querySelector("#location");
//zcurrentLocationButton.addEventListener("click", getLocation);
