import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDog } from "../apiManager.js"

export const DogDetails = () => {
  const [dog, setDog] = useState({})
  const { dogId } = useParams()

  useEffect(() => {
    getDogById()
  }, [])

  const getDogById = async () => {
    setDog(await getDog(dogId))
  }

  return (
    <>
      <section className="dog--details">
        <h2 className="dog--name">{dog.name}</h2>
        <div className="dog--city">City: {dog.city?.name}</div>
        <div className="dog--walker">Walker:{dog.walker?.name}</div>
      </section>
    </>
  )
}
