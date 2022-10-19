import React, { Suspense } from 'react';
import Cards  from "../components/Cards";
import Items  from "../components/Items";

function Tarjetas() {

  const lorem = ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus provident mollitia veniam, nihil ab ipsum repudiandae, necessitatibus quae praesentium cum eius, corrupti ullam modi eum quis. Ullam culpa repellendus qui laudantium sequi id? Quia esse corrupti animi iste asperiores, vel fuga nihil quidem cumque magnam labore, aperiam officiis tenetur maiores quod vipsum repudiandae, necessitatibus quae praesentium cum eius, corrupti ullam modi eum quis. Ullam culpa repellendus qui laudantium sequi id? Quia esse corrupti animi iste asperiores, vel fi eum quis. Ullam culpa repellendus qui laudantium sequi id? Quia esse corrupti animi iste asperiores, vel fuga nihil quidem cumque magnam labore, aperiam officiis tenetur maiores quod vipsum repudiandae, necessitatibus quae praesentium cum eius, corrupti ullam modi eum quis. Ullam culpa repellendus qui laudantium sequi id? Quia esse corrupti animi iste asperiores, vel fi eum quis. Ullam culpa repellendus qui laudantium sequi id? Quia esse corrupti animi iste asperiores, vel fuga nihil quidem cumque magnam labore, aperiam officiis tenetur maiores quod vipsum repudiandae, necessitatibus quae praesentium cum eius, corrupti ullam modi eum quis. Ullam culpa repellendus qui laudantium sequi id? Quia esse corrupti animi iste asperiores, vel fuga nihil quidem cumque magnam labore, aperiam officiis tenetur maiores quod voluptate vero? Placeat autem, blanditiis earum molestias maiores iure eius conseq';


  return (

    <div className='sm:grid-modules-card text-justify h-screen ' >
      <div className=' max-h-97vh'>
        <Cards />
      </div>

      <div className='grid grid-rows-60-40 gap-4 text-ellipsis overflow-hidden max-h-97vh'>

        <div className='grid grid-cols-2 content-between  max-h-max gap-4 text-ellipsis overflow-hidden'>
          <div> 
            {lorem}
          </div>

          <div className='bg-black'>
            {lorem}
          </div>
        </div>

        <div className='bg-black'>
          {lorem}
        </div>

      </div>

      <div className=' max-h-97vh'>
        <Items />
      </div>

    </div>

  )
}

export default Tarjetas;