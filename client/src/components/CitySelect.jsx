import { useEffect, useState } from "react"
import { getCities } from "../apiManager.js"

export const CitySelect = ({ handleChange }) => {
  const [cities, setCities] = useState([])

  useEffect(() => {
    const getAllCities = async () => {
      const cities = await getCities()
      setCities(cities)
    }

    getAllCities()
  }, [])

  return (
    <>
      <select
        className="cityInput"
        name="cityId"
        onChange={(e) => handleChange(e)}
      >
        <option> Select a City</option>
        {cities.map((c, i) => {
          return (
            <option key={i} value={c.id}>
              {c.name}
            </option>
          )
        })}
      </select>
    </>
  )
}
