import { useEffect, useState } from "react"
import { getWalkerCities, getWalkers } from "../apiManager.js"
import { CitySelect } from "./CitySelect.jsx"
import { DogSelectModal } from "./DogSelectModal.jsx"

export const WalkerList = () => {
  const [walkers, setWalkers] = useState([])
  const [walkerCities, setWalkerCities] = useState([])
  const [selectedCityId, setSelectedCityId] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    getWalkers().then(setWalkers)
  }, [])

  useEffect(() => {
    getWalkerCities().then(setWalkerCities)
  }, [selectedCityId])

  const handleChange = (e) => {
    setSelectedCityId(e.target.value)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleDogUpdate = () => {}

  return (
    <>
      <CitySelect handleChange={handleChange} />
      {selectedCityId == 0
        ? walkers.map((w, i) => {
            return (
              <div key={i} className="walker">
                {w.name}
                <button className="btn__addDog" onClick={handleOpenModal}>
                  {" "}
                  Add Dog
                </button>
                <DogSelectModal
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  onDogUpdate={handleDogUpdate}
                />
              </div>
            )
          })
        : walkerCities
            .filter((wc) => wc.cityId == parseInt(selectedCityId))
            .map((wc, i) => {
              return (
                <div key={i} className="walker">
                  {wc.walker.name}
                  <button className="btn__addDog" onClick={handleOpenModal}>
                    {" "}
                    Add Dog
                  </button>
                  <DogSelectModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onDogUpdate={handleDogUpdate}
                  />
                </div>
              )
            })}
    </>
  )
}
