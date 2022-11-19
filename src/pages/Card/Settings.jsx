import React from 'react';
import Navbar from "../../components/Navbar";
import NavTop from "../../components/NavTop";
import ButtonForm from "../../components/buttons/ButtonForm";
import ButtonLinkFixed from "../../components/buttons/ButtonLinkFixed";
import { BsDot } from "react-icons/bs";
import { InputSpecial, InputSpecialNumber } from "../../components/input/Inputs";


class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            res: false,
            data: {},
            idCard: sessionStorage.getItem('card')
        });
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            console.log(res);
            this.setState({
                res: res['res'],
                data: res['msg'],
            });
        });
    }

    handleClickDelete() {
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
            console.log(res);
        });
    }

    handleSubmit(e){
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
            console.log(res);
        });
    }

    render() {
        const { idCard, data } = this.state;
        const { handleClickDelete, handleSubmit } = this;
        var creditCode;


        if (data.type_card == "Credit") {
            creditCode = (
                <div>
                    <InputSpecialNumber
                        name="billing_cycle"
                        label="Ciclo de Factracion:"
                        min="1"
                        max="31"
                        value={data.billing_cycle}
                    />

                    <InputSpecialNumber
                        name="closing_date"
                        label="Fecha de Cierre:"
                        min="1"
                        max="31"
                        value={data.closing_date}

                    />

                    <InputSpecialNumber
                        name="payment_due_date"
                        label="F. Vencimiento de Pago:"
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
                    <ButtonLinkFixed name="Volver" customClass='top-5 right-5' toLink="/Dashboard/tarjetas" />
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
                            <form onSubmit={handleSubmit} id="formCardUpdate" className='box-session mb-8 pb-8'>
                                <InputSpecial
                                    type="text"
                                    name="name"
                                    label="Nombre de tu tarjeta:"
                                    value={data.name}
                                />

                                <InputSpecialNumber
                                    name="bottom_line"
                                    label="Cantidad de la Tarjeta:"
                                    step={0.01}
                                    value={data.bottom_line}
                                />

                                <InputSpecial
                                    type="text"
                                    name="name_banck"
                                    label="Nombre del Banco:"
                                    value={data.name_banck}
                                />

                                <InputSpecial
                                    type="date"
                                    name="card_expiration_date"
                                    label="Fecha de Expiracion:"
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
                                    <ButtonForm name="Eliminar" actionButton={handleClickDelete} />
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