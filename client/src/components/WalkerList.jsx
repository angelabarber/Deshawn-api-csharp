import { useEffect, useState } from "react"
import { getWalkerCities, getWalkers } from "../apiManager.js"
import { CitySelect } from "./CitySelect.jsx"

export const WalkerList = () => {
  const [walkers, setWalkers] = useState([])
  const [walkerCities, setWalkerCities] = useState([])
  const [selectedCityId, setSelectedCityId] = useState(0)

  useEffect(() => {
    getAllWalkers().then(setWalkers)
  }, [])

  useEffect(() => {
    getWalkerCities().then(setWalkerCities)
  }, [selectedCityId])

  const handleChange = (e) => {
    setSelectedCityId(e.target.value)
  }

  return (
    <>
      <CitySelect handleChange={handleChange} />
      {selectedCityId == 0
        ? walkers.map((w, i) => {
            return (
              <div key={i} className="walker">
                {w.name}
              </div>
            )
          })
        : walkerCities
            .filter((wc) => wc.cityId == parseInt(selectedCityId))
            .map((wc, i) => {
              return (
                <div key={i} className="walker">
                  {wc.walker.name}
                </div>
              )
            })}
    </>
  )
}
