var coordURL="https://api.tomtom.com/search/2/search/";
var weathURL="https://api.openweathermap.org/data/2.5/forecast?lat=";
var weathKey="67a83d3e2ef4d6c7b660a0e65d4b2374";
var coordKey="y0pVQSvHQrXAAsu3agLiBQyCjRP4dtW0";
var latit = 0;
var longit = 0;
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


function getCoordinates() {
	var searchTerms = document.getElementById("search");
	var searchVal = "miami";
	if(searchTerms){
        	searchVal = searchTerms.value;
	}

	a=$.ajax({
		url: coordURL + searchVal + '.json?minFuzzyLevel=1&maxFuzzyLevel=2&fuelSet=&view=Unified&key=' + coordKey,
		method: "GET"
	}).done(function(data){
		latit = data.results[0].position.lat;
		longit = data.results[0].position.lon;
		getWeather();
	}).fail(function(error){
		$("#searchBar").html("<h2>Invalid Search Parameters</h2>");
	});
}

function getWeather() {
	a=$.ajax({
		url: weathURL + latit + '&lon=' + longit + '&cnt=40&appid=' + weathKey + "&units=imperial",
		method: "GET",
	}).done(function(data){
	let foreDay = 1;
	for(let i = 0; i < 40; i+=8){
		let currentWeather = data.list[i].weather[0];
		let date = new Date(data.list[i].dt * 1000);
		let name = days[date.getDay()];
		let pic = currentWeather.icon;
		let iconPic = "http://openweathermap.org/img/wn/" + pic + "@2x.png";
	 	$("#dayOfWeek" + foreDay).html(name);
		$("#date" + foreDay).html((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
		$("#temps" + foreDay).html(data.list[i].main.temp_min + "/" + data.list[i].main.temp_max);
		$("#forecast" + foreDay).html("<img src=" + iconPic + ">");
		$("#visibility" + foreDay).html("Visibility: " + data.list[i].visibility + "m");
		$("#humidity" + foreDay).html("Humidity: " + data.list[i].main.humidity + "%");
		foreDay++;
	}
	}).fail(function(error) {
		console.log("error");
	});
}
