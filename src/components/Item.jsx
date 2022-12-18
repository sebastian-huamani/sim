import React from 'react';
import { FiChevronLeft } from "react-icons/fi";
import CardContext from "../context/CardContext";
import NotData from "./NotData";

class Items extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        const idItem = e.target.getAttribute("id");
        this.context.updateItem(idItem);
    }

    render() {
        const { itemsList } = this.context;
        const { data } = this.props;

        if ( JSON.parse(itemsList).length == 0 ) {
            return <NotData >
                <div className='mt-2 font-bold text-base'>
                    Sin Informacion
                </div>
            </NotData>
        }
        
        if (data.length <= 0) {
            return <NotData />
        }

        const items = data.map(item => (
                <button className='relative w-full grid grid-cols-1/4 border-black border-b py-1.5 text-xs items-center' key={item.id} onClick={this.handleClick}>

                    <div className='absolute w-full h-14' id={item.id}></div>

                    <FiChevronLeft className='text-xl' />
                    <div>
                        <div className='mb-2 text-sm text-start'>
                            {item.type_title_transaction}
                        </div>
                        <div className='flex justify-between'>
                            {/* <p> 19 ago. 2022, 10:53 pm </p> */}
                            <p> {item.created_at} </p>
                            <p className='text-green-600 font-medium'> S/ 450.00 </p>
                        </div>
                    </div>
                </button>
        ));

        return (
            <div>
                {items}
            </div>
        );
    }
}

Items.contextType = CardContext;

export default Items;