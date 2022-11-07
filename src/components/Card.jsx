import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoSettingsSharp } from "react-icons/io5";
import CardContext from "../context/CardContext";



class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            res: false,
            data: {}
        });
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        sessionStorage.clear();
        const idCard = e.target.getAttribute("id");
        sessionStorage.setItem("card", idCard);

        let key = localStorage.getItem('key');

        const fetchPromise = fetch(`http://127.0.0.1:8000/api/card/showOne/${idCard}`, {
            method: 'GET',
            'headers': {
                'Authorization': 'Bearer ' + key,
            }
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            this.setState({
                res: res['res'],
                data: res['msg'],
            });
            sessionStorage.setItem("dataCard", JSON.stringify( res['msg']));
            this.context.updateCard();
        });
    }

    render() {

        const cards = this.props.data.map(item => (

            <div className='relative mb-4 w-full cursor-pointer' key={item.id}  >

                <div className='absolute w-full h-24' id={item.id} onClick={this.handleClick}></div>

                <div className='grid grid-rows-4/1 h-32'>
                    <div className='top-card'>

                        <div className='flex justify-between w-full'>
                            <p>{item.name_banck}</p>
                            <p>{item.type_card}</p>
                        </div>
                        <p className='text-3xl mt-6 font-medium text-center'> S/. {item.bottom_line}</p>

                    </div>

                    <div className='bottom-card'>

                        <button type="submit">
                            <NavLink to="/Dashboard/templates" >
                                <IoSettingsSharp className='' />
                            </NavLink>
                        </button>

                    </div>
                </div>

            </div>

        ));

        return (
            <div>
                {cards}
            </div>
        );
    }
}

Card.contextType = CardContext;

export default Card