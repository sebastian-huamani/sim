import React from 'react';
import { GrClose } from "react-icons/gr";
import { InputRowItem } from "./input/Inputs";
import ButtonForm from "./buttons/ButtonForm";
import CardContext from "../context/CardContext";
import Budges from './buges';
import { BsInfoCircleFill } from "react-icons/bs";


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
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

function dateToDay() {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    if(month < 10){
        return year + '-0' + month + '-' +  '01' ;
    }
    return year + month + '-' + '01';
}

console.log(dateToDay());

class FormCreateItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = ({
			templates: [],
			templateSelected: [],
			idTemplateSelected: null,
			titleTemplateSelected: '',
			toggleClassFormItem: 'hidden',
			prestamo : false,
			cuota : false,
			especial : true,
			selectDayEspecial : false,
			text : '',
		});

		this.handleSelectedForm = this.handleSelectedForm.bind(this);
		this.handleCloseForm = this.handleCloseForm.bind(this);
		this.SendingFormCreate = this.SendingFormCreate.bind(this);
		this.updateCardsList = this.updateCardsList.bind(this);
		this.showPanerCuota = this.showPanerCuota.bind(this);
		this.showPanerPrestamo = this.showPanerPrestamo.bind(this);
		this.onChangeSelected = this.onChangeSelected.bind(this);
	}

	componentDidMount() {
		let key = localStorage.getItem('key');

		const fetchPromise = fetch("https://financemeapi.com/api/templates", {
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

	handleSelectedForm(e) {
		e.preventDefault();
		var idSelected = templatesId.value;

		if (this.state.templates != null) {
			this.state.templates.map((template) => {
				if (template.id == idSelected) {
					this.setState({
						templateSelected: JSON.parse([template.body]),
						idTemplateSelected: template.id,
						titleTemplateSelected: template.title,
						toggleClassFormItem: 'block'
					});
				}
			});
		}
	}

	handleCloseForm() {
		this.props.actionButton();
		this.setState({
			templateSelected: [],
			idTemplateSelected: null,
			toggleClassFormItem: 'hidden'
		});
		document.getElementById('formCreateItem').reset();
		document.getElementById('boxSelectTemplate').reset();
	}

	updateCardsList() {
		let key = localStorage.getItem('key');

		const fetchPromise = fetch("https://financemeapi.com/api/cards", {
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

	SendingFormCreate(e) {
		e.preventDefault();

		let key = localStorage.getItem('key');

		const fetchPromise = fetch(`https://financemeapi.com/api/card/transaction/create`, {
			method: 'POST',
			body: new FormData(e.target),
			'headers': {
				'Authorization': 'Bearer ' + key,
			}
		});

		fetchPromise.then(response => {
			return response.json();
		}).then(res => {
			Toast.fire({
				icon: 'success',
				title: res['msg']
			});
			document.getElementById('formCreateItem').reset();
			this.updateCardsList();
		}).catch(error => {
			Toast.fire({
				icon: 'info',
				title: 'Transaccion No Realizada'
			});
		});


	}
	
	showPanerCuota(){
		this.setState({
			cuota : !this.state.cuota,
			selectDayEspecial : false,
			text : 'selecciona una opcion y mira su descripcion aqui	'
		});
	}

	showPanerPrestamo(){
		this.setState({
			prestamo : !this.state.prestamo,
		});
	}

	onChangeSelected(e){
		console.log('test', e.target.value);
		if(e.target.value == 3){
			this.setState({
				selectDayEspecial : true
			});
		} else if(e.target.value == 2){
			this.setState({
				selectDayEspecial : false,
				text : 'La fecha de pago sera realizaran el primer dia de cada mes, iniciando el mes que viene'
			});
		} else if(e.target.value == 1){
			this.setState({
				selectDayEspecial : false,
				text : 'La fecha de pago sera realizaran el ultimo dia de cada mes, iniciando el mes que viene'
			});
		} else {
			this.setState({
				selectDayEspecial : false,
			});
		}

	}

	render() {
		const { showPanerCuota, showPanerPrestamo, onChangeSelected } = this;
		const { idCard } = this.props;
		const { templates, templateSelected, toggleClassFormItem, idTemplateSelected, titleTemplateSelected, prestamo, cuota, especial, selectDayEspecial, text } = this.state;

		const options = templates.map((item) => (
			<option value={item.id} key={item.id}>{item.title}</option>
		));


		return (
			<div className='overflow-y-auto h-full '>

				<div className='fixed top-3 z-20'>
					<button type="submit" className='absolute h-8 w-4 ' onClick={this.handleCloseForm} ></button>
					<div >
						<GrClose />
					</div>
				</div>

				<form id="boxSelectTemplate" className='w-auto mx-auto mb-7 text-center'>
					<p className='font-semibold text-lg'>Selecciona una Plantilla</p>

					<select className='w-11/12 mt-5 border-none text-center' id='templatesId'>
						<option defaultValue >Tus Plantillas</option>
						{options}
					</select>

					<div className='mt-6'>
						<ButtonForm name="seleccionar" actionButton={this.handleSelectedForm} />
					</div>
				</form>

				<hr />

				<form id="formCreateItem" onSubmit={this.SendingFormCreate} className={`mt-7 text-center ${toggleClassFormItem}`}>

					<p className='font-semibold text-lg sticky top-0 h-8 bg-white w-full'>Crear Nuevo Item</p>

					<input type="hidden" name='title' defaultValue={titleTemplateSelected} />
					<input type="hidden" name='template_id' defaultValue={idTemplateSelected} />
					<input type="hidden" name='cards_id' defaultValue={idCard} />

					<div className='my-4'>
						{templateSelected.map((item, i) => (
							<InputRowItem
								key={i}
								id={i}
								label={item[0]}
								name={item}
								value=""
							/>
						))}

						<div className=' w-9/12 mx-auto mb-4 text-start'>
							<label htmlFor="fecha" >Fecha de Transaccion:
								<input type="date" id='registerItem' name="register_Item" className='bg-gray-200 p-1 w-full text-center' required />
							</label>
						</div>

						<div className=' w-9/12 mx-auto mb-4 text-start'>
							<label htmlFor="title" >Monto:
								<input type="number" id='amountItem' name="amount" className='bg-gray-200 p-1 w-full text-center' step="0.01" required />
							</label>
						</div>

						<div className='flex w-9/12 mt-8 mx-auto text-start items-center justify-between'>
							<div  className='flex items-center'>Opciones: </div>
							<div className='flex items-center gap-x-3'>
								<button type='button' onClick={showPanerCuota}>
									<Budges colorSelected="bg-green-200"   colorSelectedText="text-green-900" title="Financiacion"  type="button"/>
								</button>
								<button type='button' onClick={showPanerPrestamo}>
									<Budges colorSelected="bg-indigo-200" colorSelectedText="bg-indigo-800" title="Prestamo" type="button" />
								</button>
							</div>
						</div>

						<input type="hidden" name={especial} />
						
						<hr className='w-9/12 mx-auto bg-black mt-2 mb-3'/>
						{cuota
							? 
							<div>
								<div className='w-9/12 mx-auto mb-4 text-start'>
									<label htmlFor="title" >Cuotas: </label>
									<div className='flex items-center justify-between gap-x-1'>
										<input type="number" name="fee_amount" className='bg-gray-200 p-1 w-full text-center' min="2" max="24" placeholder='Numero de Cuotas' required/>
									</div>
								</div>
								<div className='w-9/12 mx-auto mb-4 text-start'>
									<label htmlFor="title" >Fecha de Pago: </label>
									<div className='flex items-center justify-between gap-x-2'>
										<select name="type_date_payment" id="type_date_payment" className='bg-gray-200 p-1 w-full text-center' onChange={onChangeSelected}>
											<option value="-1" disabled selected>Fecha de pago</option>
											<option value="1" >Fin de mes</option>
											<option value="2" >Inicio de mes</option>
											<option value="3" >Fecha especial</option>
										</select>
										{
											selectDayEspecial 
											? <input type="date" name="date_payment_especial" className='bg-gray-200 p-1 w-full text-center' min={dateToDay()} required/> 
											: <BsInfoCircleFill title={text} />
										} 
									</div>
								</div>
							</div>
							: ''
						}

						{
							prestamo ? 
							<div className='w-9/12 mx-auto mb-4 text-start'>
								<label htmlFor="title" >Deudor: </label>
									<input type="text" name="lending" className='bg-gray-200 p-1 w-full text-center' placeholder='Deudor' required/>
							</div>
							: ''
						}

					</div>
					<div className='mt-6'>
						<ButtonForm name="Crear" />
					</div>

				</form>
			</div>

		);
	}
}
FormCreateItem.contextType = CardContext;
export default FormCreateItem;