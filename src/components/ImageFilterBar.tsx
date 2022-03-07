import React, { useContext, useState } from 'react'
import axios from 'axios'
import BreedContext from '../context/Breeds'

function ImageFilterBar() {
  const [breed, setBreed] = useState<string>('')
  const [subBreed, setSubBreed] = useState<string>('')
  const [limit, setLimit] = useState<number>(1)
  const [error, setError] = useState<boolean>(false)
  const [subBreeds, setSubBreeds] = useState<string[]>([])

  const numberOfImages = (min: number = 1, max: number = 10) => {
    let options = []
    for (let i = min; i < max; i++) {
      options.push(<option value={i}> {i} </option>)
    }
    return options
  }

  const handleError = (err: Error) => {
    setError(true)
    alert(err.message)
  }

  const breedContext = useContext(BreedContext)

  const onSubmit = (event: any) => {
    event.preventDefault()
    setError(false)
    if (!breed) {
      setError(true)
    } else {
      axios
        .get(
          `https://dog.ceo/api/breed/${breed}${subBreed}/images/random/${limit}`,
        )
        .then((response) => {
          const { message } = response.data
          breedContext.setImages(message)
        })
        .catch(handleError)
    }
  }

  const changeBreeds = (event: any) => {
    const name = event.target.value
    setBreed(name)
    setSubBreed('')
    axios.get(`https://dog.ceo/api/breed/${name}/list`).then((response) => {
      const { message } = response.data
      setSubBreeds(message)
    })
  }

  return (
    <form className="flex" onSubmit={onSubmit}>
      <select
        name="breed"
        className={error ? 'error' : ''}
        onChange={changeBreeds}
        required
      >
        <option value={undefined}>Any</option>
        {breedContext.breeds?.map((breed: string) => {
          return <option value={breed}>{breed}</option>
        })}
      </select>

      {subBreeds.length ? (
        <select
          onChange={(event: any) => setSubBreed(`/${event.target.value}`)}
          required
        >
          {subBreeds?.map((subBreed: string) => {
            return <option value={subBreed}>{subBreed}</option>
          })}
        </select>
      ) : (
        <></>
      )}
      <select onChange={(event: any) => setLimit(event?.target.value)} required>
        {numberOfImages()}
      </select>
      <button> View Images </button>
    </form>
  )
}

export default ImageFilterBar
