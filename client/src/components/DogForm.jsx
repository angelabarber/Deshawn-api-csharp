import { useState } from "react"
import { CitySelect } from "./CitySelect.jsx"
import { useNavigate } from "react-router-dom"
import { createDog } from "../apiManager.js"

export const DogForm = () => {
  const [dog, updateDog] = useState({
    name: "",
    walkerId: 0,
    cityId: 0,
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const name = e.target.name
    const val = e.target.value
    updateDog({
      ...dog,
      [name]: name == "name" ? val : parseInt(val),
    })

    //another way to do handle change:
    //   const copy = { ...dog }
    //   copy.name = e.target.value
    //   updateDog(copy)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createDog(dog)
    navigate("/")
  }

  return (
    <form onSubmit={handleSubmit} className=" dogForm">
      <h2 className="dogForm--title"> New Dog</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            required
            autoFocus
            id="name"
            type="text"
            className="form-control"
            placeholder="Dog's Name"
            value={dog.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="cityId">City</label>
          <CitySelect required handleChange={handleChange} />
        </div>
      </fieldset>
      <button type="submit" className="btn btn-primary">
        Submit Dog
      </button>
    </form>
  )
}
