import React from 'react';
import { NavLink } from 'react-router-dom';
import NavIndex from "../components/NavIndex";

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
              <p>
               Lorem  ipsum dolor sit amet consectetur adipisicing elit. Saepe modi maiores aut molestiae dolore ullam? 
               <p className='w-full text-end mt-6'><NavLink to="/Blog/BlogA">Leer</NavLink></p>
              </p>
            </div>

            <div className=' bg-gray-800 h-48 mt-4 md:mt-0'>
            </div>
          </div>

          <div className='mt-6 sm:block  md:grid grid-cols-2 gap-32 justify-between border-x-2 border-gray-300 px-6 sm:px-16 '>

            <div className='text-justify  sm:text-left flex items-center '>
              <p>
               Lorem  ipsum dolor sit amet consectetur adipisicing elit. Saepe modi maiores aut molestiae dolore ullam? 
               <p className='w-full text-end mt-6'><NavLink to="/Blog/a">Leer</NavLink></p>
              </p>
            </div>

            <div className=' bg-gray-800 h-48 mt-4 md:mt-0'>
            </div>
          </div>

          <div className='mt-6 sm:block  md:grid grid-cols-2 gap-32 justify-between border-x-2 border-gray-300 px-6 sm:px-16 '>

            <div className='text-justify  sm:text-left flex items-center '>
              <p>
               Lorem  ipsum dolor sit amet consectetur adipisicing elit. Saepe modi maiores aut molestiae dolore ullam? 
               <p className='w-full text-end mt-6'><NavLink to="/Blog/a">Leer</NavLink></p>
              </p>
            </div>

            <div className=' bg-gray-800 h-48 mt-4 md:mt-0'>
            </div>
          </div>

          <div className='mt-6 sm:block  md:grid grid-cols-2 gap-32 justify-between border-x-2 border-gray-300 px-6 sm:px-16 '>

            <div className='text-justify  sm:text-left flex items-center '>
              <p>
               Lorem  ipsum dolor sit amet consectetur adipisicing elit. Saepe modi maiores aut molestiae dolore ullam? 
               <p className='w-full text-end mt-6'><NavLink to="/Blog/a">Leer</NavLink></p>
              </p>
            </div>

            <div className=' bg-gray-800 h-48 mt-4 md:mt-0'>
            </div>
          </div>
        </div>

        <footer className='mt-10 bg-black text-wheat h-18 p-3 w-full '>
          <div className=' sm:w-3/5 md:w-4/5 h-full mx-auto grid grid-cols-5 justify-around items-center text-center'>
            <NavLink to="/Home" className="hover:">Home</NavLink>
            <NavLink to="/Blog">Blog</NavLink>
            <NavLink to="/Login">Login</NavLink>
            <NavLink to="/Register">Register</NavLink>
            <NavLink to="/Contact">Contacto</NavLink>
          </div>
        </footer>

      </div>

    );
  }
}
export default Blog;