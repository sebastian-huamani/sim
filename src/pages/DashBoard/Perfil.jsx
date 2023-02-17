import React from 'react';
import { BiUserX, BiUserCheck } from "react-icons/bi";
import ButtonForm from '../../components/buttons/ButtonForm';
import { InputSpecial } from "../../components/input/Inputs";
import Navbar from "../../components/Navbar";
import NavTop from "../../components/NavTop";

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
      data: []
    });

    this.submitUpdateUser = this.submitUpdateUser.bind(this);
    this.testsub = this.testsub.bind(this);
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

  render() {

    const { data } = this.state;
    const { submitUpdateUser, testsub } = this;

    return (
      <div className='md:pl-20 pl-0'>
        <Navbar />
        <NavTop />

        <div className=' sm:h-screen sm:grid block grid-cols-settings  gap-4 py-8 w-4/5 m-auto'>

          <div >
            <div className='box sticky top-7'>
              <p className='w-full text-center mb-5 text-xl font-bold'> Opciones</p>
              <div className='grid gap-1 text-sm text-center'>
                <a href="#my-data">Mis Datos</a>
                <a href="#verify-account">Estado De Cuenta</a>
              </div>
            </div>
          </div>

          <div>

            <div className='box-session py-5' id='my-data'>
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

            <div className='box-session my-5 p-5' id='verify-account'>

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

          </div>

        </div>
      </div>

    );
  }
}
export default Perfil;