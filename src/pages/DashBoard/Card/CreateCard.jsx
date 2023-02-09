import React from 'react';
import { InputSpecial, InputSpecialNumber } from "../../../components/input/Inputs";
import { ButtonLinkFixed } from "../../../components/buttons/ButtonFixed";
import ButtonForm from "../../../components/buttons/ButtonForm";
import Navbar from "../../../components/Navbar";
import NavTop from "../../../components/NavTop";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


class CreateCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            debit: true,
            name: 'Tarjeta de Debito'
        });
        this.handleClickCredit = this.handleClickCredit.bind(this);
        this.handleClickDebit = this.handleClickDebit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClickDebit() {
        this.setState({
            debit: true,
            name: 'Tarjeta de Debito'
        });
    }

    handleClickCredit() {
        this.setState({
            debit: false,
            name: 'Tarjeta de Credito'
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let key = localStorage.getItem('key');

        var route = "https://financemeapi.com/api/card/create/DebitCard";
        if (!this.state.debit) {
            route = "https://financemeapi.com/api/card/create/CreditCard";
        }

        const fetchPromise = fetch(route, {
            method: 'POST',
            body: new FormData(e.target),
            'headers': {
                'Authorization': 'Bearer ' + key,
            },
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
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
    
            Toast.fire({
                icon: 'success',
                title: res['msg']
            });
        }).catch( error => {
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
    
            Toast.fire({
                icon: 'info',
                title: 'Faltan Ingresar Datos'
            });
        });
        
        document.getElementById('formCardCreate').reset();
    }

    render() {
        const { handleClickCredit, handleClickDebit, handleSubmit } = this;
        const { name, debit } = this.state;
        var creditCode;

        if (!debit) {
            creditCode = (
                <div>
                    <InputSpecialNumber
                        name="billing_cycle"
                        placeholder="XX"
                        label="Ciclo de Factracion"
                        min="1"
                        max="31"
                    />

                    <InputSpecialNumber
                        name="closing_date"
                        placeholder="XX"
                        label="Fecha de Cierre"
                        min="1"
                        max="31"
                    />

                    <InputSpecialNumber
                        name="payment_due_date"
                        placeholder="XX"
                        label="F. Vencimiento de Pago"
                        min="1"
                        max="31"
                    />
                </div>
            )
        }

        return (
            <div className='md:pl-20 pl-0'>
                <ButtonLinkFixed name="Volver" customClass='top-5 right-5' toLink="/Dashboard/tarjetas" />
                <Navbar />
                <NavTop />
                <div className='sm:h-screen sm:grid block grid-cols-settings gap-4 py-8 w-4/5 m-auto'>
                    <div >
                        <div className='box block sm:sticky top-7'>
                            <p className='w-full text-center mb-3 text-xl font-bold'> Opciones </p>
                            <div className='grid gap-1 text-sm'>
                                <button onClick={handleClickCredit} >Nueva Tarjeta de Credito</button>
                                <button onClick={handleClickDebit}>Nueva Tarjeta de Debito</button>
                            </div>
                        </div>
                    </div>

                    <div className='box-session mb-5'>
                        <h1 className='text-center mb-7 mt-3 text-2xl font-bold'>{name}</h1>

                        <form onSubmit={handleSubmit} id="formCardCreate" className='w-4/5 mx-auto font-medium text-sm text-center'>

                            <InputSpecial
                                type="text"
                                name="name"
                                placeholder="Home Center"
                                label="Nombre de tu tarjeta"
                            />

                            <InputSpecialNumber
                                name="bottom_line"
                                placeholder="S/. 0"
                                label="Cantidad de la Tarjeta"
                                step={0.01}
                            />

                            <InputSpecial
                                type="text"
                                name="name_banck"
                                placeholder="Home Scotiabank"
                                label="Nombre del Banco"
                            />

                            <InputSpecial
                                type="date"
                                name="card_expiration_date"
                                label="Fecha de Expiracion"
                                placeholder="Home Center"
                            />

                            {creditCode}

                            <div className='w-full text-center mt-10 mb-4 text-lg'>
                                <ButtonForm name="Crear" />
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        );
    }
}
export default CreateCard;