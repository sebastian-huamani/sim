import React from 'react';
import { NavLink } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import Card from "../components/Card";
import CardContext from "../context/CardContext";
import Loading from "./Loading";
import NotData from "./NotData";



class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            done: false,
            items: [],
        });
    }

    componentDidMount() {
        let key = localStorage.getItem('key');

        const fetchPromise = fetch("https://financemeapi.com/api/card/showAll", {
            'headers': {
                'Authorization': 'Bearer ' + key,
            }
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            this.setState({
                items: res['msg'],
                done: res['res']
            });
            this.context.updateCardsList(res['msg']);
        });
    }

    render() {
        var { items, done } = this.state;
        var { CardList } = this.context;

        return (
            <div className='h-80 sm:h-90vh'>
                <div className='my-4 flex justify-end text-center text-lg'>
                    <NavLink to="/Dashboard/Crear-Nueva-Tarjeta" >
                        <FiPlusCircle className='mx-3' />
                    </NavLink>
                </div>

                <div className='overflow-y-auto h-full text-xs pr-1'>

                    {!done ? <Loading /> : (items.length == 0 ?
                        <NotData >
                            <div className='mt-2' >
                                <NavLink  className='btn' to="/Dashboard/CreateCard">
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
                        )
                        ))
                    }
                </div>
            </div>
        );

    }
}

Cards.contextType = CardContext;
export default Cards;

