import React from 'react';
import Navbar from "../../components/Navbar";
import NavTop from "../../components/NavTop";
import ButtonForm from "../../components/buttons/ButtonForm";
import { BsDot } from "react-icons/bs";
import { InputSpecial, InputSpecialNumber } from "../../components/input/Inputs";
import { ButtonLinkFixed } from "../../components/buttons/ButtonFixed";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            res: false,
            data: {},
            idCard: sessionStorage.getItem('card')
        });
        this.handleClickUpdateState = this.handleClickUpdateState.bind(this);
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
    }

    componentDidMount() {
        let key = localStorage.getItem('key');

        const fetchPromise = fetch(`http://127.0.0.1:8000/api/card/showOne/${this.state.idCard}`, {
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
        });
    }

    handleClickUpdateState() {
        let key = localStorage.getItem('key');
        let idCard = sessionStorage.getItem('card');


        const fetchPromise = fetch(`http://127.0.0.1:8000/api/card/UpdateState/${idCard}`, {
            method: 'POST',
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

        }).catch(err => {
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
                title: 'No se Ha Actualizado La Cuenta'
            });
        });
    }

    handleSubmitUpdate(e) {
        e.preventDefault();
        let key = localStorage.getItem('key');
        let idCard = sessionStorage.getItem('card');

        const fetchPromise = fetch(`http://127.0.0.1:8000/api/card/update/${idCard}`, {
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
            var iconSwal = res['res'] ? 'success' : 'info'
            Toast.fire({
                icon: iconSwal,
                title: res['msg']
            });
        }).catch(err => {
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
                title: 'No se Ha Actualizado La Cuenta'
            });
        });
    }

    render() {
        const { idCard, data } = this.state;
        const { handleClickUpdateState, handleSubmitUpdate } = this;
        var creditCode;

        if (data.type_card == "Credit") {
            creditCode = (
                <div className='text-center'>
                    
                    <InputSpecial
                        type="number"
                        name="bottom_line"
                        label="Linea de Credito"
                        value={data.bottom_line}
                    />

                    <InputSpecialNumber
                        name="billing_cycle"
                        label="Ciclo de Factracion"
                        min="1"
                        max="31"
                        value={data.billing_cycle}
                    />

                    <InputSpecialNumber
                        name="closing_date"
                        label="Fecha de Cierre"
                        min="1"
                        max="31"
                        value={data.closing_date}

                    />

                    <InputSpecialNumber
                        name="payment_due_date"
                        label="F. Vencimiento de Pago"
                        min="1"
                        max="31"
                        value={data.payment_due_date}
                    />
                </div>
            )
        }

        if (idCard != null) {
            return (
                <div className='md:pl-20 pl-0'>
                    <ButtonLinkFixed name="Volver" customClass='top-5 right-5' toLink="/Dashboard/Tarjetas" />
                    <Navbar />
                    <NavTop />

                    <div className='grid grid-cols-settings gap-4 py-8 w-4/5 m-auto'>
                        <div>
                            <div className='box sticky top-7'>
                                <p className='w-full text-center mb-3 text-xl font-bold'> Configuracion </p>
                                <div className='grid gap-3 text-sm'>
                                    <div className='flex items-center'>
                                        <BsDot />
                                        <a href="#formCardUpdate">Cambiar Datos</a>
                                    </div>
                                    <div className='flex items-center'>
                                        <BsDot />
                                        <a href="#delete">Eliminar Tarjeta</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div >
                            <form onSubmit={handleSubmitUpdate} id="formCardUpdate" className='box-session mb-8 pb-8'>
                                <h1 className='text-center font-bold text-2xl'>Actualizar Datos</h1>

                                <InputSpecial
                                    type="text"
                                    name="name"
                                    label="Nombre de tu tarjeta"
                                    value={data.name}
                                />

                                <InputSpecialNumber
                                    name="bottom_line"
                                    label="Cantidad de la Tarjeta"
                                    step={0.01}
                                    value={data.amount}
                                />

                                <InputSpecial
                                    type="text"
                                    name="name_banck"
                                    label="Nombre del Banco"
                                    value={data.name_banck}
                                />

                                <InputSpecial
                                    type="date"
                                    name="card_expiration_date"
                                    label="Fecha de Expiracion"
                                    value={data.card_expiration_date}
                                />

                                {creditCode}

                                <div className='w-full text-center mt-10 text-lg'>
                                    <ButtonForm name="Actualizar" />
                                </div>


                            </form>

                            <div className='box-session mb-5 p-6' id='delete'>
                                <h1 className='text-center font-bold text-2xl'>Eliminar Tarjeta</h1>
                                <p className='mt-4 text-sm text-justify'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ipsa quis molestiae fugit deleniti, alias odio voluptatum eveniet a soluta maxime ex atque consequatur, dolorem nostrum nulla eaque maiores non! </p>

                                <div className='w-full text-center mt-8'>
                                    <ButtonForm name="Eliminar" actionButton={handleClickUpdateState} />
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            );
        }

        return (
            <div className='md:pl-20 pl-0'>
                <ButtonLinkFixed name="Volver" customClass='top-5 right-5' toLink="/Dashboard/tarjetas" />
                <Navbar />
                <NavTop />

                <div className='w-full h-screen flex items-center justify-center'>
                    <p>Selecciona Una Tarjeta</p>
                </div>
            </div>
        );

    }
}


export default Settings;