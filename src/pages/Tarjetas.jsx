import React, { Suspense } from 'react';
import Loading from "../components/Loading";
import Cards from "../components/Cards";
import Items from "../components/ItemsHistoryCard";
import Navbar from "../components/Navbar";
import NavTop from "../components/NavTop";
import CardData from "../components/CardData";
import ItemData from "../components/ItemData";
import CardContext, { CardProvider } from "../context/CardContext";

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
              <div className='grid grid-cols-2/3 content-between  max-h-max gap-4 text-ellipsis overflow-hidden'>
                <div className='box-session h-screen'>
                  <CardData />
                </div>
                <div className='box-session h-screen'>
                  <ItemData />
                </div>
              </div>
              <div className='box-session'>
                {lorem}
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