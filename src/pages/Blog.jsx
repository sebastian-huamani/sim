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
               Lorem  ipsum dolor sit amet consectetur adipisicing elit. Saepe modi maiores aut molestiae dolore ullam? 
               <div className='w-full text-end mt-6'><NavLink to="/Blog/BlogA">Leer</NavLink></div>
              </div>
            </div>

            <div className=' bg-gray-800 h-48 mt-4 md:mt-0'>
            </div>
          </div>

          <div className='mt-6 sm:block  md:grid grid-cols-2 gap-32 justify-between border-x-2 border-gray-300 px-6 sm:px-16 '>

            <div className='text-justify  sm:text-left flex items-center '>
              <div>
               Lorem  ipsum dolor sit amet consectetur adipisicing elit. Saepe modi maiores aut molestiae dolore ullam? 
               <div className='w-full text-end mt-6'><NavLink to="/Blog/BlogA">Leer</NavLink></div>
              </div>
            </div>

            <div className=' bg-gray-800 h-48 mt-4 md:mt-0'>
            </div>
          </div>

          <div className='mt-6 sm:block  md:grid grid-cols-2 gap-32 justify-between border-x-2 border-gray-300 px-6 sm:px-16 '>

            <div className='text-justify  sm:text-left flex items-center '>
              <div>
               Lorem  ipsum dolor sit amet consectetur adipisicing elit. Saepe modi maiores aut molestiae dolore ullam? 
               <div className='w-full text-end mt-6'><NavLink to="/Blog/BlogA">Leer</NavLink></div>
              </div>
            </div>

            <div className=' bg-gray-800 h-48 mt-4 md:mt-0'>
            </div>
          </div>

          <div className='mt-6 sm:block  md:grid grid-cols-2 gap-32 justify-between border-x-2 border-gray-300 px-6 sm:px-16 '>

            <div className='text-justify  sm:text-left flex items-center '>
              <div>
               Lorem  ipsum dolor sit amet consectetur adipisicing elit. Saepe modi maiores aut molestiae dolore ullam? 
               <div className='w-full text-end mt-6'><NavLink to="/Blog/BlogA">Leer</NavLink></div>
              </div>
            </div>

            <div className=' bg-gray-800 h-48 mt-4 md:mt-0'>
            </div>
          </div>
        </div>

       <Footer />

      </div>

    );
  }
}
export default Blog;