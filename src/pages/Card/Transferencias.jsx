import React from 'react';
import Navbar from "../../components/Navbar";
import NavTop from "../../components/NavTop";
import ButtonForm from "../../components/buttons/ButtonForm";
import { BsDot } from "react-icons/bs";



class Transferencias extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount(){
        let key = localStorage.getItem('key');

        const fetchPromise = fetch(`http://127.0.0.1:8000/api/transaction/count/showAllItemsHistory`, {
            method: 'GET',
            'headers': {
                'Authorization': 'Bearer ' + key,
            },
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            console.log(res);
        }).catch( error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className='md:pl-20 pl-0'>
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

                    <div>
                        <div>
                            asdadadadasdadadasda
                        </div>

                        <div className='box-session mb-5 p-6' id='delete'>
                            <h1 className='text-center font-bold text-2xl'>Eliminar Tarjeta</h1>
                            <p className='mt-4 text-sm text-justify'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ipsa quis molestiae fugit deleniti, alias odio voluptatum eveniet a soluta maxime ex atque consequatur, dolorem nostrum nulla eaque maiores non! </p>

                            <div className='w-full text-center mt-8'>
                                <ButtonForm name="Eliminar" />
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        );
    }
}
export default Transferencias;