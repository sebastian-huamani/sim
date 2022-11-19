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

        const items = this.props.data.map(item => (
                <button className='relative w-full grid grid-cols-1/4 border-black border-b py-1.5 text-xs items-center' key={item.id} onClick={this.handleClick}>

                    <div className='absolute w-full h-14' id={item.id}></div>

                    <FiChevronLeft className='text-xl' />
                    <div>
                        <div className='mb-2 text-sm'>
                            {item.title}
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