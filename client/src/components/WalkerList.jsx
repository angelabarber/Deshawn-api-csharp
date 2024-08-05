import { useEffect, useState } from "react"
import {
  getDog,
  getWalkerCities,
  getWalkers,
  updateDog,
} from "../apiManager.js"
import { CitySelect } from "./CitySelect.jsx"
import { DogSelectModal } from "./DogSelectModal.jsx"
import { Link, useNavigate } from "react-router-dom"
import { WalkerModal } from "./WalkerModal.jsx"

export const WalkerList = () => {
  const [walkers, setWalkers] = useState([])
  const [walkerCities, setWalkerCities] = useState([])
  const [selectedCityId, setSelectedCityId] = useState(0)
  const [DogModalOpen, setDogModalOpen] = useState(false)
  const [WalkerModalOpen, setWalkerModalOpen] = useState(false)
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

  const handleDogModal = (e) => {
    setWalkerId(e.target.value)
    setDogModalOpen(true)
  }

  const handleWalkerModal = (e) => {
    setWalkerId(e.target.value)
    setWalkerModalOpen(true)
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

  const handleWalkerUpdate = (e) => {
    console.log("handleWalkerUpdate fired...")
    // const id = e.target.value
    // getAssignedDog(id)
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
                <Link onClick={handleWalkerModal}>{w.name}</Link>
                <button
                  value={w.id}
                  className="btn__addDog"
                  onClick={handleDogModal}
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
                  <Link onClick={handleWalkerModal}>{wc.walker.name}</Link>
                  <button
                    value={wc.walker.id}
                    className="btn__addDog"
                    onClick={handleDogModal}
                  >
                    Add Dog
                  </button>
                </div>
              )
            })}
      <DogSelectModal
        walkerId={walkerId}
        isOpen={DogModalOpen}
        onClose={handleCloseModal}
        onUpdate={handleDogUpdate}
      />
      <WalkerModal
        walkerId={walkerId}
        isOpen={handleWalkerModal}
        onClose={handleCloseModal}
        onUpdate={handleWalkerUpdate}
      />
    </>
  )
}
