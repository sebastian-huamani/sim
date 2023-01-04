import React from 'react'
import Box from "../components/Box";
import Navbar from "../components/Navbar";
import NavTop from "../components/NavTop";
import Sparkline from "../components/chart/Sparkline";



class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

        <Navbar />
        <NavTop />
        <div className='p-2 h-full md:pl-20 pl-0'>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-black-scene '>
          <Sparkline />
          <Sparkline />
            <Sparkline />
            <Sparkline />
          </div>

          <div className="module">
            <Box className="col-span-2 "
              text="lorem lorem loremloremlorem loremlorem vlorem lorem lorem loremloremlorem loremlorem vlorem lorem lorem loremloremlorem loremlorem vlorem lorem lorem loremloremlorem loremlorem vlorem lorem lorem loremloremlorem loremlorem vlorem lorem lorem loremloremlorem loremlorem vlorem lorem lorem loremloremlorem loremlorem vlorem lorem lorem loremloremlorem loremlorem vlorem lorem lorem loremloremlorem loremlorem vlorem lorem lorem loremloremlorem loremlorem vlorem lorem lorem loremloremlorem loremlorem vlorem lorem lemloremloremlorem  "
            />
            <Box />
          </div>

          <div className="module">
            <Box />
            <Box className="col-span-2" />
          </div>

          <div className="module">
            <Box className="col-span-2 "> 
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quasi illum quos quae obcaecati dolor, aliquid provident beatae doloremque consequuntur animi. Nulla, numquam minima explicabo cupiditate earum voluptas ipsa ab?Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quasi illum quos quae obcaecati dolor, aliquid provident beatae doloremque consequuntur animi. Nulla, numquam minima explicabo cupiditate earum voluptas ipsa ab?Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quasi illum quos quae obcaecati dolor, aliquid provident beatae doloremque consequuntur animi. Nulla, numquam minima explicabo cupiditate earum voluptas ipsa ab?Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quasi illum quos quae obcaecati dolor, aliquid provident beatae doloremque consequuntur animi. Nulla, numquam minima explicabo cupiditate earum voluptas ipsa ab?Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quasi illum quos quae obcaecati dolor, aliquid provident beatae doloremque consequuntur animi. Nulla, numquam minima explicabo cupiditate earum voluptas ipsa ab?
            </Box>
            
            <Box />
          </div>

        </div>
      </div>


    );
  }
}
export default Home;