import React, { Suspense } from 'react';
import NotData from "./NotData";
import ButtonForm from "./buttons/ButtonForm";
import Item from "../components/Item";

import CardContext from "../context/CardContext";


const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();
const yearMonth = year + '-' + month;

class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            done: false,
            items: []
        });
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    dataSplit(year_month) {
        return year_month.split("-");
    }
    

    handleSubmit(e) {
        e.preventDefault();

        const fileField = document.querySelector('input[type="month"]');
        let data = this.dataSplit(fileField.value);
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
            this.setState({
                done: res['res'],
                items: res['msg'],
            });
            this.context.updateStateHistory(true);
            this.context.updateItemsList(JSON.stringify(res['msg']));
        });

    }

    render() {
        var { items, done } = this.state;
        const { itemsList } = this.context;

        
        if (!this.context.time  || this.context.idCard == 0) {
            return (
                <div className='h-97vh grid grid-rows-1/9 gap-4'>
                    <form onSubmit={this.handleSubmit} id="formData" className='px-4 flex justify-around rounded-lg bg-white shadow-md shadow-slate-500/20 items-center'>

                        <input type="month" name="month-year" id="month-year" min="2022-01" max={yearMonth} />

                        <ButtonForm name="Go" />
                    </form>

                    <div className='overflow-y-auto h-full p-2 text-sm bg-white rounded-lg shadow-md shadow-slate-500/20 first:bg-red-300'>
                        <NotData />
                    </div>
                </div>
            )
        }

        return (
            <div className='h-97vh grid grid-rows-1/9 gap-4'>
                <form onSubmit={this.handleSubmit} id="formData" className='px-4 flex justify-around rounded-lg bg-white shadow-md shadow-slate-500/20 items-center'>

                    <input type="month" name="month-year" id="month-year" min="2022-01" max={yearMonth} />

                    <ButtonForm name="Go" />
                </form>

                <div className='overflow-y-auto h-full p-2 text-sm bg-white rounded-lg shadow-md shadow-slate-500/20 first:bg-red-300'>
                    {
                        !done ? <Loading /> :  JSON.parse(itemsList).map((item) => (
                            <Item data={item} key={item.id}/>
                        ))
                    }
                </div>
            </div>

        );
    }
}

Items.contextType = CardContext;

export default Items;