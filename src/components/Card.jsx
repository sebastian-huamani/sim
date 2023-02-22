import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoSettingsSharp } from "react-icons/io5";
import { BiTransfer } from "react-icons/bi";
import CardContext from "../context/CardContext";

class Card extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
        this.handleClickSettings = this.handleClickSettings.bind(this);
    }

    handleClick(e) {
        sessionStorage.clear();

        const idCard = e.target.getAttribute("id");
        let key = localStorage.getItem('key');

        sessionStorage.setItem("card", idCard);

        const fetchPromise = fetch(`https://financemeapi.com/api/card/showOne/${idCard}`, {
            method: 'GET',
            'headers': {
                'Authorization': 'Bearer ' + key,
            }
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            this.context.updateCard(JSON.stringify(res['msg']));
            this.context.updateStateHistory(false);
        });
    }

    handleClickSettings(e) {
        let idCard = e.target.getAttribute("id");
        sessionStorage.setItem('card', idCard);
        sessionStorage.setItem('listCard', JSON.stringify(this.context.CardList))
    }

    render() {
        const { dataItem } = this.props;

        return (
            <div>
                <div className='relative mb-4 w-full cursor-pointer' key={dataItem.id} >

                    <div className='absolute w-full h-24' id={dataItem.id} onClick={this.handleClick}></div>

                    <div className='grid grid-rows-4/1 h-32'>
                        <div className='top-card'>

                            <div className='flex justify-between w-full'>
                                <p>{dataItem.name}</p>
                                <p>{dataItem.type_card}</p>
                            </div>

                            <p className='text-3xl mt-6 font-medium text-center'> S/. {dataItem.amount}</p>
                            
                        </div>

                        <div className='bottom-card relative'>
                            <div>
                                <NavLink type="submit" to="/Dashboard/Tarjetas/Configuracion" className='absolute h-8 w-4 mr-4' onClick={this.handleClickSettings} id={dataItem.id} title="Settings Card"></NavLink>
                                <div className='mr-4'>
                                    <IoSettingsSharp />
                                </div>
                            </div>

                            <div>
                                <NavLink type="submit" to="/Dashboard/Tarjetas/Transferencias" className='absolute h-8 w-4 mr-4' onClick={this.handleClickSettings} id={dataItem.id}></NavLink>
                                <div className='mr-4'>
                                    <BiTransfer />
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

Card.contextType = CardContext;

export default Card