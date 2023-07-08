import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { IoAddCircleSharp } from "react-icons/io5";
import { IoReloadCircle } from "react-icons/io5";
import { HiCheckCircle } from "react-icons/hi2";
import LendingsContext from "../context/LendingsContext";
import { MdDeleteForever } from "react-icons/md";
import moment from 'moment';
const list = [
    { value : 4, name : 'Pagado'},
    { value : 3, name : 'Pendiente'},
    { value : 5, name : 'No Pagado'},
]

class CuotasLending extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            state: false,
            list: [],
        }
        this.validateEmpty = this.validateEmpty.bind(this);
        this.setList = this.setList.bind(this);
        this.avgCuota = this.avgCuota.bind(this);
        this.addCuotatest = this.addCuotatest.bind(this);
        this.deleteCuotatest = this.deleteCuotatest.bind(this);
    }

    validateEmpty(currentItem) {
        var options = list.map((item) => (
            item.value == currentItem 
            ? <option value={item.value} key={item.value} selected> {item.name}  </option>
            : <option value={item.value} key={item.value}> {item.name}  </option>
		));
        return options;
    }
   
    setList(list) {
        this.setState({
            list: list
        });
    }

    avgCuota(list, amount) {
        var sizeList = list.length;
        return (amount / sizeList).toFixed(2)
    }

    addCuotatest(){
        this.context.listQuota.push([this.context.listQuota.length, "", "", "3"]);
        this.forceUpdate();
    }
    
    deleteCuotatest(id){
        this.context.deleteListQuota(id);
        this.forceUpdate();
    }

    render() {
        const { avgCuota, validateEmpty, addCuotatest, deleteCuotatest} = this;
        const { listQuota} = this.context;

        if(listQuota.length == 0){
            return ;
        }

        return (
            <div className='mx-6 mt-3 h-full'>
                <div className='flex justify-between items-center pr-2'>
                    <p className='text-lg'>Financiamento:</p>
                     <button type="button" className='text-2xl' onClick={addCuotatest}> +</button>
                </div>

                <div className='overflow-x-scroll h-50vh mt-5'>
                    {listQuota.map((elem, i) => (
                        <div className='grid grid-cols-template-data items-center gap-2 w-full mx-auto mb-5' key={elem[0]}>
                            <p className=''>Cuota {i + 1} :</p>

                            <div className="flex justify-center">
                                <input type="text" name='amountxMonth[]' className='w-5/12 bg-gray-200 p-1 text-center' defaultValue={elem[1]} key={elem.key} autoComplete="off" />
                                <input type="date" name='date_pay[]' className='p-1 w-5/12' defaultValue={moment(elem[2]).format('YYYY-MM-DD')} />
                            </div>

                            <div className='flex justify-center items-center text-sm'>
                                <select name='type_state_payment[]' id="type_state_payment" >
                                    {validateEmpty(elem[3]) }
                                </select>
                            </div>
                            <p onClick={() => deleteCuotatest(elem[0])} className='cursor-pointer text-xl ml-2' > <MdDeleteForever /> </p>
                        </div>
                    ))}
                </div>
            </div>
        );

    }
}


CuotasLending.contextType =  LendingsContext;
export default CuotasLending;