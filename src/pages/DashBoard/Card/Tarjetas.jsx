import React from 'react';
import CardContext, { CardProvider } from "../../../context/CardContext";
import Items from "../../../components/ItemsHistoryCard";
import CardChart from "../../../components/CardChart";
import CardData from "../../../components/CardData";
import ItemData from "../../../components/ItemData";
import NavTop from "../../../components/NavTop";
import Navbar from "../../../components/Navbar";
import Cards from "../../../components/Cards";

if (window.performance.navigation.type == 1) {
  sessionStorage.clear()
}

class Tarjetas extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <CardProvider>

        <div className='md:pl-20 pl-0'>
          <Navbar />
          <NavTop />
          <div className='sm:grid-modules-card text-justify h-screen p-2'>
            <div className='max-h-97vh'>
              <Cards />
            </div>
            <div className=' mt-14 sm:mt-0 grid grid-rows-60-40 gap-4  '>
              <div className='block sm:grid grid-cols-2/3  gap-4 '>
                
                <div className='box-session mt-5 sm:mt-0  '>
                  <div className='w-full bg-gray-400 text-center text-sm '>
                    Informacion de Tarjeta
                  </div>
                  <div>
                    <CardData />
                  </div>
                </div>

                <div className='box-session h-auto mt-5 sm:mt-0 '>
                  <div className='w-full bg-gray-400 text-center text-sm '>
                    Informacion de Transaccion
                  </div>
                  <div >
                    <ItemData />
                  </div>
                </div>

              </div>
              <div className='box-session'>
                <CardChart />
              </div>
            </div>
            <div className=' mt-14 sm:mt-0  max-h-97vh'>
              <Items />
            </div>
          </div>
        </div>

      </CardProvider>
    )
  }
}
export default Tarjetas;