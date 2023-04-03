import React, { Suspense } from 'react';
import NotData from "./NotData";
import ButtonForm from "./buttons/ButtonForm";
import Item from "../components/Item";
import Moment from 'moment';
import CardContext from "../context/CardContext";
import Decimal from 'decimal.js-light';

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

function dateNow() {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    if(month < 10){
        return year + '-0' + month;
    }
    return year + '-' + month;
}

class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            done: false,
            items: []
        });
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dataChart = this.dataChart.bind(this);
    }

    dataSplit(year_month) {
        return year_month.split("-");
    }

    dataChart(data) {

        var seriesArr = [];
        var OptionsArr = [];
        var lastDay;
        
        data.map((item) => {

            lastDay = Moment(item.created_at).format("MM-DD-YYYY");
            var lastItem = OptionsArr[ OptionsArr.length - 1];

            if (lastItem == lastDay) {

                var sumDays = new Decimal(item.amount).plus(seriesArr[ seriesArr.length - 1]);
                seriesArr[seriesArr.length -1] = sumDays;
            } else {

                seriesArr.push(item.amount);
                OptionsArr.push(Moment(item.created_at).format("MM-DD-YYYY"));
            }
        });

        this.context.updateStateHistory(true);
        this.context.updateItemsList(JSON.stringify(data), seriesArr, OptionsArr );
    }


    handleSubmit(e) {
        e.preventDefault();

        const dateText = document.querySelector('input[type="month"]');
        let data = this.dataSplit(dateText.value);
        let card = sessionStorage.getItem('card');
        let key = localStorage.getItem('key');
        const formData = new FormData();

        formData.append('id_card', card);
        formData.append('year', data[0]);
        formData.append('month', data[1]);


        const fetchPromise = fetch("https://financemeapi.com/api/card/transactions", {
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
            this.dataChart(res['msg']);
        }).catch(error => {
            Toast.fire({
                icon: 'info',
                title: 'Selecciona una Tarjeta'
            });
        });

    }

    render() {
        var { items, done } = this.state;
        const { itemsList } = this.context;

        if (!this.context.time || this.context.idCard == 0) {
            return (
                <div className='h-97vh grid grid-rows-1/9 gap-4'>
                    <form onSubmit={this.handleSubmit} id="formData" className='px-4 flex justify-around rounded-lg bg-white shadow-md shadow-slate-500/20 items-center'>

                        <input type="month" name="month-year" id="month-year" min="2022-01" max={dateNow()} />

                        <ButtonForm name="Go" />
                    </form>

                    <div className='overflow-y-auto h-full p-2 text-sm bg-white rounded-lg shadow-md shadow-slate-500/20 first:bg-red-300'>
                        <NotData />
                    </div>
                </div>
            )
        }

        return (
            <div className='h-108 sm:h-97vh grid grid-rows-1/9 gap-4'>
                <form onSubmit={this.handleSubmit} id="formData" className='px-4 flex justify-around rounded-lg bg-white shadow-md shadow-slate-500/20 items-center'>

                    <input type="month" name="month-year" id="month-year" min="2022-01" max={dateNow()} />

                    <ButtonForm name="Go" />
                </form>

                <div className='overflow-y-auto h-full p-2 text-sm bg-white rounded-lg shadow-md shadow-slate-500/20 first:bg-red-300 '>
                    {
                        !done ? <Loading /> : JSON.parse(itemsList).map((item) => (
                            <Item data={item} key={item.id} />
                        ))
                    }
                </div>
            </div>

        );
    }
}

Items.contextType = CardContext;

export default Items;