import React from 'react'
import Navbar from "../../components/Navbar";
import NavTop from "../../components/NavTop";
import LendingOptions from "../../components/LendingOptions";
import LendingData from "../../components/LendingData";
import LendingsContext, { LendingsProvider } from "../../context/LendingsContext";

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

          <div className='grid grid-cols-template gap-4 h-screen p-2 '>
            <div className='bg-white box-session'>
              <LendingData />
            </div>
            <div className='max-h-97vh'>
              <LendingOptions />
            </div>
          </div>

        </div>
      </LendingsProvider>
    )
  }
}
export default Lendings;