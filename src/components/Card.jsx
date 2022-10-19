import React from 'react';
import { FiChevronRight } from "react-icons/fi";

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const cards = this.props.data.map(item => (
            <div className='card' key={item.id}>
                <p className='text-end'> Fc: {item.created_at} </p>

                <div className='flex justify-center items-center relative'>
                    <p className='text-center text-base'>  {item.name} </p>
                    <div className='absolute w-full flex flex-row-reverse'>
                        <FiChevronRight className='' />
                    </div>
                </div>

                <p className='text-start' > {item.name_banck} : {item.type_cards_id}  </p>
            </div>

        ));


        return (
            <div>
                {cards}
            </div>
        );
    }
}
export default Card