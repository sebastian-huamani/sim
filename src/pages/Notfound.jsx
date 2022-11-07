import React from 'react';
// import './css/NotFound.css';
import { FiChevronRight } from "react-icons/fi";


class Notfound extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        const idCard= e.target.getAttribute("id");
        console.log(idCard);
        console.log(e.target);
    }

    render() {
        return (
            // <div >
            //     <button class="cybr-btn">
            //         Glitch<span aria-hidden>_</span>
            //         <span aria-hidden className="cybr-btn__glitch">Glitch_</span>
            //         <span aria-hidden className="cybr-btn__tag">R25</span>
            //     </button>
            // </div>
            <div className='overflow-y-auto h-full text-xs w-96'>


                <button className='relative card' id="14" onClick={this.handleClick}>
                    <div className='absolute  w-full h-full ' id="14">
                        
                    </div>
                    <p className='text-end'> Fc: 2019 </p>

                    <div className='flex justify-center items-center'>
                        <p className='text-center text-xl'>  Scotiabank </p>
                        <div className=' w-full flex flex-row-reverse'>
                            <FiChevronRight className='text-lg' />
                        </div>
                    </div>

                    <p className='text-start' > Scotiabank : TC  </p>
                </button>




                
            </div>
        );
    }
}
export default Notfound;