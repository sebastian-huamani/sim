import React from 'react';
import Navbar from "../../components/Navbar";
import NavTop from "../../components/NavTop";
import ButtonForm from "../../components/buttons/ButtonForm";
import { InputSimple } from "../../components/input/Inputs";

class Transaccion extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            templates: [],
            templateSelected: []
        });
        this.handleClickTemplate = this.handleClickTemplate.bind(this);
    }

    handleClickTemplate() {
        var idSelected = templatesId.value;

        if (this.state.templates != null) {
            this.state.templates.map((item) => {
                if (item.id == idSelected) {
                    this.setState({
                        templateSelected: item
                    });
                }
            });
        }
        this.forceUpdate();

    }

    componentDidMount() {
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
                templates: res['msg']
            });
        })
    }

    render() {

        const { templates, templateSelected } = this.state;
        const { handleClickTemplate } = this;

        const options = templates.map((item) => (
            <option value={item.id} key={item.id}>{item.title}</option>
        ));

        return (
            <div className='md:pl-20 pl-0'>
                <Navbar />
                <NavTop />
                <div className='grid grid-cols-settings gap-4 py-8 w-4/5 m-auto h-screen'>

                    <div>
                        <div className='box sticky top-7 text-center'>
                            <p className='w-full text-center mb-3 text-xl font-bold'> Configuracion </p>
                            <select className='w-11/12 mt-5 border-none' id='templatesId'>
                                <option defaultValue >Selecciona El tipo de Transaccion</option>
                                {options}
                            </select>
                            <div className='mt-6'>
                                <ButtonForm name="seleccionar" actionButton={handleClickTemplate} />
                            </div>
                        </div>
                    </div>

                    <div >
                        <div className='box-session mb-5 p-6' id='delete'>
                            <h1 className='text-center font-bold text-2xl'>Nueva Transaccion</h1>
                            {
                                [templateSelected].map((item) => (
                                    <InputSimple 
                                        key={item}
                                        name={item}
                                    />
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Transaccion;