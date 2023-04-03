import React from 'react';
import { NavLink } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import Card from "../components/Card";
import CardContext from "../context/CardContext";
import Loading from "./Loading";
import NotData from "./NotData";
import Error from './Error';



class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            res: false,
            loading: true,
            data: [],
            error: false
        });
    }

    componentDidMount() {
        let key = localStorage.getItem('key');

        fetch("https://financemeapi.com/api/cards", {
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
                this.context.updateCardsList(res['msg']);
            });
    }

    render() {
        var { res, loading, error, data } = this.state;
        var { CardList } = this.context;

        if (error) {
            return (
                <div className='h-80 sm:h-90vh'>
                    <div className='my-4 flex justify-end text-center text-lg'>
                        <NavLink to="/Dashboard/Crear-Nueva-Tarjeta" >
                            <FiPlusCircle className='mx-3 cursor-cell' />
                        </NavLink>
                    </div>

                    <div className='flex items-center justify-center h-full text-8xl opacity-25'>
                        <Error />
                    </div>
                </div>
            );
        }

        if (loading) {
            return (
                <div className='h-80 sm:h-90vh'>
                    <div className='my-4 flex justify-end text-center text-lg'>
                        <NavLink to="/Dashboard/Crear-Nueva-Tarjeta" >
                            <FiPlusCircle className='mx-3 cursor-cell' />
                        </NavLink>
                    </div>

                    <div className='overflow-y-auto h-full pr-1 animate-pulse'>
                        <div className='w-full flex flex-col h-32'>
                            <p className='bg-zinc-200 h-5/6 rounded-t w-full'></p>
                            <p className='bg-slate-300 h-2/6 rounded-b w-full'></p>
                        </div>

                        <div className='w-full flex flex-col h-32 mt-4'>
                            <p className='bg-zinc-200 h-5/6 rounded-t w-full'></p>
                            <p className='bg-slate-300 h-2/6 rounded-b w-full'></p>
                        </div>

                        <div className='w-full flex flex-col h-32 mt-4'>
                            <p className='bg-zinc-200 h-5/6 rounded-t w-full'></p>
                            <p className='bg-slate-300 h-2/6 rounded-b w-full'></p>
                        </div>

                        <div className='w-full flex flex-col h-32 mt-4'>
                            <p className='bg-zinc-200 h-5/6 rounded-t w-full'></p>
                            <p className='bg-slate-300 h-2/6 rounded-b w-full'></p>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className='h-80 sm:h-90vh'>
                <div className='my-4 flex justify-end text-center text-lg'>
                    <NavLink to="/Dashboard/Crear-Nueva-Tarjeta" >
                        <FiPlusCircle className='mx-3 cursor-cell' />
                    </NavLink>
                </div>

                <div className='overflow-y-auto h-full text-xs pr-1'>

                    {data.length == 0 ?
                        <NotData >
                            <div className='mt-2' >
                                <NavLink className='btn' to="/Dashboard/Crear-Nueva-Tarjeta">
                                    Crear Una Tarjeta
                                </NavLink>
                            </div>
                        </NotData>
                        :
                        CardList.map(item => (
                            <Card
                                key={item.id}
                                dataItem={item}
                            />
                        ))
                    }
                </div>
            </div>
        );

    }
}

Cards.contextType = CardContext;
export default Cards;

