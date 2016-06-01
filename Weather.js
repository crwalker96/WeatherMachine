var longitude = 0;
var latitude = 0;
var apiKey = '59d0004265d97d65d235444e7c8eb981';
var temperature = 0;
var isCelsius = true;
var imageKey = {
    "clear sky": '<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div>',
    "few clouds": '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>',
    "scattered clouds": '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>',
    "broken clouds": '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>',
    "shower rain": '<div class="icon sun-shower"><div class="cloud"></div><div class="sun"><div class="rays"></div></div><div class="rain"></div></div>',
    "rain": '<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>',
    "thunderstorm": '<div class="icon thunder-storm"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>',
    "snow": '<div class="icon flurries"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>',
    "mist": '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>'
}
function toOtherUnit(current) {
    if (isCelsius) {
        isCelsius = false;
        return Math.round(current * 9 / 5 + 32);
    } else {
        isCelsius = true;
        return Math.round((current - 32) * 5 / 9);
    }
}
function getWeather() {
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey, function (result) {
        temperature = Math.round(result.main.temp - 273.15);
        $("#location").text(result.name + ", " + result.sys.country);
        $("#temperature").html(temperature + '\xB0 <span class="fake-link" id="degree-unit">C</span>');
        $("#conditions").text(result.weather[0].main);
        $("#image").html(imageKey[result.weather[0].description]);
    });
    /*$.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey,
        accepts: {
            json: 'application/json'
        },
        dataType: 'json',
        success: function (result) {
            console.log(result);
        }
    });*/
}
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        getWeather();
    });
}
function switchDegree () {
    var newTemperature = toOtherUnit(temperature);
    temperature = newTemperature;
    if (isCelsius) {
        $("#temperature").html(temperature + '\xB0 <span class="fake-link" id="degree-unit">C</span>');
    }
    else {
        $("#temperature").html(temperature + '\xB0 <span class="fake-link" id="degree-unit">F</span>');
    }
}
$(document).ready(function () {
    $("body").on("click", "#degree-unit", switchDegree);
});
