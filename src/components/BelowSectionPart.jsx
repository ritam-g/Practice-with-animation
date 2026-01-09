import React from 'react'
import Image from '../Context/Image'
import Imges from './Imges'

function BelowSectionPart() {
  return (
    <div className='
    flex  flex-col  lg: flex-row flex-wrap shrink-0
    w-full h-[100vh] lg:h-full w-[100vh]
    lg:items-center justify-around
    rounded-2xl
    gap-2
    '
    >
    <Imges/>
    </div>
  )
}

export default BelowSectionPart
