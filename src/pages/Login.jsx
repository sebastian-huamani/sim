import React from 'react';
import { Navigate, NavLink } from "react-router-dom";
import NavIndex from "../components/NavIndex";
import ButtonForm from "../components/buttons/ButtonForm";
import { InputSimple } from "../components/input/Inputs";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            done: false,
            msg: '',
            token: '',
        });

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const fetchPromise = fetch("https://financemeapi.com/api/login", {
            method: 'POST',
            body: new FormData(e.target)
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            this.setState({
                done: res['res'],
                msg: res['msg'],
                token: res['access_token']
            });
            localStorage.setItem('key', res['access_token']);
            localStorage.setItem('done', res['res']);
        });
    }

    render() {

        let done = localStorage.getItem('done');

        if (done) {
            return <Navigate to="/Dashboard/Home" />
        }

        return (
            <div className='h-screen'>
                <NavIndex />
                <div className='h-4/5 flex justify-center items-center'>
                    <form onSubmit={this.handleSubmit} id="formLogin" className='min-w-max md:w-1/4 sm:w-2/5 w-3/4  bg-white flex flex-col items-center p-4 box'>
                        <p className='text-3xl'>Login </p>
                        <NavLink to="/Register" className="text-sm text-gray-600 underline mb-7">or create a count </NavLink>

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