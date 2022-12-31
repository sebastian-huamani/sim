import React from 'react';
import { BiTrash, BiEdit } from "react-icons/bi";
import TemplateContext from "../context/TemplateContext";

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

class TemplateItem extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClickTrash = this.handleClickTrash.bind(this);
        this.updateData = this.updateData.bind(this);
    }
    

    updateData() {
        let key = localStorage.getItem('key');

        const fetchPromise = fetch("http://127.0.0.1:8000/api/template/showAll", {
            'headers': {
                'Authorization': 'Bearer ' + key,
            }
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            this.setState({
                done: res['res'],
                items: res['msg']
            })
            this.context.updateTemplates(res['msg'])
        })
    }

    handleClickEdit(e) {
        var idTemplate = e.target.id
        var templates = this.context.listTemplates;

        var templateSelected;

        templates.map((item) => {
            if (item.id == idTemplate) {
                templateSelected = item;
            }
        });
        this.context.selectedTemplateEdit([templateSelected], idTemplate);

    }

    handleClickTrash(e) {
        var idTemplate = e.target.id
        let key = localStorage.getItem('key');

        const fetchPromise = fetch(`http://127.0.0.1:8000/api/template/delete/${idTemplate}`, {
            method: 'DELETE',
            'headers': {
                'Authorization': 'Bearer ' + key,
            }
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            console.log(res);
            if ( res['res'] ) {
                Toast.fire({
                    icon: 'success',
                    title: 'Eliminando la Plantilla de tu Lista'
                });    
                this.context.saveUpdateTemplate();
                

            } else {
                Toast.fire({
                    icon: 'info',
                    title: 'Plantilla no Encontrada'
                });
            }
        })
        this.updateData();
    }

    render() {
        let { handleClickEdit, handleClickTrash } = this;

        return (
            <div className='odd:bg-gray-200 even:bg-none ' id={this.props.id + 'TemplateBox'}>
                <div className='grid grid-cols-5/2/2 gap-2 w-full items-center p-2 my-1' key={this.props.id}>
                
                <div className='w-11/12'>
                    <p>{this.props.title}</p>
                    <p className='text-sm'>{this.props.created_at}</p>
                </div>

                <div className='flex justify-center'>
                    <p className='w-min rounded-full px-3 font-semibold'>{this.props.state}</p>
                </div>

                <div className='flex justify-end text-xl relative'>
                    <div>
                        <button type="submit" className='absolute h-8 w-4 mr-4' onClick={handleClickEdit} id={this.props.id}></button>
                        <div className='mr-4'>
                            <BiEdit />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className='absolute h-8 w-4 mr-4' onClick={handleClickTrash} id={this.props.id}></button>
                        <div className='mr-2'>
                            <BiTrash />
                        </div>
                    </div>

                </div>
            </div>
            </div>
        );
    }
}

TemplateItem.contextType = TemplateContext;
export default TemplateItem;