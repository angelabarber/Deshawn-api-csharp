import React, { useEffect, useState } from "react"
import "../styles/DogSelectModal.css"
import {
  getDogs,
  getWalkerCities,
  getWalkerCitiesByWalker,
} from "../apiManager.js"

export const DogSelectModal = ({ walkerId, isOpen, onClose, children }) => {
  const [visible, setVisible] = useState(isOpen)
  const [walkerCities, setWalkerCities] = useState([])
  const [availableDogs, setAvailableDogs] = useState([])
  const [filteredAvailableDogs, setFilteredAvailableDogs] = useState([])

  useEffect(() => {
    setVisible(isOpen)
  }, [isOpen])

  //   useEffect(() => {
  //     getWalkerCitiesByWalker(walkerId).then(setWalkerCities)
  //   }, [walkerId])

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
        if (
          wc.cityId == d.cityId &&
          wc.walkerId != d.walkerId &&
          d.walkerId == null
        ) {
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
                  <button>Assign!</button>
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
