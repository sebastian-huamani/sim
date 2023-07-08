import React from 'react';
import LendingsContext from "../context/LendingsContext";
import { InputSpecial } from './input/Inputs';
import NotData from './NotData';
import Moment from 'moment';
import ButtonForm from './buttons/ButtonForm';
import { ButtonActionAbsolute } from './buttons/ButtonFixed';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import CuotasLending from './CuotasLending';
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

class LendingData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            done: false,
            cards: [],
        }

        this.submitFormEdit = this.submitFormEdit.bind(this);
        this.updateListDesactive = this.updateListDesactive.bind(this);
        this.updateListActive = this.updateListActive.bind(this);
        this.closeLending = this.closeLending.bind(this);
        this.submitFormCreate = this.submitFormCreate.bind(this);
        this.selectOptionsCards = this.selectOptionsCards.bind(this);
    }

    componentDidMount() {
        let key = localStorage.getItem('key');

        const fetchPromise = fetch("https://financemeapi.com/api/cards", {
            'headers': {
                'Authorization': 'Bearer ' + key,
            }
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            this.setState({
                cards: res['msg'],
                done: res['res']
            });
        });
    }

    selectOptionsCards(cardsList) {
        var optionsList = cardsList.map(item => (
            <option className='h-24' value={item.id} key={item.id}>{item.name}</option>
        ));
        return optionsList;
    }

    dataSplit(year_month) {
        return year_month.split("-");
    }

    updateListDesactive() {
        let key = localStorage.getItem('key');

        const dateText = document.querySelector('input[type="month"]')
        let data = this.dataSplit(dateText.value);
        const formData = new FormData();
        formData.append('year', data[0]);
        formData.append('month', data[1]);

        const fetchPromise = fetch("https://financemeapi.com/api/lending/desactives", {
            method: 'POST',
            'headers': {
                'Authorization': 'Bearer ' + key,
            },
            body: formData
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            this.context.updateListDesactive(res['msg']);
        });
    }

    updateListActive() {
        let key = localStorage.getItem('key');

        const fetchPromise = fetch("https://financemeapi.com/api/lending/actives", {
            'headers': {
                'Authorization': 'Bearer ' + key,
            }
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            this.context.updateListActive(res['msg']);
        });
    }

    submitFormEdit(e) {
        e.preventDefault();
        let key = localStorage.getItem('key');
        const fetchPromise = fetch(`https://financemeapi.com/api/lending/edit`, {
            method: 'POST',
            body: new FormData(e.target),
            'headers': {
                'Authorization': 'Bearer ' + key,
            }
        });

        fetchPromise.then(response => {
            return response.json()
        }).then(res => {
            Toast.fire({
                icon: 'info',
                title: res['msg']
            });
            // this.context.updateItemEditing(res['lending']);
            // this.context.stateOptions ? this.updateListActive() : this.updateListDesactive();
        });
    }

    submitFormCreate(e) {
        e.preventDefault();
        let key = localStorage.getItem('key');
        const fetchPromise = fetch('https://financemeapi.com/api/lending/create', {
            method: 'POST',
            body: new FormData(e.target),
            'headers': {
                'Authorization': 'Bearer ' + key,
            }
        });

        fetchPromise.then(response => {
            return response.json()
        }).then(res => {
            Toast.fire({
                icon: 'info',
                title: res['msg']
            });
            this.context.updateItemEditing(res['lending']);
            this.context.stateOptions ? this.updateListActive() : this.updateListDesactive();
            document.getElementById('formCreateLending').reset();
            this.context.resetDataPanel();
        });

    }

    closeLending(e) {
        e.preventDefault();
        let key = localStorage.getItem('key');
        var id = this.context.idItem;
        const fetchPromise = fetch(`https://financemeapi.com/api/lending/updateState/${id}`, {
            method: 'POST',
            'headers': {
                'Authorization': 'Bearer ' + key,
            }
        });

        fetchPromise.then(response => {
            return response.json()
        }).then(res => {
            this.context.resetDataPanel();
            this.context.stateOptions ? this.updateListActive() : this.updateListDesactive();
            // this.context.updateItemEditing(res['lending']);
        });
    }

    render() {
        const { cards, show} = this.state;
        const { submitFormEdit, closeLending, submitFormCreate, selectOptionsCards } = this;
        const { edited, currentItemEdited, resetDataPanel, showCreateLending, create } = this.context;
        var options = selectOptionsCards(cards)
        if (!edited && !create) {
            return (
                <div className='h-70vh sm:h-screen '>
                    {/* <FormCreateLending vision={showFormPanel} closePanel={hiddenPanel} /> */}
                    <NotData>
                        <button type='submit' className='btn mt-2'>
                            Nuevo Prestamo
                        </button>
                    </NotData>
                </div>
            )
        }

        if (create) {
            return (
                <div className=' relative'>
                    <ButtonActionAbsolute name="Volver" customClass='right-0 top-0' actionButton={resetDataPanel} />

                    <form onSubmit={submitFormCreate} id='formCreateLending' className='pt-24' >


                        <p className='text-center text-2xl font-semibold mb-20'>Nuevo Prestamo</p>

                        <div className='flex justify-center'>
                            <select name="cards_id" >
                                <option value="-1" defaultValue>Elige una cuenta </option>
                                {options}
                            </select>
                        </div>

                        <InputSpecial type="text" name="debtor" label="Deudor" placeholder="deudor" />
                        <InputSpecial type="number" name="amount" label="Monto" placeholder="S/ 0.00" />
                        <InputSpecial type="date" name="created_date_lending" label="Fecha de Inicio" />

                        <InputSpecial type="date" name="payment_date_lending" label="Fecha de Pago" />

                        <div className='text-center mt-20 mb-4'>
                            <ButtonForm name="Crear" />
                        </div>
                    </form>
                </div>
            )
        }

        return (
            <div className='p-3 relative h-90vh'>

                <p className='text-center text-2xl font-semibold'>Informacion de prestamo</p>
                {
                    [currentItemEdited].map(item => (
                        <form onSubmit={submitFormEdit} className='text-sm flex flex-col justify-between h-full' key={item.id_item}>
                            <div className='grid grid-cols-3 mt-4 justify-between gap-y-2' >
                                <input type="hidden" name="id" defaultValue={item.id_item} />
                                <label htmlFor='amount' className='grid my-6 w-full justify-center'>
                                    Monto :<br />
                                    <input type="number" name='amount' step='0.01' id='amount' className='text-center font-normal border-b-2' defaultValue={item.amount_item} autoComplete="off"/>
                                </label>
                                <InputSpecial type="date" name="created_date_lending" label="Fecha de Inicio" value={Moment(item.created_at).format('YYYY-MM-DD')} />
                                <InputSpecial type="date" name="payment_date_lending" label="Fecha de Pago" value={Moment(item.payment_date_lending).format('YYYY-MM-DD')} />
                                {
                                    item.debtor != null
                                        ? <label htmlFor='amount' className='grid mb-3 w-full justify-center'>
                                            Deudor :<br />
                                            <input type="text" name='debtor' id='debtor' className='text-center font-normal border-b-2' defaultValue={item.debtor != null ? item.debtor : ''} autoComplete="off"/>
                                        </label>
                                        : ''
                                }
                            </div>

                            <CuotasLending />

                            <div className='w-full flex justify-center'>
                                <ButtonForm name="Guardar"/>
                            </div>

                        </form>
                    ))
                }
                <ButtonActionAbsolute name="Volver" customClass='right-0 top-0' actionButton={resetDataPanel} />
            </div>
        );
    }
}
LendingData.contextType = LendingsContext;
export default LendingData;