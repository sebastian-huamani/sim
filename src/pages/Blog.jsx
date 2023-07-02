import React from 'react';
import { NavLink } from 'react-router-dom';
import NavIndex from "../components/NavIndex";
import NavTop from "../components/NavTop";
import Footer from '../components/LandingPage/Footer';
import Navbar from '../components/Navbar';

class Blog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div className='bg-gradient-to-r from-black-scene to-white'>
        <Navbar />
        <NavTop />

        <div>
          
        </div>

      </div>

    );
  }
}
export default Blog;