import React from 'react'

interface breedContext {
  breeds: string[] | null
  setBreeds: Function | any
  images: string[] | null
  setImages: Function | any
}

const breedsContext: breedContext = {
  breeds: null,
  setBreeds: null,
  images: null,
  setImages: null,
}

export default React.createContext(breedsContext)
