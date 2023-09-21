////////////////////////
// GLOBAL VARIABLES
const mainBody = document.querySelector('#tester')
const button = document.querySelector('#button')
const input = document.querySelector('#inputBar')

// BODY ELEMENTS
// main section
const cityHeader = document.querySelector('#city-name')
const condPic = document.querySelector('#condition-pic')
const currentTemp = document.querySelector('#current-temp')
const nowCond = document.querySelector('#condition')

// more information section
const todayDate = document.querySelector('#todayDate')
const highLow = document.querySelector('#high-low')
const precip = document.querySelector('#precip')
const feelsLike = document.querySelector('#feels-like')
const sunriseSet = document.querySelector('#sunrise-set')

// future forecast
const dayTwoPic = document.querySelector('#day-two-pic')
const twoInfoBox = document.querySelector('#two-info')
const dayThreePic = document.querySelector('#day-three-pic')
const threeInfoBox = document.querySelector('#three-info')
const moonPhase = document.querySelector('.moon-phase')
const moonRise = document.querySelector('.moon-rise')


////////////////////////
// FUNCTION AND CLICK
button.addEventListener('click', async () => {
    let response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=d6c4ab1f9f3c48df8c0151226232009&q=${input.value}&days=3&aqi=no&alerts=no`)
    mainBody.style.visibility = 'visible'

    // city and state response
    let city = response.data.location.name
    let state = response.data.location.region
    cityHeader.innerText = `${city}, ${state}`

    // DAY ONE
    let dayOne = response.data.forecast.forecastday[0]

    // image and weather info
    condPic.src = dayOne.day.condition.icon
    let tempF = response.data.current.temp_f
    let tempC = response.data.current.temp_c
    currentTemp.innerText = `${tempF}\u00B0 F / ${tempC}\u00B0 C`
    nowCond.innerText = dayOne.day.condition.text

    // more info area
    todayDate.innerText = dayOne.date

    highLow.innerText = `${dayOne.day.maxtemp_f}\u00B0 F / ${dayOne.day.mintemp_f}\u00B0 F \n ${dayOne.day.maxtemp_c}\u00B0 C / ${dayOne.day.mintemp_c}\u00B0 C`
    
    precip.innerText = `${dayOne.day.daily_chance_of_rain}%`

    feelsLike.innerText = `${response.data.current.feelslike_f}\u00B0 F / ${response.data.current.feelslike_f}\u00B0 C`
    
    sunriseSet.innerText = `${dayOne.astro.sunrise} / ${dayOne.astro.sunset}`

    // DAY TWO
    let dayTwo = response.data.forecast.forecastday[1].day

    //image and forcast
    dayTwoPic.src = dayTwo.condition.icon
    twoInfoBox.innerText = `${dayTwo.maxtemp_f}\u00B0 F / ${dayTwo.mintemp_f}\u00B0 F \n ${dayTwo.maxtemp_c}\u00B0 C / ${dayTwo.mintemp_c}\u00B0 C`

    // DAY THREE
    let dayThree = response.data.forecast.forecastday[2].day

    // image and forcast
    dayThreePic.src = dayThree.condition.icon
    threeInfoBox.innerText = `${dayThree.maxtemp_f}\u00B0 F / ${dayThree.mintemp_f}\u00B0 F \n ${dayThree.maxtemp_c}\u00B0 C / ${dayThree.mintemp_c}\u00B0 C`

    // MOON INFO
    moonPhase.innerText = dayOne.astro.moon_phase
    moonRise.innerText = `${dayOne.astro.moonrise} / ${dayOne.astro.moonset}`
})



//http://api.weatherapi.com/v1/forecast.json?key=d6c4ab1f9f3c48df8c0151226232009&q=30097&days=3&aqi=no&alerts=no