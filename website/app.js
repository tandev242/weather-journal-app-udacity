/* Global Variables */
// the format of API:  https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip="
const serverURL = "http://localhost:3000"
const apiKey = "1b86b130d14d2ae74260ab64fa44ad20"

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

const btn = document.getElementById('generate')
const date = document.getElementById('date')
const temp = document.getElementById('temp')
const content = document.getElementById('content')
const place = document.getElementById('place')

btn.addEventListener('click', generateWeather)

async function generateWeather() {
    const zipCode = document.getElementById('zip').value
    const myFeelings = document.getElementById('feelings').value

    if (zipCode && myFeelings) {
        try {
            const data = await fetchWeatherData(zipCode)
            if (data) {
                // get temperature and convert to degree Celsius
                const temp = data.main.temp - 273
                const place = `${data.name}, ${data.sys.country}`
                await addWeatherDataToServer({
                    date : newDate,
                    temp,
                    place,
                    myFeelings
                })
                getWeatherDataFromServer()
            }
        } catch (error) {
            console.log(error)
        }
    } else {
        alert('Please enter the zip code !')
    }
}

async function fetchWeatherData(zipCode) {
    const apiURL = `${baseURL + zipCode}&appid=${apiKey}&units=unit`
    try {
        const res = await fetch(apiURL)
        const data = await res.json()
        return data
    } catch (error) {
        throw new Error(error)
    }
}

async function addWeatherDataToServer(payload) {
    try {
        await fetch(`${serverURL}/addWeatherData`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
    } catch (error) {
        throw new Error(error)
    }
}

async function getWeatherDataFromServer() {
    try {
        const res = await fetch(`${serverURL}/getAll`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json()
        date.innerHTML = `Date: ${data.date}`
        temp.innerHTML = `Temperature: ${Math.round(data.temp)} C`
        content.innerHTML = `Feelings: ${data.myFeelings}`
        place.innerHTML = `Place: ${data.place}`
    } catch (error) {
        throw new Error(error)
    }
}