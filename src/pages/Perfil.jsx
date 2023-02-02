import React from 'react';
import Navbar from "../components/Navbar";
import NavTop from "../components/NavTop";
import { InputSpecial } from "../components/input/Inputs";
import ButtonForm from '../components/buttons/ButtonForm';


class Perfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      data: []
    });

    this.submitUpdateUser = this.submitUpdateUser.bind(this);
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

  render() {

    const { data } = this.state;
    const { submitUpdateUser } = this;

    return (
      <div className='md:pl-20 pl-0'>
        <Navbar />
        <NavTop />

        <div className='h-screen grid grid-cols-settings gap-4 py-8 w-4/5 m-auto'>

          <div >
            <div className='box sticky top-7'>
              <p className='w-full text-center mb-5 text-xl font-bold'> Opciones</p>
              <div className='grid gap-1 text-sm'>
                <button>Mis Datos</button>
              </div>
            </div>
          </div>

          <div>

            <div className='box-session py-5'>
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

          </div>

        </div>
      </div>

    );
  }
}
export default Perfil;