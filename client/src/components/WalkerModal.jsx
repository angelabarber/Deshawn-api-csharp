import React, { useEffect, useState } from "react"
import "../styles/DogSelectModal.css"
import { getWalker, getWalkerCities } from "../apiManager.js"

export const WalkerModal = ({
  walkerId,
  isOpen,
  onClose,
  onUpdate,
  children,
}) => {
  const [walker, setWalker] = useState({})
  const [visible, setVisible] = useState(isOpen)

  useEffect(() => {
    setVisible(isOpen)
  }, [isOpen])

  useEffect(() => {
    getWalker(walkerId).then(setWalker)
  }, [])

  const handleClose = () => {
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
            <h2>Edit walker</h2>
          </div>
          <div className="modal-body">
            {<h4>Walker modal body</h4>}
            <button onClick={handleClose}>Close</button>
          </div>
          {children}
        </div>
      )}
    </div>
  )
}
