import React, { useContext } from 'react'
import { contextData } from '../Context/Image'

function Imges() {
    const image=useContext(contextData)
    
    
  return (
    <>
    {
        image.map((e,key)=>{
            return <div key={key}
             className='
    image 
    h-[50vh] w-full  rounded-2xl lg:w-[60vh] h-[60vh]   md:w-[50vh] 
    bg-cover
    bg-center
    bg-no-repeat
    flex-wrap
    shrink-0

    '
    style={{
        backgroundImage:`url(${e})`
    }}
    >
      
    </div>
        })
    }
    </>
  )
}

export default Imges
