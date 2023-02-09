import React from 'react'
import LendingsContext, { LendingsProvider } from "../../context/LendingsContext";
import LendingOptions from "../../components/LendingOptions";
import LendingData from "../../components/LendingData";
import Navbar from "../../components/Navbar";
import NavTop from "../../components/NavTop";

class Lendings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LendingsProvider >
        <div className='md:pl-20 pl-0 '>
          <Navbar />
          <NavTop />

          <div className='sm:mt-0 mt-2 sm:grid block grid-cols-template gap-4 h-screen p-2 '>
            <div className='bg-white box-session'>
              <LendingData />
            </div>
            <div className='max-h-97vh sm:mt-0 mt-4'>
              <LendingOptions />
            </div>
          </div>

        </div>
      </LendingsProvider>
    )
  }
}
export default Lendings;