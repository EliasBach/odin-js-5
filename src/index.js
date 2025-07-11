import "./styles.css";
// key is public and does not need to be hidden
const API_key = "477T375DGMGEH24S6FDPG3JV3"
const userinput = document.querySelector("#userinput")
const search_button = document.querySelector("#searchbutton")
search_button.addEventListener("click", fetchWeatherData)
const description = document.querySelector("#description")
const div_weather = document.querySelector("#current-conditions")
const weather_icon = document.querySelector('#weathericon')
const conditions_text = document.querySelector("#conditions-text")
const div_temp = document.querySelector("#temperature")
const div_temp_current = document.querySelector("#temp_current")
const div_temp_min = document.querySelector("#temp_min")
const div_temp_max = document.querySelector("#temp_max")
const div_precip = document.querySelector("#precipitation")
const div_uvindex = document.querySelector("#uv-index")
const div_wind = document.querySelector("#wind")
const div_sunrise_sunset = document.querySelector("#sunrise-sunset")
const div_sunrise = document.querySelector("#sunrise")
const div_sunset = document.querySelector("#sunset")
const infoboxes = document.querySelectorAll(".infobox")

function fetchWeatherData() {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userinput.value}?key=${API_key}`, {mode: 'cors'})
        .then(function(response) {
        return response.json()
        })
        .catch(function(error) {
            console.error('There was an error retrieving info from server:', error);
        })
        .then(function(response) {
            processWeatherData(response)
        })
        .catch(function(error) {
            console.error('There was an error handling the returned request:', error);
        });
} 

function processWeatherData(data) {
    console.log(data)
    description.textContent = `${data.resolvedAddress}: ${data.description}`
    
    // Conditions
    if (data.currentConditions.conditions.includes("Rain, Partially cloudy")) {
        weather_icon.src = require("./icons/cloud-sun-rain.png")
    } else if (data.currentConditions.conditions.includes("Partially cloudy")) {
        weather_icon.src = require("./icons/partly-cloudy-day.png")
    } else if (data.currentConditions.conditions.includes("Rain")) {
        weather_icon.src = require("./icons/rain.png")
    } else if (data.currentConditions.conditions.includes("Overcast")) {
        weather_icon.src = require("./icons/cloudy.png")
    } else if (data.currentConditions.conditions.includes("Clear")) {
        weather_icon.src = require("./icons/clear-day.png")
    } else {
        weather_icon.style.display = "none"
    }

    conditions_text.textContent = `${data.currentConditions.conditions}`
    
    // Temperature
    div_temp_current.textContent = `${tempFtoC(data.currentConditions.temp)} °C`
    div_temp_min.textContent = `min: ${tempFtoC(data.days[0].tempmin)}`
    div_temp_max.textContent = `max: ${tempFtoC(data.days[0].tempmax)}`
    
    // Rain
    div_precip.textContent = `Rain: ${data.currentConditions.precip} mm`

    // UV-Index
    div_uvindex.textContent = `UV-Index: ${data.currentConditions.uvindex}`

    // Wind
    div_wind.textContent = `Winds: ${windMPHtoKMH(data.currentConditions.windspeed)} km/h`

    // Sunset / Sunrise
    div_sunrise.textContent = `🌅: ${data.currentConditions.sunrise.slice(0, 5)}`
    div_sunset.textContent = `🌇: ${data.currentConditions.sunset.slice(0, 5)}`
    
    // display
    infoboxes.forEach((infobox) => {infobox.style.display = "block"})
}

function tempFtoC(tempF) {
    return ((tempF-32) * (5/9)).toFixed(1)
}

function windMPHtoKMH(windMPH) {
    return (windMPH*1.60934).toFixed(1)
}
