import { useEffect, useState } from "react"
import {
  getDog,
  getWalkerCities,
  getWalkers,
  updateDog,
} from "../apiManager.js"
import { CitySelect } from "./CitySelect.jsx"
import { DogSelectModal } from "./DogSelectModal.jsx"
import { useNavigate } from "react-router-dom"

export const WalkerList = () => {
  const [walkers, setWalkers] = useState([])
  const [walkerCities, setWalkerCities] = useState([])
  const [selectedCityId, setSelectedCityId] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [walkerId, setWalkerId] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    getWalkers().then(setWalkers)
  }, [])

  useEffect(() => {
    getWalkerCities().then(setWalkerCities)
  }, [selectedCityId])

  const handleChange = (e) => {
    setSelectedCityId(e.target.value)
  }

  const handleOpenModal = (e) => {
    setWalkerId(e.target.value)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setWalkerId(0)
    setIsModalOpen(false)
  }

  const handleDogUpdate = (e) => {
    console.log("handleDogUpdate fired...")
    const id = e.target.value
    getAssignedDog(id)
  }

  const getAssignedDog = (id) => {
    getDog(id).then((dog) => {
      dog.walkerId = walkerId
      updateDog(id, dog).then(() => {
        navigate(`/dogs/${id}`)
      })
    })
  }

  return (
    <>
      <CitySelect handleChange={handleChange} />
      {selectedCityId == 0
        ? walkers.map((w, i) => {
            return (
              <div key={i} className="walker">
                {w.name}
                <button
                  value={w.id}
                  className="btn__addDog"
                  onClick={handleOpenModal}
                >
                  Add Dog
                </button>
              </div>
            )
          })
        : walkerCities
            .filter((wc) => wc.cityId == parseInt(selectedCityId))
            .map((wc, i) => {
              return (
                <div key={i} className="walker">
                  {wc.walker.name}
                  <button
                    value={wc.walker.id}
                    className="btn__addDog"
                    onClick={handleOpenModal}
                  >
                    Add Dog
                  </button>
                </div>
              )
            })}
      <DogSelectModal
        walkerId={walkerId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDogUpdate={handleDogUpdate}
      />
    </>
  )
}
