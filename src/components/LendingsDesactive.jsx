import React from 'react';
import LendingsContext from "../context/LendingsContext";
import Loading from "./Loading";
import ButtonForm from './buttons/ButtonForm';
import NotData from './NotData';
import LendingsItem from "./LendingsItem";

class LendingsDesactive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listDesactive: [],
            done: false
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

        const fetchPromise = fetch("http://127.0.0.1:8000/api/lending/showAllDesactives", {
            method: 'POST',
            'headers': {
                'Authorization': 'Bearer ' + key,
            },
            body: formData
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            this.context.updateListDesactive(res['msg']);
            this.setState({
                listDesactive: res['msg'],
                done: res['res']
            })
        })
    }


    render() {
        const { done } = this.state;
        const { submitListDesactive } = this;
        const { listDesactive } = this.context;

        return (
            <div>
                <div className='overflow-y-auto h-full text-xs p-1' >

                    <form onSubmit={submitListDesactive} className='flex p-3 justify-center items-center rounded-lg bg-white shadow-md shadow-slate-500/20 text-sm' id='formTemplate'>
                        <input type="month" name="month-year" id="month-year" min="2022-01" className='mr-3' />
                        <ButtonForm name="Go" />
                    </form>

                    {!done ? <NotData /> : (listDesactive.length == 0 ?
                        <Loading />
                        :
                        listDesactive.map(item => (
                            <LendingsItem  item={item} key={item.id}/>
                        ))
                        )
                    }
                </div>
            </div>
        );
    }
}

LendingsDesactive.contextType = LendingsContext;
export default LendingsDesactive;