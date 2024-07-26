import { useState } from "react"

export const DogForm = () => {
  const [dog, updateDog] = useState({
    name: "",
    walkerId: 0,
    cityId: 0,
  })
}
