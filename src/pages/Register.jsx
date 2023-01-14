import React from 'react';
import { Navigate, NavLink } from "react-router-dom";
import NavIndex from "../components/NavIndex";

class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='h-screen'>
                <NavIndex />
                <div className='h-4/5 flex justify-center items-center'>
                    <form onSubmit={this.handleSubmit} id="formLogin" className='min-w-max w-1/4 bg-white flex flex-col items-center p-4 min-h-max mb-4 box-session'>
                        <p className='text-3xl'>Register </p>
                        <NavLink to="/Login" className="text-sm text-gray-600 underline mb-7">or login to account</NavLink>

                        <label htmlFor="email" className='my-2 '>
                            Name: <br />
                            <input type="text" name="name" id="name" placeholder='name' />
                        </label>

                        <label htmlFor="email" className='my-2 '>
                            Last Name: <br />
                            <input type="text" name="lastname" id="lastname" placeholder='lastname' />
                        </label>

                        <label htmlFor="email" className='my-2'>
                            Email: <br />
                            <input type="email" name="email" id="email" placeholder='name@gmail.com' />
                        </label>

                        <label htmlFor="password" className='my-2'>
                            Password: <br />
                            <input type="password" name="password" id="password" placeholder='*******' />
                        </label>

                        <label htmlFor="password" className='my-2'>
                            Repeat Password: <br />
                            <input type="password" name="password" id="password" placeholder='*******' />
                        </label>

                        <button type="submit" className='btn w-full mt-2'>Login</button>
                    </form>
                </div>
            </div>

        );
    }
}

export default Register;