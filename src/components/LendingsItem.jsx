import React from 'react';
import LendingsContext from "../context/LendingsContext";
import Moment from 'moment';
import { BiTrash, BiEdit } from "react-icons/bi";
import { IoCheckmarkDoneSharp, IoEye } from "react-icons/io5";
import { IoMdAlert } from "react-icons/io";


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Budges from './buges';
const MySwal = withReactContent(Swal)

const Toast = MySwal.mixin({
    customClass: 'text-sm bg-none',
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 6000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', MySwal.stopTimer)
        toast.addEventListener('mouseleave', MySwal.resumeTimer)
    }
});

class LendingsItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdited = this.handleEdited.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
        // this.updateItems = this.updateItems.bond(this);
    }


    handleDelete(e) {
        e.preventDefault();
        var idItem = e.target.id;
        let key = localStorage.getItem('key');

        const fetchPromise = fetch(`https://financemeapi.com/api/lending/delete/${idItem}`, {
            method: 'DELETE',
            'headers': {
                'Authorization': 'Bearer ' + key,
            }
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            if (res['res']) {
                this.context.deleteItemtoList(idItem);
            }
            Toast.fire({
                icon: 'info',
                title: res['msg']
            });
        })
    }

    handleEdited(e) {
        var idItem = e.target.id;
        let key = localStorage.getItem('key');
        const fetchPromise = fetch(`https://financemeapi.com/api/lending/show/${idItem}`, {
            method: 'GET',
            'headers': {
                'Authorization': 'Bearer ' + key,
            }
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            this.context.ItemEditedToList(idItem, res['msg']);
            this.context.setListCuota(res['msg'].history_quota);
        })
    }

    handleFinish(e) {
        e.preventDefault();
        let key = localStorage.getItem('key');
        var idItem = e.target.id;
        const fetchPromise = fetch(`https://financemeapi.com/api/lending/updateState/${idItem}`, {
            method: 'POST',
            'headers': {
                'Authorization': 'Bearer ' + key,
            }
        });

        fetchPromise.then(response => {
            return response.json()
        }).then(res => {
            this.context.resetDataPanel();
            this.context.stateOptions ? this.context.updateListActive() : this.updateListDesactive();
            Toast.fire({
                icon: 'success ',
                title: res['msg']
            });
        });
    }

    render() {
        const { item , isActive} = this.props;
        const { handleDelete, handleEdited, handleFinish } = this;

        if(isActive){
            return (
                <div className='odd:bg-gray-200 even:bg-none relative' id={item.id + 'TemplateBox'} key={item.id}>
                    {
                        item.finish_time
                        ?
                            <div className='absolute'>
                                <IoMdAlert className='text-red-500 rounded-full text-lg relative text-center -m-1.5' />
                            </div>
                        : ''
                    }
                    <div className='grid grid-cols-5/2/2 gap-2 w-full items-center p-2 my-1' >
    
                        <div className='w-9/12'>
                            <p>{item.title}</p>
                            <p className='text-sm'> {Moment(item.created_at).format('DD MMM. YYYY, HH:mm a')}</p>
                        </div>
    
                        <div className='flex justify-start items-center gap-2'>
                            {
                                item.type_lending.map(elem => (
                                    <Budges key={elem.title} colorSelected={elem.colorSelected} colorSelectedText={elem.colorSelectedText} title={elem.title} type="view" />
                                ))
                            }
                        </div>
    
                        <div className='flex justify-center'>
                            <Budges title={`S/. ${item.amount}`} />
                        </div>
    
                        <div className='flex justify-center items-center gap-2'>
                            <p>Banck: </p>
                            <Budges title={item.bank} />
                        </div>
    
                        <div className='flex justify-end text-xl relative'>
                            <div>
                                <button type="submit" className='absolute h-8 w-4 mr-4' id={item.lending_id} onClick={handleEdited} title="Editar Item"></button>
                                <div className='mr-4'>
                                    <BiEdit />
                                </div>
                            </div>
    
                            <div>
                                <button type="submit" className='absolute h-8 w-4 mr-4' id={item.lending_id} onClick={handleDelete} title="Borrar Item"></button>
                                <div className='mr-2'>
                                    <BiTrash />
                                </div>
                            </div>
    
                            <div>
                                <button type="submit" className='absolute h-8 w-4 mr-4' id={item.lending_id} onClick={handleFinish} title="Finalizar Item"></button>
                                <div className='mr-2'>
                                    <IoCheckmarkDoneSharp />
                                </div>
                            </div>
    
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className='odd:bg-gray-200 even:bg-none' id={item.id + 'TemplateBox'} key={item.id}>
                <div className='grid grid-cols-5/2/2 gap-2 w-full items-center p-2 my-1' >

                    <div className='w-9/12'>
                        <p>{item.title}</p>
                        <p className='text-sm'> {Moment(item.created_at).format('DD MMM. YYYY, HH:mm a')}</p>
                    </div>

                    <div className='flex justify-start items-center gap-2'>
                        {
                            item.type_lending.map(elem => (
                                <Budges key={elem.title} colorSelected={elem.colorSelected} colorSelectedText={elem.colorSelectedText} title={elem.title} type="view" />
                            ))
                        }
                    </div>

                    <div className='flex justify-center'>
                        <Budges title={`S/. ${item.amount}`} />
                    </div>

                    <div className='flex justify-center items-center gap-2'>
                        <p>Banck: </p>
                        <Budges title={item.bank} />
                    </div>

                    <div className='flex justify-end text-xl relative'>
                        <div>
                            <button type="submit" className='absolute h-8 w-4 mr-4' id={item.lending_id} onClick={handleEdited} title="Editar Item"></button>
                            <div className='mr-4'>
                                <IoEye />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className='absolute h-8 w-4 mr-4' id={item.lending_id} title="Borrar Item" disabled ></button>
                            <div className='mr-2'>
                                <BiTrash className='text-gray-500'/>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className='absolute h-8 w-4 mr-4' id={item.lending_id} title="Finalizar Item" disabled></button>
                            <div className='mr-2'>
                                <IoCheckmarkDoneSharp  className='text-gray-500'/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );

    }
}
LendingsItem.contextType = LendingsContext;
export default LendingsItem;