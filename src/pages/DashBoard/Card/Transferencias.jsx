import React from 'react';
import { ButtonLinkFixed } from "../../../components/buttons/ButtonFixed";
import ButtonForm from '../../../components/buttons/ButtonForm';
import { InputSimple } from '../../../components/input/Inputs';
import { AiOutlineDollarCircle } from "react-icons/ai";
import Navbar from "../../../components/Navbar";
import NavTop from "../../../components/NavTop";


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const Toast = MySwal.mixin({
    customClass: 'text-sm bg-none',
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 6000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', MySwal.stopTimer)
        toast.addEventListener('mouseleave', MySwal.resumeTimer)
    }
});

class Transferencias extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idCard: sessionStorage.getItem('card'),
            cardList: JSON.parse(sessionStorage.getItem('listCard')),
            toCardSelectedId : '...',
            toCardSelectedAmount : 0,
            toCardSelectedBank: ''
        }
        this.dataSelectedCard = this.dataSelectedCard.bind(this);
        this.dataOptionsCards = this.dataOptionsCards.bind(this);
        this.changeSelectedOptions = this.changeSelectedOptions.bind(this);
        this.submitTransaction = this.submitTransaction.bind(this);
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
            item.id != idCard ? <option value={item.id} key={item.id}>{item.name} </option> : ''
        ));
        return optionsList;
    }

    changeSelectedOptions(e){
        this.state.cardList.map(item => {

            if( item.id == e.target.value){
                this.setState({
                    toCardSelectedId: item.id,
                    toCardSelectedAmount:  item.amount,
                    toCardSelectedBank:  item.name_banck
                })
            }

            if(e.target.value == -1){
                this.setState({
                    toCardSelectedId : '...',
                    toCardSelectedAmount : 0,
                    toCardSelectedBank: ''
                });
            }
        })
    }

    submitTransaction(e){
        e.preventDefault();
        let key = localStorage.getItem('key');

        

        const fetchPromise = fetch(`https://financemeapi.com/api/transaction/count/transactionBetweenCards`, {
            method: 'POST',
            'headers': {
                'Authorization': 'Bearer ' + key,
            },
            body: new FormData(e.target),
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            Toast.fire({
                icon: 'success',
                title: res['msg']
            });
        }).catch(error => {
            Toast.fire({
                icon: 'info',
                title: "Transferencia no Realizada"
            });
        });


    }

    render() {
        const { idCard, cardList, toCardSelectedId, toCardSelectedAmount, toCardSelectedBank } = this.state;
        const { changeSelectedOptions, submitTransaction } = this;
        
        if (idCard == null) {
            return (
                <div className='md:pl-20 pl-0'>
                    <ButtonLinkFixed name="Volver" customClass='top-3 right-5 right-5' toLink="/Dashboard/Tarjetas" />
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
                <ButtonLinkFixed name="Volver" customClass='top-3 right-5 right-5' toLink="/Dashboard/Tarjetas" />

                <form id='formTransaction' onSubmit={submitTransaction} className='grid grid-row-3 gap-4 py-8 w-9/12 sm:w-6/12 md:w-5/12 m-auto h-screen'>

                    <div className='flex items-center'>
                        <div className='box flex items-center'>
                            <div className='ml-4 sm:ml-16 flex justify-center items-center'>
                                <AiOutlineDollarCircle className='text-5xl' />
                                <div className='ml-4'>
                                    <p className='text-lg'>{card.name}</p>
                                    <p className='text-sm'>{card.id}</p>
                                    <input type="hidden" name="fromCard" defaultValue={card.id} />
                                </div>
                                <p className='ml-16'>S/. {card.amount}</p>
                            </div>
                        </div>
                    </div>

                    <div className='h-full w-full text-xl box flex items-center justify-center'>
                        <InputSimple
                            label="Monto"
                            name="amount"
                            type="number"
                            placeholder="0.00"
                        />
                    </div>

                    <div className='flex items-center'>
                        <div className='box flex items-center'>
                            <div className='ml-4 sm:ml-16 flex justify-center items-center'>
                                <AiOutlineDollarCircle className='text-5xl' />
                                <div className='ml-4'>
                                    <select name='toCard' onChange={changeSelectedOptions} className='w-full border-none'>
                                        <option value="-1"  defaultValue >Elige una cuenta de destino</option>
                                        {options}
                                    </select>
                                    <div className='flex  item-center justify-around mt-2'>
                                        <p className='text-sm'>{toCardSelectedId}</p>
                                        <p className='ml-16'>Bank: {toCardSelectedBank}</p>
                                    </div>
                                </div>
                                <p className='ml-16'>S/. {toCardSelectedAmount}</p>

                            </div>
                        </div>
                    </div>
                    
                    <div className='text-center'>
                        <ButtonForm name="Enviar Transaccion"  />
                    </div>

                </form>
            </div>

        );
    }
}
export default Transferencias;