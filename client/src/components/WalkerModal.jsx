import React, { useEffect, useState } from "react"
import "../styles/DogSelectModal.css"
import { getCities, getWalker } from "../apiManager.js"

export const WalkerModal = ({ walkerId, isOpen, onClose, onUpdate }) => {
  const [walker, setWalker] = useState({ name: "", cities: [] })
  const [cities, setCities] = useState([])
  const [visible, setVisible] = useState(isOpen)

  useEffect(() => {
    setVisible(isOpen)
  }, [isOpen])

  useEffect(() => {
    if (walkerId) {
      getWalker(walkerId).then(setWalker)
    }
  }, [walkerId])

  useEffect(() => {
    getCities().then(setCities)
  }, [])

  const handleClose = () => {
    setVisible(false)
    setWalker({ name: "", cities: [] })
    onClose()
  }

  return (
    <div className={`modal-overlay ${visible ? "visible" : ""}`}>
      {visible && walker && (
        <div className="modal-content">
          <div className="modal-header">
            <h2>Edit walker</h2>
          </div>
          <div className="modal-body">
            <form onSubmit={onUpdate}>
              <div className="form-group">
                <label htmlFor="walkerName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="walkerName"
                  value={walker.name}
                  onChange={(e) =>
                    setWalker({ ...walker, name: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Select Cities:</label>
                {cities.map((city, i) => (
                  <div key={i} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`city-${city.id}`}
                      checked={walker.cities?.some((c) => c.cityId === city.id)}
                      onChange={(e) => handleCityChange(e, city.id)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`city-${city.id}`}
                    >
                      {city.name}
                    </label>
                  </div>
                ))}
              </div>

              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <button onClick={handleClose} className="btn btn-primary">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
