import React from 'react'

function App() {
  
  return (
    <>
      <main className="relative w-screen h-screen overflow-hidden">

  {/* TOP IMAGE (always visible) */}
  <div className="top absolute inset-0 bg-[url(https://fandomwire.com/wp-content/uploads/2020/07/tony-stark-iron-man-750x400-1.jpg)] bg-cover bg-center z-20" />

  {/* BACKGROUND IMAGE (revealed only via mask) */}
  <div
    className="background absolute  inset-0 bg-[url(https://i.redd.it/fk52qldtbl461.jpg)] bg-cover bg-center z-20"
    onMouseMove={(e) => {
    const x = e.clientX;
    const y = e.clientY;

    e.currentTarget.style.maskImage =
      `radial-gradient(circle 150px at ${x}px ${y}px, white 50%, transparent 100%)`;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.maskImage = "none";
  }}
  />

</main>


    </>
  )
}

export default App
