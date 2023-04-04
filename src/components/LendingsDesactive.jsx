import React from 'react';
import LendingsContext from "../context/LendingsContext";
import Loading from "./Loading";
import ButtonForm from './buttons/ButtonForm';
import NotData from './NotData';
import LendingsItem from "./LendingsItem";
import Error from './Error';

class LendingsDesactive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            res: false,
            loading: true,
            data: [],
            error: false
        }
        this.submitListDesactive = this.submitListDesactive.bind(this);
    }

    dataSplit(year_month) {
        return year_month.split("-");
    }

    submitListDesactive(e) {
        e.preventDefault();
        let key = localStorage.getItem('key');

        const dateText = document.querySelector('input[type="month"]')
        let data = this.dataSplit(dateText.value);
        const formData = new FormData();
        formData.append('year', data[0]);
        formData.append('month', data[1]);

        fetch("https://financemeapi.com/api/lending/desactives", {
            method: 'POST',
            'headers': {
                'Authorization': 'Bearer ' + key,
            },
            body: formData
        }, [])
            .then(response => response.json())
            .then(res => {
                if(res['data'] !== null){
                    this.context.updateListDesactive(res['msg']);
                } else {
                    this.context.updateListDesactive([]);
                }

                this.setState({
                    res: res['res'],
                    loading: res['res'] ? false : true,
                    error: res['res'] ? false : true,
                    data: res['msg'],
                })
            })
    }


    render() {
        const { res, loading, error, data } = this.state;
        const { submitListDesactive } = this;
        const { listDesactive } = this.context;


        if (error) {
            return (
                <div>
                    <div className='overflow-y-auto h-full text-xs p-1' >

                        <form onSubmit={submitListDesactive} className='flex p-3 justify-center items-center rounded-lg bg-white shadow-md shadow-slate-500/20 text-sm' id='formTemplate'>
                            <input type="month" name="month-year" id="month-year" min="2022-01" className='mr-3' />
                            <ButtonForm name="Go" />
                        </form>

                        <Error />
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className='overflow-y-auto h-full text-xs p-1' >

                    <form onSubmit={submitListDesactive} className='flex p-3 justify-center items-center rounded-lg bg-white shadow-md shadow-slate-500/20 text-sm' id='formTemplate'>
                        <input type="month" name="month-year" id="month-year" min="2022-01" className='mr-3' />
                        <ButtonForm name="Go" />
                    </form>

                    { listDesactive.length < 1 ?
                        <NotData />
                        :
                        listDesactive.map(item => (
                            <LendingsItem item={item} key={item.id} />
                        ))
                    
                    }
                </div>
            </div>
        );
    }
}

LendingsDesactive.contextType = LendingsContext;
export default LendingsDesactive;