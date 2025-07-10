import "./styles.css";

let search_term = "berlin"
const API_key = "477T375DGMGEH24S6FDPG3JV3"
// key is public and does not need to be hidden

const request = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search_term}?key=${API_key}`

function fetchWeatherData(request) {
    fetch(request, {mode: 'cors'})
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

function processWeatherData(response) {
    console.log(response)
    console.log(response.days[0].tempmax)
}

// testing
fetchWeatherData(request)
