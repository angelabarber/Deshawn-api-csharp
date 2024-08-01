import React, { useEffect, useState } from "react"
import "../styles/DogSelectModal.css"
import { getDogs, getWalkerCities } from "../apiManager.js"

export const DogSelectModal = ({
  walkerId,
  isOpen,
  onClose,
  onDogUpdate,
  children,
}) => {
  const [visible, setVisible] = useState(isOpen)
  const [walkerCities, setWalkerCities] = useState([])
  const [availableDogs, setAvailableDogs] = useState([])
  const [filteredAvailableDogs, setFilteredAvailableDogs] = useState([])

  useEffect(() => {
    setVisible(isOpen)
  }, [isOpen])

  useEffect(() => {
    getDogs().then(setAvailableDogs)
  }, [walkerId])

  useEffect(() => {
    getWalkerCities().then(setWalkerCities)
  }, [walkerId])

  useEffect(() => {
    const filteredWalkerCities = walkerCities.filter(
      (wc) => wc.walkerId == parseInt(walkerId)
    )
    const filteredDogs = availableDogs.filter((d) => {
      for (const wc of filteredWalkerCities) {
        if (wc.cityId == d.cityId && wc.walkerId != d.walkerId) {
          return d
        }
      }
    })
    setFilteredAvailableDogs(filteredDogs)
  }, [walkerId])

  const handleClose = () => {
    setFilteredAvailableDogs([])
    setAvailableDogs([])
    setWalkerCities([])
    setVisible(false)
    onClose()
  }

  return (
    <div
      className={`modal-overlay ${visible ? "visible" : ""}`}
      onClick={handleClose}
    >
      {visible && (
        <div className="modal-content">
          <div className="modal-header">
            <h2>Assign dog</h2>
            {filteredAvailableDogs.length > 0 ? (
              filteredAvailableDogs.map((d, i) => (
                <div key={i}>
                  <h3>{d.name}</h3>
                  <button value={d.id} onClick={onDogUpdate}>
                    Assign!
                  </button>
                </div>
              ))
            ) : (
              <h4>There are no dogs available in your areas currently.</h4>
            )}
            <button onClick={handleClose}>Close</button>
          </div>
          {children}
        </div>
      )}
    </div>
  )
}
