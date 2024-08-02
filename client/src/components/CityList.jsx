import { useEffect, useState } from "react"
import { getCities } from "../apiManager.js"

export const CityList = () => {
  const [cities, setCities] = useState([])

  useEffect(() => {
    getCities.then(setCities)
  }, [])

  const handleNewCity = () => {}

  return (
    <>
      <input placeholder="City Name" />
      <button onClick={handleNewCity}>Add City</button>
      <section>
        {cities.map((wc, i) => {
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
