import moment from 'moment';
import React from 'react';
import { GrClose } from 'react-icons/gr';
import ButtonForm from './buttons/ButtonForm';
import { InputSpecial } from './input/Inputs';
import LendingsContext from "../context/LendingsContext";


class FormCreateLending extends React.Component {
  constructor(props) {
    super(props);
    this.submitUpdate = this.submitUpdate.bind(this);
    this.updateListDesactive = this.updateListDesactive.bind(this);
    this.updateListActive = this.updateListActive.bind(this);
  }

  updateListDesactive() {
    let key = localStorage.getItem('key');

    const dateText = document.querySelector('input[type="month"]')
    let data = this.dataSplit(dateText.value);
    const formData = new FormData();
    formData.append('year', data[0]);
    formData.append('month', data[1]);

    const fetchPromise = fetch("https://financemeapi.com/api/lending/desactives", {
      method: 'POST',
      'headers': {
        'Authorization': 'Bearer ' + key,
      },
      body: formData
    });

    fetchPromise.then(response => {
      return response.json();
    }).then(res => {
      this.context.updateListDesactive(res['msg']);
    }).catch(error => {
      console.log('error');
    });
  }

  updateListActive() {
    let key = localStorage.getItem('key');

    const fetchPromise = fetch("https://financemeapi.com/api/lending/actives", {
      'headers': {
        'Authorization': 'Bearer ' + key,
      }
    });

    fetchPromise.then(response => {
      return response.json();
    }).then(res => {
      this.context.updateListActive(res['msg']);
    }).catch(error => {
      console.log('error');
    });
  }

  submitUpdate(e) {
    e.preventDefault();
    let key = localStorage.getItem('key');

    const fetchPromise = fetch(`https://financemeapi.com/api/lending/edit`, {
      method: 'POST',
      body: new FormData(e.target),
      'headers': {
        'Authorization': 'Bearer ' + key,
      }
    });

    fetchPromise.then(response => {
      return response.json()
    }).then(res => {
      if ( res['res']  && this.context.stateOptions ) {
        this.updateListActive();
      }
      if ( res['res'] && !this.context.stateOptions){
        this.updateListDesactive();
      }
    });


  }

  render() {
    const { submitUpdate } = this;
    const { vision, closePanel, data } = this.props;

    return (
      <div className={`fixed right-0 top-0 bg-white shadow-lg p-5 z-10 h-screen w-108 ${vision}`}>
        <div className='fixed top-3' >
          <GrClose onClick={closePanel} className="cursor-pointer" />
        </div>

        <div className='h-70vh mt-20'>
          <p className='text-center text-lg font-semibold'> Aplazar Prestamo </p>
          <form className='mt-10' onSubmit={submitUpdate}>
            <input type="hidden" name="id" defaultValue={data == null ? '' : data.id} />
            <InputSpecial type="text" name="debtor" label="Deudor" value={data == null ? '' : data.debtor} placeholder="deudor" />
            <InputSpecial type="text" name="amount" label="Monto" value={data == null ? '' : data.amount} placeholder="S/ 0.00" />
            <InputSpecial type="date" name="payment_date" label="Fecha de Pago" placeholder={moment().format('YYYY-MM-DD')} />
            <div className='text-center'>
              <ButtonForm name="Crear" />
            </div>
          </form>
        </div>

      </div>
    );
  }
}

FormCreateLending.contextType = LendingsContext;
export default FormCreateLending;