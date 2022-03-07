import React, { useContext } from 'react'
import BreedContext from '../context/Breeds'
function ImagesView() {
  const breedContext = useContext(BreedContext)
  return (
    <div className="flex flex-wrap">
      {breedContext.images?.map((src) => {
        return <img src={src} />
      })}
    </div>
  )
}

export default ImagesView
