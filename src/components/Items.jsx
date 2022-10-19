import React from 'react';

class Items extends React.Component {
    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     const fetchPromise = fetch("http://127.0.0.1:8000/api/card/showAll", {
    //         // 'mode': 'cors',
    //         'headers': {
    //             // 'Content-Type': 'text/plain',
    //             // 'Accept': 'application/json',
    //             'Authorization': 'Bearer 40|bYhorsBc113LKwyJqnBhUfBV4LNWUnCJ1VCu5zYl',
    //         }
    //     });

    //     fetchPromise.then(response => {
    //         return response.json();
    //     }).then(res => {
    //         this.setState({
    //             items: res['msg'],
    //             done: res['res']
    //         });

    //     });
    // }
    

    render() {
        return (

            <div className='h-90vh bg-white rounded-lg shadow-md shadow-slate-500/20 text-xs '>

                <div className='p-4 flex justify-end text-center'>
                    <select name="" id="">
                        <option value="">Enero</option>
                        <option value="">Febrero</option>
                        <option value="">Marzo</option>
                        <option value="">Abril</option>
                        <option value="">Mayo</option>
                        <option value="">Junio</option>
                        <option value="">Julio</option>
                        <option value="">Agosto</option>
                    </select>

                    <select name="" id="">
                        <option value="">2022</option>
                        <option value="">2023</option>
                        <option value="">2024</option>
                        <option value="">2025</option>
                        <option value="">2026</option>
                        <option value="">2027</option>
                    </select>

                    <button type="submit">Go</button>
                </div>


                <div className='overflow-y-auto h-full  bg-white rounded-lg shadow-md shadow-slate-500/20'>
                a
                </div>

            </div>

        );
    }
}
export default Items;