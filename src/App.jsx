import React from 'react'
import NavBar from './components/NavBar'
import Section from './components/Section'
import BelowSectionPart from './components/BelowSectionPart'

function App() {
  return (
    <div className='app overflow-y-scroll overflow-x-hidden p-2 flex flex-col gap-2'>
      <NavBar/>
      <Section/>
      <BelowSectionPart/>
    </div>
  )
}

export default App
