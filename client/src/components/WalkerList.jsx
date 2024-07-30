import { useEffect, useState } from "react"
import { getWalkers } from "../apiManager.js"
import { CitySelect } from "./CitySelect.jsx"

export const WalkerList = () => {
  const [walkers, setWalkers] = useState([])
  const [selectedCityId, setSelectedCityId] = useState(0)

  useEffect(() => {
    getAllWalkers()
  }, [])

  const getAllWalkers = async () => {
    getWalkers().then(setWalkers)
  }

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
        : walkers
            .filter((w) => w.cityId == parseInt(selectedCityId))
            .map((w, i) => {
              return (
                <div key={i} className="walker">
                  {w.name}
                </div>
              )
            })}
    </>
  )
}
