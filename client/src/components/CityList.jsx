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
      <form onSubmit={handleNewCity}>
        <input
          onChange={(e) => setCity({ name: e.target.value })}
          placeholder="City Name"
        />
        <button type="submit">Add City</button>
      </form>
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
