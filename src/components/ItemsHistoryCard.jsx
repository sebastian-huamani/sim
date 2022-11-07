import React, { Suspense } from 'react';
import Loading from "../components/Loading";

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
        // this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    dataSplit(year_month) {
        return year_month.split("-");
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        const fileField = document.querySelector('input[type="month"]');

        let data = this.dataSplit(fileField.value);

        let card = sessionStorage.getItem('card');
        let key = localStorage.getItem('key');

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
           
        });
    }

    render() {
        var { items, done } = this.state;

        const LazyComponent = React.lazy(() => {
            return new Promise(resolve => setTimeout(resolve, 1000)).then(
                () => import("../components/Item")
            );
        });

        return (
            <div className='h-97vh grid grid-rows-1/9 gap-4'>
                <form onSubmit={this.handleSubmit} id="formData" className='px-4 flex justify-around rounded-lg bg-white shadow-md shadow-slate-500/20'>
                    <input type="month" name="month-year" id="month-year" min="2022-01" max={yearMonth} />

                    <button type="submit">Go</button>
                </form>

                <div className='overflow-y-auto h-full p-2 text-sm bg-white rounded-lg shadow-md shadow-slate-500/20 first:bg-red-300'>

                    <Suspense fallback={<Loading />} >
                        <LazyComponent data={items} />
                    </Suspense>
                </div>
            </div>

        );
    }
}
export default Items;