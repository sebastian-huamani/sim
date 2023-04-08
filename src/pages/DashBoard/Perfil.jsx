import React from 'react';
import { Navigate } from "react-router-dom";
import ButtonForm from '../../components/buttons/ButtonForm';
import { InputSpecial } from "../../components/input/Inputs";
import { BiUserX, BiUserCheck } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import NavTop from "../../components/NavTop";
import Navbar from "../../components/Navbar";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import PerfilDatos from '../../components/PerfilDatos';
const MySwal = withReactContent(Swal)

const Toast = MySwal.mixin({
  customClass: 'text-sm bg-none',
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', MySwal.stopTimer)
    toast.addEventListener('mouseleave', MySwal.resumeTimer)
  }
});

class Perfil extends React.Component {
  constructor(props) {
    super(props);
    this.onClickLogout = this.onClickLogout.bind(this);
  }

  onClickLogout() {
    let key = localStorage.getItem('key');
    const fetchPromise = fetch("https://financemeapi.com/api/logout", {
      method: 'POST',
      'headers': {
        'Content-Type': 'text/plain',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + key,
      }
    });

    fetchPromise.then(response => {
      return response.json();
    }).then(res => {
      this.setState({
        done: true,
      });
    });
    localStorage.clear();
    sessionStorage.clear();
  }

  render() {
    const { onClickLogout } = this;

    return (
      <div className='md:pl-20 pl-0 bg-black-scene'>
        <Navbar />
        <NavTop />
        <div className=' md:h-screen sm:grid block grid-cols-settings  gap-4 py-8 w-4/5 m-auto'>

          <div >
            <div className='box sticky top-7'>
              <p className='w-full text-center mb-5 text-xl font-bold'> Opciones</p>
              <div className='grid gap-3 text-sm'>
                <div className='flex items-center'>
                  <BsDot />
                  <a href="#Mis-Datos">Mis Datos</a>
                </div>
                <div className='flex items-center'>
                  <BsDot />
                  <a href="#Estado-De-Cuenta">Estado De Cuenta</a>
                </div>
                <div className='flex items-center md:hidden'>
                  <BsDot />
                  <a href="#Cerrar-Session">Cerrar Session</a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <PerfilDatos />

            <div className='block md:hidden box-session my-5 p-5' id='Cerrar-Session'>
              <p className='text-ellipsis text-center'>Cerrar Session En Este Dispositivo</p>
              <div className='mt-4 text-center w-full mx-auto'>
                <button type='submit' className='btn' onClick={onClickLogout}>Cerrar Session</button>
              </div>
            </div>
          </div>

        </div>
      </div>

    );
  }
}
export default Perfil;