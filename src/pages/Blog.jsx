import React from 'react';
import { NavLink } from 'react-router-dom';
import NavIndex from "../components/NavIndex";
import Footer from '../components/LandingPage/Footer';

class Blog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div className='bg-gradient-to-r from-black-scene to-white'>
        <NavIndex />

        <div className='h-64 w-full relative'>

          <img src="https://images.pexels.com/photos/7583935/pexels-photo-7583935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=1260&dpr=1" alt="a" className='w-full relative h-full object-cover object-center pt-2 sm:px-12 px-6' />

          <div className='absolute top-0 w-full h-full flex items-center justify-center text-white text-6xl'>
            <div>
              <p>Facil, Practico </p>
              <p>y Organizado</p>
            </div>
          </div>
        </div>


        <div className='sm:mx-12 mx-6 mt-10 '>
          <div className='mt-6 sm:block  md:grid grid-cols-2 gap-32 justify-between border-x-2 border-gray-300 px-6 sm:px-16 '>

            <div className='text-justify  sm:text-left flex items-center '>
              <div>
                <h1 className='font-semibold text-lg'>Plantillas <sup>(proximamente)</sup></h1>
                Como crear una? Para que sirve? Como mantener la organizacion? y mas respuestas sobre las plantillas
                <div className='w-full text-end mt-6'><NavLink  className=' border-b border-gray-600 hover:pb-1 ease-in-out duration-200'>Leer</NavLink></div>
              </div>
            </div>

            <img src="https://i.pinimg.com/564x/9e/6d/88/9e6d88f51393c2bfa67447454fa01641.jpg" alt="" className='w-full object-cover object-center h-48 mt-4 md:mt-0' />
          </div>

          <div className='mt-6 sm:block  md:grid grid-cols-2 gap-32 justify-between border-x-2 border-gray-300 px-6 sm:px-16 '>

            <div className='text-justify  sm:text-left flex items-center '>
              <div>
                <h1 className='font-semibold text-lg'>Transacciones <sup>(proximamente)</sup></h1>
                Lorem  ipsum dolor sit amet consectetur adipisicing elit. Saepe modi maiores aut molestiae dolore ullam?
                <div className='w-full text-end mt-6'><NavLink  className='border-b border-gray-600 hover:pb-1 ease-in-out duration-200'>Leer</NavLink></div>
              </div>
            </div>

            <img src="https://i.pinimg.com/564x/5b/9d/43/5b9d43e07d8714f7c3cb94e907bba5c7.jpg" alt="" className='w-full object-cover object-center h-48 mt-4 md:mt-0' />

          </div>

          <div className='mt-6 sm:block  md:grid grid-cols-2 gap-32 justify-between border-x-2 border-gray-300 px-6 sm:px-16 '>

            <div className='text-justify  sm:text-left flex items-center '>
              <div>
                <h1 className='font-semibold text-lg'>Prestamos <sup>(proximamente)</sup></h1>
                Lorem  ipsum dolor sit amet consectetur adipisicing elit. Saepe modi maiores aut molestiae dolore ullam?
                <div className='w-full text-end mt-6'><NavLink  className='border-b border-gray-600 hover:pb-1 ease-in-out duration-200'>Leer</NavLink></div>
              </div>
            </div>

            <img src="https://images.pexels.com/photos/210990/pexels-photo-210990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=1260&dpr=1" alt="" className='w-full object-cover 
            object-center h-48 mt-4 md:mt-0' />
          </div>

        </div>

        <Footer />

      </div>

    );
  }
}
export default Blog;