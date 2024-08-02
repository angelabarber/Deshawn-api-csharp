export const getGreeting = async () => {
  const res = await fetch("/api/hello")
  return res.json()
}

export const getDogs = async () => {
  const res = await fetch("/api/dogs")
  return res.json()
}

export const getDog = async (id) => {
  const res = await fetch(`/api/dogs/${id}`)
  return res.json()
}

export const createDog = async (dog) => {
  const res = await fetch(`/api/dogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dog),
  })
  return res.json()
}

export const updateDog = async (id, dog) => {
  const res = await fetch(`/api/dogs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dog),
  })
  return res.json()
}

export const getCities = async () => {
  const res = await fetch(`/api/cities`)
  return res.json()
}

export const CreateCity = async (city) => {
  const res = await fetch(`/api/cities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(city),
  })
}

export const getWalkers = async () => {
  const res = await fetch(`/api/walkers`)
  return res.json()
}
export const getWalkerCities = async () => {
  const res = await fetch(`/api/walkerCities`)
  return res.json()
}

export const getWalkerCitiesByWalker = async (id) => {
  const res = await fetch(`/api/walkerCities/${id}`)
  return res.json()
}
