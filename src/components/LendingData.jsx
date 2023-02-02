import React from 'react';
import LendingsContext from "../context/LendingsContext";
import { InputLine, InputSpecial } from './input/Inputs';
import TimeLineChart from "./chart/TimeLineChart";
import NotData from './NotData';
import Moment from 'moment';
import FormCreateLending from "./FormCreateLending";
import ButtonForm from './buttons/ButtonForm';
import Loading from "./Loading";
import { ButtonActionAbsolute } from './buttons/ButtonFixed';
import moment from 'moment';

class LendingData extends React.Component {
    constructor(props) {
        super(props);
        
        this.submitFormEdit = this.submitFormEdit.bind(this);
        this.updateListDesactive = this.updateListDesactive.bind(this);
        this.updateListActive = this.updateListActive.bind(this);
        this.closeLending = this.closeLending.bind(this);
        this.submitFormCreate = this.submitFormCreate.bind(this);
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

        const fetchPromise = fetch("https://financemeapi.com/api/lending/showAllDesactives", {
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
        }).catch(error => {
            console.log('error');
        });
    }

    updateListActive() {
        let key = localStorage.getItem('key');

        const fetchPromise = fetch("https://financemeapi.com/api/lending/showAllActives", {
            'headers': {
                'Authorization': 'Bearer ' + key,
            }
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            this.context.updateListActive(res['msg']);
        }).catch(error => {
            console.log('error');
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
            console.log(res);
            this.context.updateItemEditing(res['lending']);
            this.context.stateOptions ? this.updateListActive() : this.updateListDesactive();
        });
    }

    submitFormCreate(e){
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
        }).then( res => {
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
        const { submitFormEdit, closeLending, submitFormCreate } = this;
        const { edited, currentItemEdited, resetDataPanel, showCreateLending, create } = this.context;

        if (!edited && !create) {
            return (
                <div className='h-screen'>
                    {/* <FormCreateLending vision={showFormPanel} closePanel={hiddenPanel} /> */}
                    <NotData>
                        <button type='submit' className='btn mt-2' onClick={showCreateLending}>
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
                        
                        <InputSpecial type="text" name="debtor" label="Deudor" placeholder="deudor" />
                        <InputSpecial type="text" name="amount" label="Monto" placeholder="S/ 0.00" />
                        <InputSpecial type="date" name="payment_date" label="Fecha de Pago"  />

                        <div className='text-center mt-20'>
                            <ButtonForm name="Crear" />
                        </div>
                    </form>
                </div>
            )
        }

        return (
            <div className='p-3 relative'>

                <p className='text-center text-2xl font-semibold'>Informacion de prestamo</p>
                <p className='text-center text-sm'> 100.156.654.2{currentItemEdited.id} </p>
                {
                    [currentItemEdited].map(item => (
                        <form onSubmit={submitFormEdit} className='text-sm' key={item.id}>

                            <div className='grid grid-cols-3 mt-7 justify-between' >
                                <input type="hidden" name="id" defaultValue={item.id} />
                                <InputSpecial type="text" name="debtor" label="Deudor" value={item.debtor} />
                                <InputSpecial type="text" name="amount" label="Monto" value={item.amount} />
                                <InputSpecial type="date" name="payment_date" label="Fecha de Pago" value={Moment(item.payment_date).format('YYYY-MM-DD')} />
                            </div>

                            <div className=''>
                                <TimeLineChart inicio={item.created_at} fin={item.payment_date} />
                            </div>

                            {/* <div className='pl-3 mt-2'>
                                <button  className='btn text-base font-semibold' onClick={showPanel}> Aplazar :</button>
                                <ul className='mt-4'>
                                    <li className='w-full grid grid-cols-3 justify-between text-center bg-white p-3 mb-2 shadow-slate-500/20 shadow-md'>
                                        <p>Fecha de Actualizacion</p>
                                        <p>Monto</p>
                                        <p>Fecha de Pago</p>
                                    </li>
                                    <div className='overflow-y-auto h-60'>
                                        {
                                            item.postpone.map(item => (
                                                <li className=' w-full grid grid-cols-3 justify-between text-center odd:bg-gray-200 even:bg-none p-1.5'>
                                                    <p>{Moment(item[0]).format('DD MMM. YYYY, HH:mm a')}</p>
                                                    <p>S/. {item[1]}</p>
                                                    <p>{Moment(item[2]).format('YYYY-MM-DD')}</p>
                                                </li>
                                            ))
                                        }
                                    </div>
                                </ul>
                            </div> */}

                            {
                                currentItemEdited.state_id == 1 ?
                                    <div className='flex justify-evenly items-center mt-10'>
                                        <ButtonForm name="Guardar" />
                                        <ButtonForm name="Finalizar" actionButton={closeLending} />
                                    </div> : ""
                            }
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