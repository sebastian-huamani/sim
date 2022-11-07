import React from 'react';
import { Navigate, NavLink } from "react-router-dom";
import NavIndex from "../components/NavIndex";


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
        const fetchPromise = fetch("http://127.0.0.1:8000/api/login", {
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
            return <Navigate to="/Dashboard/home" />
        }

        return (
            <div className='h-screen'>
                <NavIndex />
                <div className='h-4/5 flex justify-center items-center'>
                    <form onSubmit={this.handleSubmit} id="formLogin" className='min-w-max w-1/4 bg-white flex flex-col items-center p-4 box'>
                        <p className='text-3xl'>Login </p>
                        <NavLink to="/register" className="text-sm text-gray-600 underline mb-7">or create a count </NavLink>

                        <label htmlFor="email" className='my-2'>
                            Email: <br />
                            <input type="email" name="email" id="email" placeholder='name@gmail.com' />
                        </label>

                        <label htmlFor="password" className='my-2'>
                            Password: <br />
                            <input type="password" name="password" id="password" placeholder='*******' />
                        </label>

                        <button type="submit" className='btn w-full mt-2'>Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;