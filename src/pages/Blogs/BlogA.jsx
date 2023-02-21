import React from 'react';
import { NavLink } from 'react-router-dom';
import NavIndex from "../../components/NavIndex";

class BlogA extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div className='bg-gradient-to-r from-black-scene to-white'>
                <NavIndex />

                <div className='w-full h-64 relative'>
                    <img src="https://images.pexels.com/photos/8520648/pexels-photo-8520648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=1260&dpr=1" alt="a" className='w-full relative h-64 object-cover object-center pt-2 sm:px-12 px-6' />

                </div>

                <div className='sm:mx-12 mx-6 mt-10 '>
                    <p className='text-center text-2xl'>¿Para que sirve?</p>

                    <div className='mt-6 border-l-2 border-gray-300 px-6 sm:px-16 '>
                        <p className='text-justify  sm:text-left flex items-center '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat accusamus asperiores, perspiciatis expedita ipsum provident consectetur minima, quo reiciendis quia rem perferendis? Id explicabo qui autem minima distinctio ab, repellat eius laborum totam quaerat amet, hic officiis consequuntur odio dolores quae nemo molestiae deleniti illo non sed velit unde. Expedita quas magni dolorum, aliquam minus consequatur obcaecati mollitia quibusdam consectetur.</p>
                    </div>

                    <p className='text-center text-2xl'>¿Como crear una?</p>

                    <div className='mt-6 border-l-2 border-gray-300 px-6 sm:px-16 '>
                        <p className='text-justify  sm:text-left flex items-center '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam fuga molestiae nihil exercitationem, omnis nulla animi tenetur eius id dicta ratione est ducimus, obcaecati unde aliquid quod aliquam, magni odio eveniet quasi nam minima possimus repellendus sed? Temporibus recusandae ullam maxime quidem suscipit aut accusantium voluptatem, minima asperiores. Quam vel, nesciunt odit alias nemo consequatur deserunt beatae atque dolor! Error sunt quos pariatur tempore, laudantium vitae, esse ut id, at dolorum quidem! Voluptatibus eum, praesentium dolorum quo nobis vitae quam sint aut numquam assumenda ipsa quia delectus. Beatae, facilis. Autem, illo sapiente voluptate velit quas magni perspiciatis ut tempore blanditiis.</p>
                    </div>

                    <p className='text-center text-2xl'>¿Como mantener la organizacion?</p>

                    <div className='mt-6 border-l-2 border-gray-300 px-6 sm:px-16 '>
                        <p className='text-justify  sm:text-left flex items-center '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat accusamus asperiores, perspiciatis expedita ipsum provident consectetur minima, quo reiciendis quia rem perferendis? Id explicabo qui autem minima distinctio ab, repellat eius laborum totam quaerat amet, hic officiis consequuntur odio dolores quae nemo molestiae deleniti illo non sed velit unde. Expedita quas magni dolorum, aliquam minus consequatur obcaecati mollitia quibusdam consectetur.</p>
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
export default BlogA;