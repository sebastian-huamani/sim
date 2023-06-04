import React from 'react';
import { Navigate, NavLink } from "react-router-dom";
import ButtonForm from "../components/buttons/ButtonForm";
import { ButtonActionAbsolute } from '../components/buttons/ButtonFixed';
import { InputSimple } from "../components/input/Inputs";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const Toast = MySwal.mixin({
    customClass: 'text-sm bg-none',
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 7000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', MySwal.stopTimer)
        toast.addEventListener('mouseleave', MySwal.resumeTimer)
    }
});

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            done: false,
            msg: '',
            token: '',
        });

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDemoUser = this.handleDemoUser.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const fetchPromise = fetch("https://financemeapi.com/api/login", {
            method: 'POST',
            body: new FormData(e.target)
        });
        // Canela18*
        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            if( res['res']){
                this.setState({
                    done: res['res'],
                    msg: res['msg'],
                    token: res['access_token']
                });
                localStorage.setItem('key', res['access_token']);
                localStorage.setItem('done', res['res']);
            } else{
                Toast.fire({
                    icon: 'info',
                    title: res['msg']
                });
            }

        })
    }

    handleDemoUser(){
        var email = document.getElementById('email');
        var password = document.getElementById('password');
        email.value = 'test@demo.com';
        password.value = 'password';
    }

    render() {
        const { handleDemoUser } = this;

        let done = localStorage.getItem('done');

        if (done) {
            return <Navigate to="/Dashboard/Home" />
        }

        
        return (
            <div className='h-screen'>
                <ButtonActionAbsolute name="Cuenta Demo"  customClass="top-2 right-2" actionButton={handleDemoUser}/>
                <div className='h-4/5 flex justify-center items-center'>
                    <form onSubmit={this.handleSubmit} id="formLogin" className='min-w-max md:w-1/4 sm:w-2/5 w-3/4  bg-white flex flex-col items-center p-4 box'>
                        <p className='text-3xl'>Login</p>
                        <a href="https://financemeapi.com/register" className="text-sm text-gray-600 underline mb-7">or create a count </a>

                        <InputSimple
                            type="text"
                            name="email"
                            placeholder="example@gmail.com"
                            label="Email" />

                        <InputSimple
                            type="password"
                            name="password"
                            placeholder="***********"
                            label="Password" />

                        <div className='w-full mt-2 text-center'>
                            <ButtonForm name="Login" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;