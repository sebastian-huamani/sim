import React from 'react';
import { FiChevronLeft } from "react-icons/fi";
import CardContext from "../context/CardContext";
import NotData from "./NotData";
import Moment from 'moment';

class Items extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        const idItem = e.target.getAttribute("id");
        this.context.updateItem(idItem);
        this.context.updateChangeReset();
    }

    render() {
        const { itemsList } = this.context;
        const { data } = this.props;
        const { handleClick } = this;

        

        const items = [data].map(item => (
                <button className='relative w-full grid grid-cols-1/4 border-black border-b py-1.5 text-xs items-center' key={item.id} onClick={handleClick}>

                    <div className='absolute w-full h-14' id={item.id}></div>

                    <FiChevronLeft className='text-xl' />
                    <div>
                        <div className='mb-2 text-sm text-start'>
                            {item.title}
                        </div>
                        <div className='flex justify-between'>
                            <p> {Moment.utc(item.created_at).format('DD MMM. YYYY, HH:mm a')} </p>
                            <p className={`${item.amount > 0 ? 'text-green-600' : 'text-red-500'}  font-medium`}> { item.amount } </p>
                        </div>
                    </div>
                </button>
        ));

        
        if (data.length == 0) {
            return <NotData />
        }

        return (
            <div>
                {items}
            </div>
        );
    }
}

Items.contextType = CardContext;

export default Items;