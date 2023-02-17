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
    this.state = ({
      data: [],
      done : false
    });

    this.submitUpdateUser = this.submitUpdateUser.bind(this);
    this.testsub = this.testsub.bind(this);
    this.onClickLogout = this.onClickLogout.bind(this);
  }

  componentDidMount() {
    let key = localStorage.getItem('key');

    const fetchPromise = fetch('https://financemeapi.com/api/user/infoUser', {
      method: 'GET',
      'headers': {
        'Authorization': 'Bearer ' + key,
      }
    });

    fetchPromise.then(reponse => {
      return reponse.json()
    }).then(res => {
      this.setState({
        data: res
      });
    });
  }

  submitUpdateUser(e) {
    e.preventDefault();
    let key = localStorage.getItem('key');

    const fetchPromise = fetch(`https://financemeapi.com/api/user/updateInfoUser`, {
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
    }).catch(err => {
      console.log(err);
    });
  }

  testsub() {
    Toast.fire({
      icon: 'info',
      title: 'Plantilla no Encontrada'
    });
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

    const { data, done } = this.state;
    const { submitUpdateUser, testsub, onClickLogout } = this;

    if (done) {
        return <Navigate to={"/Login"} />
    }

    return (
      <div className='md:pl-20 pl-0 '>
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
                    <button type='submit' className='btn' disabled={false} onClick={testsub}>Cuenta Sin Verificar</button>
                  </div>
                  :
                  <div className='text-center'>
                    <BiUserCheck className='text-8xl flex justify-center w-full' />
                    <button type='submit' className='btn' disabled={true}>Cuenta Verificada</button>
                  </div>

                }
              </div>

            </div>

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