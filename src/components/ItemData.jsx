import React from 'react';
import CardContext from "../context/CardContext";
import NotData from "./NotData";
import { ButtonActionAbsolute } from "./buttons/ButtonFixed";
import FormCreateItem from "./FormCreateItem";

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
            componentVisible: "hidden"
        });
        this.processJson = this.processJson.bind(this);
        this.showFormCreateItem = this.showFormCreateItem.bind(this);
        this.hiddenFormCreateItem = this.hiddenFormCreateItem.bind(this);
    }

    processJson(dataJson) {
        var data = JSON.parse(dataJson);
        var dataBody = null;
        for (const [key, value] of Object.entries(data)) {
            dataBody += <p> `${key}: ${value}` </p>;
        }
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

    render() {
        const { componentVisible } = this.state;
        const { idCard } = this.context;

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
                    <div className='text-center mb-6'>
                        <p className='font-semibold text-base'>{item.type_title_transaction}</p>
                        <p className='text-xs'>Numero de Operacion: 123.3246.123.12</p>
                    </div>
                    <div>
                        <ul>
                            {item.body.map((item) => (
                                <li className='my-1.5'> {item[0]} : {item[1]} </li>
                            ))
                            }
                            <li className='my-1.5'>Monto : {item.amount} </li>
                        </ul>
                    </div>
                    <div>
                        <p>{item.id}</p>
                    </div>
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
                <div className='h-4'>
                    <ButtonActionAbsolute
                        // name="Crear Item"
                        customClass="bottom-2 right-2"
                        actionButton={this.showFormCreateItem}
                    />
                </div>

                {data}

                <div className={`h-screen fixed w-108 z-10 top-0 right-0 bg-white shadow-lg p-5 ${componentVisible}`}>

                    <FormCreateItem actionButton={this.hiddenFormCreateItem}   idCard={idCard}/>
                </div>

            </div>
        );
    }
}

ItemData.contextType = CardContext;
export default ItemData;