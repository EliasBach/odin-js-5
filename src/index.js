import "./styles.css";
// key is public and does not need to be hidden
const API_key = "477T375DGMGEH24S6FDPG3JV3"
const userinput = document.querySelector("#userinput")
const search_button = document.querySelector(".searchbutton")
search_button.addEventListener("click", fetchWeatherData)
const description = document.querySelector("#description")
const box_weather = document.querySelector("#current-conditions")
const box_temp = document.querySelector("#temperature")
const box_precip = document.querySelector("#expected-precipitation")
const box_extra = document.querySelector("#extra-info")

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
    description.textContent = `Current weather in ${data.resolvedAddress}`
    box_weather.textContent = `${data.currentConditions.conditions}`
    let tempC = tempFtoC(data.currentConditions.temp).toFixed(1)
    box_temp.textContent = `${tempC} °C`
    box_precip.textContent = `${data.currentConditions.precip}`
    box_extra.textContent = `UV-Index: ${data.currentConditions.uvindex}`
}

function tempFtoC(tempF) {
    return ((tempF-32) * (5/9))
}