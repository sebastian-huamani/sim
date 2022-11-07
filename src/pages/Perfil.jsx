import React from 'react';
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import NavTop from "../components/NavTop";

function Perfil() {

  const param = useParams();


  return (
    <div className='md:pl-20 pl-0'>
      <Navbar/>  
      <NavTop/>
      <p> Perfil  </p>
    </div>

  )
}

export default Perfil