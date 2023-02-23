import React from 'react';
import Footer from '../components/LandingPage/Footer';
import NavIndex from "../components/NavIndex";


class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div className='bg-gradient-to-r from-black-scene to-white'>
        <NavIndex />

        <div className='h-64 w-full relative'>

          <img src="https://images.pexels.com/photos/3975590/pexels-photo-3975590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=1260&dpr=1" alt="a" className='w-full relative h-full object-cover object-center pt-2 sm:px-12 px-6' />

          <div className='absolute top-0 w-full h-full flex items-center justify-center text-white text-6xl'>
            <div>
              <p>Facil, Practico </p>
              <p>y Organizado</p>
            </div>
          </div>
        </div>

        <div className='sm:mx-12 mx-6 mt-7 border-l-2 border-gray-300'>
          <p className='text-center text-2xl'>El Problema</p>

          <div className='mt-6 sm:block  md:grid grid-cols-2 gap-32 justify-between px-6 sm:px-16 '>

            <p className='text-justify sm:text-left flex items-center order-2'>Cansado de que no te cuadre las cuentas?, de que al revisar esas transacciones halla algo que no recuerdes? o aun que aun peor que desaparesca el papel deonde anotaste esas cuentas y todo de cero nuevamente.
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, ut.
             </p>

            <img src="https://i.pinimg.com/originals/8b/38/1e/8b381ed9c51d957f8bfeb898497a45aa.gif" alt="" className='order-1 h-64 mt-4 md:mt-0'/>
          </div>
        </div>

        <div className='sm:mx-12 mx-6 mt-10 '>
          <p className='text-center text-2xl'>¿Que Podras Hacer?</p>

          <div className='mt-6 sm:block  md:grid grid-cols-2 gap-32 justify-between border-r-2 border-gray-300 px-6 sm:px-16 '>

            <p className='text-justify  sm:text-left flex items-center '>Podras crear plantillas personalizadas para separar y organizar cualquier transaccion.</p>

            <img src="https://images.pexels.com/photos/6441572/pexels-photo-6441572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='h-48 mt-4 md:mt-0 w-full object-cover object-top' />
          </div>

          <div className='mt-6 sm:block  md:grid grid-cols-2 gap-32 justify-between border-r-2 border-gray-300 px-6 sm:px-16 '>

            <p className='text-justify  sm:text-left flex items-center '>Tendras informacion interactiva gracias a los graficos y reportes que podras generar.</p>

            <img src="https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='h-48 mt-4 md:mt-0 w-full object-cover object-top' />

          </div>

          <div className='mt-6 sm:block  md:grid grid-cols-2 gap-32 justify-between border-r-2 border-gray-300 px-6 sm:px-16 '>

            <p className='text-justify  sm:text-left flex items-center '>Lograras facilmente darle seguimiento a tus ingresos y egresos todo el tiempo.</p>

            <img src='https://images.pexels.com/photos/6079199/pexels-photo-6079199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='' className=' object-cover w-full bg-gray-800 h-48 mt-4 md:mt-0'>
            </img>
          </div>

        </div>

        <Footer />

      </div>

    );
  }
}
export default HomePage;