import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BreedContext from './context/Breeds'
import ApiResponse from './models/ApiResponse'
import ImageFilterBar from './components/ImageFilterBar'
import ImagesView from './components/ImagesView'

function App() {
  const [breeds, setBreeds] = useState<string[] | null>(null)
  const [images, setImages] = useState<string[] | null>(null)

  const findBreeds = () => {
    if (!breeds) {
      return axios
        .get('https://dog.ceo/api/breeds/list/all')
        .then((response: ApiResponse) => {
          const { message: breedObject } = response.data
          const breedData = Object.keys(breedObject)
          setBreeds(breedData)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  useEffect(() => {
    findBreeds()
  }, [])

  return (
    <div className="flex flex-col p-20">
      <BreedContext.Provider
        value={{
          setBreeds,
          breeds,
          setImages,
          images,
        }}
      >
        <ImageFilterBar />
        <ImagesView />
      </BreedContext.Provider>
    </div>
  )
}

export default App
