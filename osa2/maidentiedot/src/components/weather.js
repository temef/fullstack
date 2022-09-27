import axios from 'axios'
import {useEffect, useState} from 'react'

const Weather = ({name, ...props}) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState('')

     console.log(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${api_key}&units=metric`)

    useEffect(() => {
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${api_key}&units=metric`) 
            .then(response => {
                setWeather(response.data)
            })
    }, [name, api_key])

    console.log(props)
     //console.log(weather.weather.icon)
    if(!weather) return null
    console.log(weather.weather[0])
    return(
        <div>
        <h2>Weather in {weather.name}</h2>
        <p>Temperature {weather.main.temp} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='error'/>
        <p>Wind {weather.wind.speed} m/s</p>
        </div>
        
    )
}

export default Weather