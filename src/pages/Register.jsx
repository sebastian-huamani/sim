import React from 'react';
import { NavLink } from "react-router-dom";
import NavIndex from "../components/NavIndex";

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

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastname: '',
            email: '',
            password: '',
            repeatPassword: '',
            passwordsMatch: false,
        }
        this.handleName = this.handleName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleRePassword = this.handleRePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.CreateCount = this.CreateCount.bind(this);
    }

    serializePassword(pass) {
        var sum = 0;
        pass.match(/[A-Z]/g) ? sum += 1 : 0;
        pass.match(/[a-z]/g) ? sum += 1 : 0;
        pass.match(/[0-9]/g) ? sum += 1 : 0;
        return sum == 3 ? true : false;
    }

    handleName(e) {
        this.setState({ name: e.target.value });
    }

    handleLastName(e) {
        this.setState({ lastname: e.target.value });
    }

    handleEmail(e) {
        this.setState({ email: e.target.value })
    }

    handlePassword(e) {
        this.setState({ password: e.target.value, passwordsMatch: false });
    }

    handleRePassword(e) {
        if (this.state.password === e.target.value) {
            this.setState({ passwordsMatch: true });
        } else {
            this.setState({ passwordsMatch: false });
        }

        this.setState({ repeatPassword: e.target.value });
    }

    CreateCount(name, lastname, email, password) {
        let key = localStorage.getItem('key');
        const formData = new FormData();

        formData.append('name', name);
        formData.append('lastname', lastname);
        formData.append('email', email);
        formData.append('password', password);

        const fetchPromise = fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST',
            body: formData,
            'headers': {
                'Authorization': 'Bearer ' + key,
            }
        })

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            console.log(res);
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        var name = this.state.name.trim();
        var lastName = this.state.lastname.trim();
        var email = this.state.email.trim();
        var password = this.state.password;
        var repassword = this.state.repeatPassword;
        var passwordsMatch = this.state.passwordsMatch;

        const value = this.serializePassword(password);

        if (!value) {
            Toast.fire({
                icon: 'info',
                title: 'recuerda que tu contraseña debe contener Mayusculas, Minusculas, Numeros'
            });
        }

        if (!passwordsMatch) {
            Toast.fire({
                icon: 'info',
                title: 'las contraseñas no coinciden!'
            });
        }

        if (value && passwordsMatch) {
            this.CreateCount(name, lastName, email, password);
        }
    }

    render() {
        const { passwordsMatch, name, lastname, email, password, repeatPassword } = this.state;
        const { handleName, handleLastName, handleEmail, handlePassword, handleRePassword, handleSubmit } = this;

        return (
            <div className='h-screen'>
                <NavIndex />
                <div className='h-4/5 flex justify-center items-center'>
                    <form onSubmit={handleSubmit} id="formLogin" className='min-w-max w-1/4 bg-white flex flex-col items-center p-4 min-h-max mb-4 box-session'>
                        <p className='text-3xl'>Register </p>
                        <NavLink to="/Login" className="text-sm text-gray-600 underline mb-7">or login to account</NavLink>

                        <label htmlFor="email" className='my-2 '>
                            Name: <br />
                            <input type="text" name="name" id="name" placeholder='name' autoComplete="off" onChange={handleName} defaultValue={name} className={`outline-0 border-b-2 ${name.length > 1 ? 'border-b-green-500' : 'border-b-red-500'} `} required />
                        </label>

                        <label htmlFor="lastname" className='my-2 '>
                            Last Name: <br />
                            <input type="text" name="lastname" id="lastname" placeholder='lastname' autoComplete="off" onChange={handleLastName} defaultValue={lastname} className={`outline-0 border-b-2 ${lastname.length > 1 ? 'border-b-green-500' : 'border-b-red-500'} `} required />
                        </label>

                        <label htmlFor="email" className='my-2'>
                            Email: <br />
                            <input type="email" name="email" id="email" placeholder='name@gmail.com' onChange={handleEmail} defaultValue={email} className={`outline-0 border-b-2 ${email.length > 5 ? 'border-b-green-500' : 'border-b-red-500'} `} required />
                        </label>

                        <label htmlFor="password" className='my-2'>
                            Password: <br />
                            <input type="password" name="password" id="password" placeholder='*******' minLength="8" onChange={handlePassword} defaultValue={password} className={`outline-0 border-b-2 ${password.length >= 8 ? 'border-b-green-500' : 'border-b-red-500'} `} required />
                        </label>

                        <label htmlFor="repassword" className='my-2'>
                            Repeat Password: <br />
                            <input type="password" name="repassword" id="repassword" placeholder='*******' minLength="8" onChange={handleRePassword} defaultValue={repeatPassword} className={`outline-0 border-b-2 ${passwordsMatch ? 'border-b-green-500' : 'border-b-red-500'} `} required />
                        </label>

                        <button type="submit" className='btn w-full mt-5'>Login</button>
                    </form>
                </div>
            </div>

        );
    }
}

export default Register;