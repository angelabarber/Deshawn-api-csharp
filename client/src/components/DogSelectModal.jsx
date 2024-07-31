import React, { useState } from "react"

export const DogSelectModal = ({ isOpen, onClose, children }) => {
  const [visible, setVisible] = useState(isOpen)

  const handleToggle = () => {
    setVisible(!visible)
  }

  const handleClose = () => {
    setVisible(false)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleToggle}>
      {visible && (
        <div className="modal-content">
          <div className="modal-header">
            <h2>Assign Dog</h2>
            <button onClick={handleClose}>Close</button>
          </div>
          {children}
        </div>
      )}
    </div>
  )
}
