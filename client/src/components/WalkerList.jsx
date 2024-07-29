import { useEffect, useState } from "react"
import { getWalkers } from "../apiManager.js"

export const WalkerList = () => {
  const [walkers, setWalkers] = useState([])

  useEffect(() => {
    getAllWalkers()
  }, [])

  const getAllWalkers = async () => {
    getWalkers().then(setWalkers)
  }

  return (
    <>
      {walkers.map((w, i) => {
        return (
          <div key={i} className="walker">
            {w.name}
          </div>
        )
      })}
    </>
  )
}
