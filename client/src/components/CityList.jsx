import { useEffect, useState } from "react"
import { CreateCity, getCities } from "../apiManager.js"

export const CityList = () => {
  const [cities, setCities] = useState([])
  const [city, setCity] = useState({})

  useEffect(() => {
    getCities().then(setCities)
  }, [])

  const handleNewCity = () => {
    CreateCity(city).then(() => {
      getCities().then(setCities)
      setCity({})
    })
  }

  return (
    <>
      <input
        onChange={(e) => setCity({ name: e.target.value })}
        placeholder="City Name"
      />
      <button onClick={handleNewCity}>Add City</button>
      <section>
        {cities.map((c, i) => {
          return (
            <div key={i} className="city">
              {c.name}
            </div>
          )
        })}
      </section>
    </>
  )
}
