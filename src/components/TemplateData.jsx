import React from 'react';
import TemplateContext from "../context/TemplateContext";
import NotData from "../components/NotData";
import { InputRowTemplate } from "../components/input/Inputs";
import { BiTransfer } from "react-icons/bi";
import ButtonForm from "../components/buttons/ButtonForm";
import { ButtonActionAbsolute } from "../components/buttons/ButtonFixed";
import { BiTrash } from "react-icons/bi";

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

class TemplateData extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      bodyTemplates: []
    });
    this.CreateTemplate = this.CreateTemplate.bind(this);

    this.SendingFormEdit = this.SendingFormEdit.bind(this);
    this.SendingFormCreate = this.SendingFormCreate.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
    this.handleAddElement = this.handleAddElement.bind(this);
    this.handleDeleteElement = this.handleDeleteElement.bind(this);
    this.ExitForm = this.ExitForm.bind(this);
    this.updateData = this.updateData.bind(this);

  }

  updateData() {
    let key = localStorage.getItem('key');

    const fetchPromise = fetch("https://financemeapi.com/api/templates", {
      'headers': {
        'Authorization': 'Bearer ' + key,
      }
    });

    fetchPromise.then(response => {
      return response.json();
    }).then(res => {
      console.log(res);
      this.setState({
        done: res['res'],
        items: res['msg']
      })
      this.context.updateTemplates(res['msg'])
    })
  }

  CreateTemplate() {
    this.context.createTemplate();
  }

  ExitForm() {
    this.context.saveUpdateTemplate();
  }

  SendingFormEdit(e) {
    e.preventDefault();
    this.context.create = false;
    let key = localStorage.getItem('key');
    var idTemplate = this.context.idTemplate;

    const fetchPromise = fetch(`https://financemeapi.com/api/template/update/${idTemplate}`, {
      method: 'POST',
      body: new FormData(e.target),
      'headers': {
        'Authorization': 'Bearer ' + key,
      }
    });

    fetchPromise.then(response => {
      return response.json();
    }).then(res => {
      if (res['res']) {
        Toast.fire({
          icon: 'success',
          title: 'Actualizando la Plantilla en tu Lista'
        });
        this.updateData();
        this.context.saveUpdateTemplate();
      } else {
        Toast.fire({
          icon: 'info',
          title: 'Recuerda llenar todos los campos'
        });
      }
    });
  }

  SendingFormCreate(e) {
    e.preventDefault();
    this.context.edit = false;
    let key = localStorage.getItem('key');

    const fetchPromise = fetch(`https://financemeapi.com/api/template/create`, {
      method: 'POST',
      body: new FormData(e.target),
      'headers': {
        'Authorization': 'Bearer ' + key,
      }
    });

    fetchPromise.then(response => {
      return response.json();
    }).then(res => {
      if (res['res']) {
        Toast.fire({
          icon: 'success',
          title: 'Plantilla Agregada a tu Lista'
        });
        this.context.saveUpdateTemplate();
        this.updateData();
      } else {
        Toast.fire({
          icon: 'info',
          title: 'Recuerda llenar todos los campos'
        });
      }

    });



  }

  handleChangeState() {
    const currentStateNameValue = document.getElementById('state');
    const currentStateIdValue = document.getElementById('states_id');

    var newStateValue = currentStateNameValue.value == 'Activo' ? ['Desactivado', 2] : ['Activo', 1];

    currentStateNameValue.value = newStateValue[0];
    currentStateIdValue.value = newStateValue[1];
  }

  handleAddElement() {
    var itemValue = document.getElementById('textItem');

    if (itemValue.value.length != 0) {
      this.context.addElementBody(itemValue.value);
      itemValue.value = '';
      this.forceUpdate();

    } else {
      Toast.fire({
        icon: 'info',
        title: 'Debes llenar el Campo'
      });
    }
  }

  handleDeleteElement(id) {
    const itemToDelete = document.getElementById(id).id;
    this.context.deleteEmenetBody(itemToDelete)
    this.forceUpdate();

  }

  render() {
    const { SendingFormEdit, handleChangeState, handleAddElement, handleDeleteElement, ExitForm, SendingFormCreate, CreateTemplate } = this;

    if (this.context.edit) {
      return (
        <div className='relative'>
          <form className='py-4' onSubmit={SendingFormEdit} id='formTemplate'>
            {this.context.dataTemplate.map((item) => (
              <div key={item.id} id={item.id}>

                <h2 className='text-center mb-4 text-lg'> Edit </h2>

                <div className='grid grid-cols-2/5/2 gap-4 w-9/12 mx-auto mb-4 '>
                  <label htmlFor="title">Titulo :</label>

                  <textarea name="title" id="title" cols="30" rows="3" className='text-ellipsis bg-gray-200 p-1 resize-none '>{item.title}</textarea>
                </div>

                <div className='grid grid-cols-2/5/2 gap-4 w-9/12 mx-auto mb-14 '>
                  <label htmlFor="title">Estado :</label>

                  <input type="text" id='state' className='bg-gray-200 p-1 text-center' defaultValue={item.state} readOnly="readonly" />

                  <input type="hidden" name='states_id' id='states_id' className='bg-gray-200 p-1 text-center' defaultValue={item.state == 'Activo' ? 1 : 2} readOnly="readonly" />

                  <div className='flex justify-center items-center text-xl relative'>
                    <p type="submit" className='absolute h-8 w-4 mr-4 cursor-pointer' id={item.id} onClick={handleChangeState}></p>
                    <div className='mr-4'>
                      <BiTransfer />
                    </div>
                  </div>
                </div>

                <div className=' w-8/12 mx-auto flex items-center my-8 bg-red-500   '>
                  <input type="text" name="newItem" id="textItem" className='w-11/12 bg-gray-200 p-1 text-center' placeholder='New Item' autoComplete="off" />
                  <p type="submit" className='cursor-pointer text-center  w-1/12 text-2xl font-semibold ' id={item.id} onClick={handleAddElement}>+</p>
                </div>

                <div className='overflow-y-auto h-72' id='asdasd'>

                  <div className='grid grid-cols-2/5/2 gap-4 w-9/12 mx-auto mb-4 text-gray-500'>
                    <label htmlFor="title">Col. :</label>

                    <div className="flex">
                      <input type="text" className='bg-gray-200 p-1 text-center' defaultValue="Monto" autoComplete="off" disabled={true} />
                      <select className=" border-none bg-none text-sm text-center" disabled={true}>
                        <option value="number" defaultChecked>Numero</option>
                      </select>
                    </div>

                    <div className='flex justify-center items-center text-xl relative'>
                      <div>
                        <p type="submit" className='absolute h-8 w-4 mr-4 cursor-pointer'></p>
                        <div className='mr-2'>
                          <BiTrash />
                        </div>
                      </div>
                    </div>
                  </div>
                  {
                    this.context.bodyTemplates.map((item, i) => (
                      <InputRowTemplate
                        key={i}
                        id={i}
                        label={i}
                        name={item}
                        value={item}
                        actionButton={handleDeleteElement}
                      />
                    ))
                  }
                </div>

                <div className='w-full  text-center' >
                  <ButtonForm name="Guardar" />
                </div>
              </div>
            ))}
          </form>
          <ButtonActionAbsolute name="Volver" customClass='right-0 top-0' actionButton={ExitForm} />
        </div>

      );
    }

    if (this.context.create) {

      return (
        <div className='relative'>
          <div>
            <form className='py-4' onSubmit={SendingFormCreate} id='formTemplate'>

              <div >

                <h2 className='text-center mb-4 text-lg'> Create </h2>

                <div className='grid grid-cols-2/5/2 gap-4 w-9/12 mx-auto mb-4 '>
                  <label htmlFor="title">Titulo :</label>

                  <textarea name="title" id="title" cols="30" rows="3" className='text-ellipsis bg-gray-200 p-1 resize-none ' placeholder='Titulo'></textarea>
                </div>

                <div className='grid grid-cols-2/5/2 gap-4 w-9/12 mx-auto mb-14 '>
                  <label htmlFor="title">Estado :</label>

                  <input type="text" id='state' className='bg-gray-200 p-1 text-center' defaultValue="Activo" readOnly="readonly" />

                  <input type="hidden" name='states_id' id='states_id' className='bg-gray-200 p-1 text-center' defaultValue="1" readOnly="readonly" />

                  <div className='flex justify-center items-center text-xl relative'>
                    <p type="submit" className='absolute h-8 w-4 mr-4 cursor-pointer' onClick={handleChangeState}></p>
                    <div className='mr-4'>
                      <BiTransfer />
                    </div>
                  </div>
                </div>

                <div className=' w-8/12 mx-auto flex items-center my-8 bg-red-500   '>
                  <input type="text" name="newItem" id="textItem" className='w-11/12 bg-gray-200 p-1 text-center' placeholder='New Item' autoComplete="off" />
                  <p type="submit" className='cursor-pointer text-center  w-1/12 text-2xl font-semibold ' onClick={handleAddElement}>+</p>
                </div>

                <div className='overflow-y-auto h-72' id='asdasd'>

                  <div className='grid grid-cols-2/5/2 gap-4 w-9/12 mx-auto mb-4 text-gray-500'>
                    <label htmlFor="title">Col. :</label>

                    <div className="flex">
                      <input type="text" className='bg-gray-200 p-1 text-center' defaultValue="Monto" autoComplete="off" disabled={true} />
                      <select className=" border-none bg-none text-sm text-center" disabled={true}>
                        <option value="number" defaultChecked>Numero</option>
                      </select>
                    </div>

                    <div className='flex justify-center items-center text-xl relative'>
                      <div>
                        <p type="submit" className='absolute h-8 w-4 mr-4 cursor-pointer'></p>
                        <div className='mr-2'>
                          <BiTrash />
                        </div>
                      </div>
                    </div>
                  </div>

                  {
                    this.context.bodyTemplates.map((item, i) => (
                      <InputRowTemplate
                        key={i}
                        id={i}
                        label={i}
                        name={item}
                        value={item}
                        actionButton={handleDeleteElement}
                      />
                    ))
                  }

                </div>

                <div className='w-full   text-center' >
                  <ButtonForm name="Guardar" />
                </div>
              </div>

            </form>
          </div>
          <ButtonActionAbsolute name="Volver" customClass='right-0 top-0' actionButton={ExitForm} />
        </div>

      );

    }

    if (this.context.dataTemplate == null) {
      return <NotData >
        <button type='submit' className='btn mt-2' onClick={CreateTemplate}>
          Crear Plantilla
        </button> </NotData>
    }

  }
}

TemplateData.contextType = TemplateContext;
export default TemplateData;