import React from 'react'
import Navbar from "../components/Navbar";
import NavTop from "../components/NavTop";

function Plantillas() {
  return (
    <div className='md:pl-20 pl-0 '>
      <Navbar />
      <NavTop />
      
      <div className='grid grid-cols-template gap-4 h-screen p-2 '>
        <div className='bg-white   box-session'>
          Plantillas

        </div>
        <div className=''>
          Plantillas
        </div>
      </div>

    </div>
  )
}

export default Plantillas