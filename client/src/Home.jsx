import { Link } from "react-router-dom"
import { getDogs, getGreeting } from "./apiManager"
import { useEffect, useState } from "react"

export default function Home() {
  const [greeting, setGreeting] = useState({
    message: "Not Connected to the API",
  })

  const [dogs, setDogs] = useState([])

  useEffect(() => {
    getGreeting()
      .then(setGreeting)
      .catch(() => {
        console.log("API not connected")
      })
  }, [])

  useEffect(() => {
    getAllDogs()
  }, [])

  const getAllDogs = async () => {
    setDogs(await getDogs())
  }

  return (
    <section className="home">
      <p>{greeting.message}</p>
      {dogs.map((dog, i) => {
        return (
          <div key={i} className="dog">
            <Link to={`/dogs/${dog.id}`}>{dog.name}</Link>
          </div>
        )
      })}
    </section>
  )
}
