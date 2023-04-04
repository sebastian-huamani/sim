import React from 'react';
import { NavLink } from "react-router-dom";
import { ImArrowRight2 } from "react-icons/im";
import Error from './Error';

class PanelLending extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            res: false,
            loading: true,
            data: [],
            error: false
        }
    }

    componentDidMount() {
        let key = localStorage.getItem('key');
        fetch('https://financemeapi.com/api/lendings', {
            method: 'GET',
            'headers': {
                'Authorization': 'Bearer ' + key,
                'Content-Type': 'text/plain',
                'Accept': 'application/json',
            }
        }, [])
            .then(response => response.json())
            .then(res => {
                this.setState({
                    res: res['res'],
                    loading: res['res'] ? false : true,
                    error: res['res'] ? false : true,
                    data: res['msg'],
                });
            });
    }

    render() {
        const { data, error, loading, res } = this.state;

        if (error) {
            return (
                <div className='box'>
                    <div className='flex justify-center items-center h-full text-7xl opacity-30'>
                        <Error />
                    </div>
                </div>
            )
        }

        if (loading) {
            return (
                <div className='box'>
                    <div className='flex justify-between items-center animate-pulse'>
                        <p className='bg-slate-200 rounded h-5 w-1/5 mb-1'></p>
                        <NavLink to="/Dashboard/Prestamos" >
                            <ImArrowRight2 className='text-lg mr-1 cursor-pointer ' />
                        </NavLink>
                    </div>
                    <ul className=''>
                        <li className='text-xs mt-1 p-1 flex justify-between items-center border-b'>
                            <div className='bg-slate-200 rounded h-4 w-1/5'>  </div>
                            <div className='bg-slate-200 rounded h-4 w-1/5'>  </div>
                            <div className='bg-slate-200 rounded h-4 w-1/5'>  </div>
                        </li>
                        <div className='overflow-x-hidden h-52'>
                            <li className='bg-slate-200 rounded h-5 w-full my-2'></li>
                            <li className='bg-slate-200 rounded h-5 w-full my-2'></li>
                            <li className='bg-slate-200 rounded h-5 w-full my-2'></li>
                            <li className='bg-slate-200 rounded h-5 w-full my-2'></li>
                            <li className='bg-slate-200 rounded h-5 w-full my-2'></li>
                            <li className='bg-slate-200 rounded h-5 w-full my-2'></li>
                        </div>
                    </ul>
                </div>
            )
        }

        return (
            <div className='box'>
                <div className='flex justify-between items-center'>
                    <p className='font-semibold'>Prestamos</p>
                    <NavLink to="/Dashboard/Prestamos" >
                        <ImArrowRight2 className='text-lg mr-1 cursor-pointer ' />
                    </NavLink>
                </div>
                <ul className=''>
                    <li className='text-xs mt-1 p-1 flex justify-between items-center border-b'>
                        <div> User </div>
                        <div> Monto </div>
                        <div> Estado </div>
                    </li>
                    <div className='overflow-x-hidden h-52'>
                        {
                            data.map(item => (
                                <li className='text-xs mt-1 p-1 flex justify-between items-center border-b'>
                                    <div className='w-5 text-ellipsis'> {item.debtor} </div>
                                    <div> S/. {item.amount} </div>
                                    <div> {item.name} </div>
                                </li>
                            ))
                        }
                    </div>
                </ul>
            </div>
        );
    }
}
export default PanelLending;