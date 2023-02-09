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
    const lorem = ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus provident mollitia veniam, nihil ab ipsum repudiandae, necessitatibus quae praesentium cum eius, corrupti ullam modi eum quis. Ullam culpa repellendus qui laudantium sequi id? Quia esse corrupti animi iste asperiores, vel fuga nihil quidem cumque magnam labore, aperiam officiis tenetur maiores quod vipsum repudiandae, necessitatibus quae praesentium cum eius, corrupti ullam modi eum quis. Ullam culpa repellendus qui laudantium sequi id? Quia esse corrupti animi iste asperiores, vel fi eum quis. Ullam culpa repellendus qui laudantium sequi id? Quia esse corrupti animi iste asperiores, vel fuga nihil quidem cumque magnam labore, aperiam officiis tenetur maiores quod vipsum repudiandae, necessitatibus quae praesentium cum eius, corrupti ullam modi eum quis. Ullam culpa repellendus qui laudantium sequi id? Quia esse corrupti animi iste asperiores, vel fi eum quis. Ullam culpa repellendus qui laudantium sequi id? Quia esse corrupti animi iste asperiores, vel fuga nihil quidem cumque magnam labore, aperiam officiis tenetur maiores quod vipsum repudiandae, necessitatibus quae praesentium cum eius, corrupti ullam modi eum quis. Ullam culpa repellendus qui laudantium sequi id? Quia esse corrupti animi iste asperiores, vel fuga nihil quidem cumque magnam labore, aperiam officiis tenetur maiores quod voluptate vero? Placeat autem, blanditiis earum molestias maiores iure eius conseq';


    return (
      <CardProvider>

        <div className='md:pl-20 pl-0'>
          <Navbar />
          <NavTop />
          <div className='sm:grid-modules-card text-justify h-screen p-2'>
            <div className='max-h-97vh'>
              <Cards />
            </div>
            <div className='grid grid-rows-60-40 gap-4 text-ellipsis overflow-hidden max-h-97vh'>
              <div className='grid grid-cols-2/3 content-between gap-4 text-ellipsis overflow-hidden'>
                
                <div className='box-session h-full'>
                  <div className='w-full bg-gray-400 text-center text-sm '>
                    Informacion de Tarjeta
                  </div>
                  <div>
                    <CardData />
                  </div>
                </div>

                <div className='box-session h-full'>
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
            <div className='max-h-97vh'>
              <Items />
            </div>
          </div>
        </div>

      </CardProvider>
    )
  }
}
export default Tarjetas;