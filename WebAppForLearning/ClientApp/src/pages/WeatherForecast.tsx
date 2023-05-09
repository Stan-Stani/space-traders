import { useEffect, useState } from "react"
import axios from "axios"


const WeatherForecast = () => {
    let [weather, setWeather] = useState({})
    useEffect(() => {
      console.log("use effect")
    axios
      .get(
        "/WeatherForecast"
      )
      .then((response) => {
          console.log(response.data)
          setWeather(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
          <h2>{JSON.stringify(weather)}</h2>
    </>
  )
}

export default WeatherForecast
