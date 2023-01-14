import React from 'react';
import Navbar from "../../components/Navbar";
import NavTop from "../../components/NavTop";
import { ButtonLinkFixed } from "../../components/buttons/ButtonFixed";
import { InputSimple } from '../../components/input/Inputs';
import { AiOutlineDollarCircle } from "react-icons/ai";

class Transferencias extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idCard: sessionStorage.getItem('card'),
            cardList: JSON.parse(sessionStorage.getItem('listCard')),
        }
        this.dataSelectedCard = this.dataSelectedCard.bind(this);
        this.dataOptionsCards = this.dataOptionsCards.bind(this);
    }

    dataSelectedCard(cardList, idCard) {

        var card;
        
        cardList.map(item => {
            if (item.id == idCard ) {
                card = item
            }
        })
        return card;
    }

    dataOptionsCards(cardList, idCard) {
        
        var optionsList = cardList.map(item => (
            item.id != idCard ? <option value={item.id} key={item.id}>{item.name}  - S/. {item.amount} </option> : ''
        ));
        return optionsList;
    }

    render() {
        const { idCard, cardList } = this.state;
        
        if (idCard == null) {
            return (
                <div className='md:pl-20 pl-0'>
                    <ButtonLinkFixed name="Volver" customClass='top-5 right-5' toLink="/Dashboard/Tarjetas" />
                    <Navbar />
                    <NavTop />

                    <div className='w-full h-screen flex items-center justify-center'>
                        <p>Selecciona Una Tarjeta</p>
                    </div>
                </div>
            )
        }
        

        var card = this.dataSelectedCard(cardList, idCard);
        var options = this.dataOptionsCards(cardList, idCard);

        return (
            <div className='md:pl-20 pl-0'>
                <Navbar />
                <NavTop />
                <ButtonLinkFixed name="Volver" customClass='top-5 right-5' toLink="/Dashboard/Tarjetas" />

                <div className='grid grid-row-3 gap-4 py-8 w-9/12 sm:w-6/12 md:w-5/12 m-auto h-screen'>

                    <div className='flex items-center'>
                        <div className='box flex items-center'>
                            <div className='ml-16 flex justify-center items-center'>
                                <AiOutlineDollarCircle className='text-5xl' />
                                <div className='ml-4'>
                                    <p className='text-lg'>{card.name}</p>
                                    <p className='text-sm'>{card.id}</p>
                                </div>
                                <p className='ml-16'>S/. {card.amount}</p>
                            </div>
                        </div>
                    </div>

                    <div className='h-full w-full text-xl box flex items-center justify-center'>

                        <form >
                            <InputSimple
                                label="Monto"
                                name="amount"
                                type="number"
                                placeholder="0.00"
                            />
                        </form>
                    </div>


                    <div className='flex items-center'>
                        <div className='box flex items-center'>
                            <div className='ml-16 flex justify-center items-center'>
                                <AiOutlineDollarCircle className='text-5xl' />
                                <div className='ml-4'>
                                    <select name="" id="" className='w-full border-none'>
                                        <option defaultValue >Elige una cuenta de destino</option>
                                        {options}
                                    </select>
                                    <p className='text-sm'>125.153.154.123</p>
                                </div>
                                <p className='ml-16'>135.65</p>
                            </div>
                        </div>
                    </div>


                </div>

            </div>

        );
    }
}
export default Transferencias;