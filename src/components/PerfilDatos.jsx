import React from 'react';
import { InputSpecial } from './input/Inputs';
import ButtonForm from './buttons/ButtonForm';
import { BiUserX, BiUserCheck } from "react-icons/bi";
import Error from './Error';

class PerfilDatos extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            res: false,
            loading: true,
            data: [],
            error: false
        });
        this.submitUpdateUser = this.submitUpdateUser.bind(this);
    }

    componentDidMount() {
        let key = localStorage.getItem('key');

        fetch('https://financemeapi.com/api/user/perfil', {
            method: 'GET',
            'headers': {
                'Authorization': 'Bearer ' + key,
                'Content-Type': 'text/plain',
                'Accept': 'application/json',
            }
        }, [])
            .then(reponse => reponse.json())
            .then(res => {
                this.setState({
                    res: res['res'],
                    loading: res['res'] ? false : true,
                    error: res['res'] ? false : true,
                    data: res['msg'],
                });
            });
    }

    submitUpdateUser(e) {
        e.preventDefault();
        let key = localStorage.getItem('key');

        const fetchPromise = fetch(`https://financemeapi.com/api/user/update`, {
            method: 'POST',
            body: new FormData(e.target),
            'headers': {
                'Authorization': 'Bearer ' + key,
            },
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            // console.log(res);
        }).catch(err => {
            // console.log(err);
        });
    }

    render() {
        const { data, loading, error, res } = this.state;
        const { submitUpdateUser } = this;

        if (error) {
            return (
                <div>
                    <div className='box-session py-5' id='Mis-Datos'>
                        <h1 className='text-center mb-7 text-2xl font-bold'>Mis Datos</h1>
                        <div className='flex items-center justify-center text-8xl opacity-30'>
                            <Error />
                        </div>
                    </div>


                </div>
            );
        }

        if (loading) {
            return (
                <div>
                    <div className='box-session py-5 animate-pulse' id='Mis-Datos'>
                        <h1 className='mx-auto mb-7 h-10 w-2/5 bg-slate-200 rounded'></h1>
                        <div className='w-44 mx-auto'>
                            <div className='my-6'>
                                <p className='bg-slate-200 rounded h-6 w-24'> </p>
                                <input type="text" className='bg-slate-200 rounded h-6' />
                            </div>

                            <div className='my-6'>
                                <p className='bg-slate-200 rounded h-6 w-24'> </p>
                                <input type="text" className='bg-slate-200 rounded h-6' />
                            </div>

                            <div className='my-6'>
                                <p className='bg-slate-200 rounded h-6 w-24'> </p>
                                <input type="text" className='bg-slate-200 rounded h-6' />
                            </div>
                        </div>
                        <div className='h-9 bg-slate-200 rounded w-32 mx-auto'></div>
                    </div>

                    <div className='box-session my-5 p-5 animate-pulse' id='Estado-De-Cuenta'>

                        <p className='text-ellipsis text-center'>Estado de tu cuenta</p>
                        <div className='mt-4 text-center w-full mx-auto'>
                            <div className='text-center'>
                                <p className='h-20 bg-slate-200 rounded w-32 mx-auto mt-1 mb-3'></p>
                                <p className='h-10 bg-slate-200 rounded w-40 mx-auto '></p>
                            </div>
                        </div>

                    </div>
                </div>

            );
        }

        return (
            <div>
                <div className='box-session py-5' id='Mis-Datos'>
                    <h1 className='text-center mb-7 text-2xl font-bold'>Mis Datos</h1>

                    <form id="dataUserForm" onSubmit={submitUpdateUser}>

                        {[data].map((item) => (
                            <div key={1}>
                                <InputSpecial
                                    type="text"
                                    name="name"
                                    label="Nombre"
                                    value={item.name}
                                />

                                <InputSpecial
                                    type="text"
                                    name="lastname"
                                    label="Apellido"
                                    value={item.lastname}
                                />

                                <InputSpecial
                                    type="text"
                                    name="email"
                                    label="Email"
                                    value={item.email}
                                    disabled={true}
                                />

                                <div className='w-full text-center  text-lg'>
                                    <ButtonForm name="Actualizar" />
                                </div>
                            </div>
                        ))}

                    </form>

                </div>

                <div className='box-session my-5 p-5' id='Estado-De-Cuenta'>

                    <p className='text-ellipsis text-center'>Estado de tu cuenta</p>
                    <div className='mt-4 text-center w-full mx-auto'>
                        {data.email_verified_at == null
                            ?
                            <div className='text-center'>
                                <BiUserX className='text-8xl flex justify-center w-full' />
                                <button type='submit' className='btn' disabled={false}>Cuenta Sin Verificar</button>
                            </div>
                            :
                            <div className='text-center'>
                                <BiUserCheck className='text-8xl flex justify-center w-full' />
                                <button type='submit' className='btn' disabled={true}>Cuenta Verificada</button>
                            </div>

                        }
                    </div>

                </div>
            </div>
        );
    }
}
export default PerfilDatos;