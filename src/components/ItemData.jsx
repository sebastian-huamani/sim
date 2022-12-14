import React from 'react';
import CardContext from "../context/CardContext";
import NotData from "./NotData";
import { InputLine } from "./input/Inputs";
import FormCreateItem from "./FormCreateItem";
import { FaRegEdit, FaPlus } from "react-icons/fa";
import ButtonForm from "./buttons/ButtonForm";


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


class ItemData extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            componentVisible: "hidden",
            aviableButon : "hidden"
        });
        this.showFormCreateItem = this.showFormCreateItem.bind(this);
        this.hiddenFormCreateItem = this.hiddenFormCreateItem.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.updateCards = this.updateCards.bind(this);
        this.updateHistory = this.updateHistory.bind(this);
        this.showEdited = this.showEdited.bind(this);
    }


    updateCards() {
        let key = localStorage.getItem('key');

        const fetchPromise = fetch("http://127.0.0.1:8000/api/card/showAll", {
            'headers': {
                'Authorization': 'Bearer ' + key,
            }
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            
            this.context.updateCardsList(res['msg']);
        });
    }

    updateHistory() {

        const fileField = document.querySelector('input[type="month"]');
        let data = fileField.value.split("-");
        let card = sessionStorage.getItem('card');
        let key = localStorage.getItem('key');
        const formData = new FormData();

        formData.append('id_card', card);
        formData.append('year', data[0]);
        formData.append('month', data[1]);


        const fetchPromise = fetch("http://127.0.0.1:8000/api/transaction/count/showAllItemsCount", {
            method: 'POST',
            'headers': {
                'Authorization': 'Bearer ' + key,
            },
            body: formData,
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            this.context.updateStateHistory(true);
            this.context.updateItemsList(JSON.stringify(res['msg']));
        });

    }

    showFormCreateItem() {
        try {
            if (this.context.idCard <= 0) {
                throw "error";
            }

            this.setState({ componentVisible: "block" });

        } catch (error) {
            Toast.fire({
                icon: 'info',
                title: 'Selecciona una Tarjeta'
            });
        }
    }

    hiddenFormCreateItem() {
        this.setState({ componentVisible: "hidden" });
        // document.getElementById('formCardCreate').reset();
    }

    validateTypeValue(value) {
        var newValuer = parseFloat(value);

        if (isNaN(newValuer)) {
            return "text";
        }

        return "number";
    }

    handleSubmitForm(e) {
        e.preventDefault();
        let key = localStorage.getItem('key');

        const fetchPromise = fetch("http://127.0.0.1:8000/api/transaction/count/update", {
            method: 'POST',
            body: new FormData(e.target),
            'headers': {
                'Authorization': 'Bearer ' + key,
            }
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            this.updateCards();
            this.updateHistory();
            console.log(res);
        }).catch(error => {
            console.log(error);
        });
    }

    showEdited(){
        this.context.updateChangeState();
        this.setState({aviableButon : 'block' });
    }

    render() {
        const { idCard, disableInputItemEdited } = this.context;
        const { componentVisible, aviableButon } = this.state;
        const { handleSubmitForm, showEdited } = this;

        let items = JSON.parse(this.context.itemsList);
        var idItem = this.context.idItemSelected;
        let itemselected;

        if (items != null) {
            items.map((item) => {
                if (item.id == idItem) {
                    itemselected = item;
                }
            });
        }

        if (itemselected != null) {
            var data = [itemselected].map((item) => (
                <div className='text-ellipsis overflow-y-auto h-full text-sm' key={item.id}>

                    <div className='absolute w-full text-end px-8 text-lg'>
                        <button className='relative top-1.5' onClick={showEdited}>
                            <FaRegEdit />
                        </button>
                    </div>

                    <div className='text-center mb-6 mt-4'>
                        <p className='font-semibold text-base'>{item.title}</p>
                        <p className='text-xs'>Numero de Operacion: 123.3246.123.12</p>
                    </div>
                    <form id="editItemOfCount" onSubmit={handleSubmitForm} className='w-4/6 mx-auto mt-10'>

                        <input type="hidden" name="idCard" defaultValue={idCard} />
                        <input type="hidden" name="idItem" defaultValue={item.id} />

                        {item.body.map((item) => (


                            <InputLine
                                key={item[0]}
                                label={item[0]}
                                type={this.validateTypeValue(item[1])}
                                name={item[0]}
                                placeholder={item[1]}
                                value={item[1]}
                                disabled={disableInputItemEdited}
                            />

                        ))}

                        <div className='my-5 flex justify-between'>
                            <label className='mr-4' > Monto : </label>
                            <input type="number" name="amount" placeholder={item.amount} className='text-center font-normal border-b-2' defaultValue={item.amount} step="0.01" autoComplete="off" disabled={disableInputItemEdited} />
                        </div>


                        <div className={`mt-6 text-center ${aviableButon}`}>
                            <ButtonForm name="Guardar" />
                        </div>

                    </form>
                </div>
            ));
        }

        if (itemselected == null) {
            return (
                <div>
                    <NotData >
                        <div className='mt-2' >
                            <button onClick={this.showFormCreateItem} className='btn'>
                                Crear Nuevo Item
                            </button>
                        </div>
                    </NotData>

                    <div className={`h-screen fixed w-108 z-10 top-0 right-0 bg-white shadow-lg p-5 ${componentVisible}`}>

                        <FormCreateItem actionButton={this.hiddenFormCreateItem} idCard={idCard} />

                    </div>
                </div>
            )
        }

        return (
            <div className='min-h-98 p-2 relative' >
                <div className='fixed bottom-1 right-1'>
                    <button type="submit" className="btn absolute text-lg flex items-center bottom-3 right-0 rounded-l-md " onClick={this.showFormCreateItem}>
                        <FaPlus className="mr-3" />
                    </button>
                </div>

                {data}

                <div className={`h-screen fixed w-108 z-10 top-0 right-0 bg-white shadow-lg p-5 ${componentVisible}`}>

                    <FormCreateItem actionButton={this.hiddenFormCreateItem} idCard={idCard} />
                </div>

            </div>
        );
    }
}

ItemData.contextType = CardContext;
export default ItemData;