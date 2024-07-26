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
  const res = await (`/api/dogs`,
  {
    method: "POST",
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
