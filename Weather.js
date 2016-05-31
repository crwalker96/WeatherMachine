var longitude = 0;
var latitude = 0;
var apiKey = '59d0004265d97d65d235444e7c8eb981';
function getWeather() {
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey, function(result) {
        console.log(result);
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
        console.log(latitude + " " + longitude);
        getWeather();
    });
}
$(document).ready(function () {
    
});
