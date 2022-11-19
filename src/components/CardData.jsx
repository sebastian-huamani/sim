import React from 'react';
import CardContext from "../context/CardContext";
import NotData from "./NotData";


class CardData extends React.Component {

    render() {

        let dataJson = JSON.parse(this.context.dataCard)

        if (dataJson != null) {
            var data = [dataJson].map((item) => (
                <ul className='text-ellipsis overflow-y-auto h-full' key={item.id}>
                    <li className='text-xs mb-5'>
                        <p className='font-bold'> Nombre:</p>
                        <p> {item.name} </p>
                    </li>
                    <li className='text-xs mb-5'>
                        <p className='font-bold'> Nombre del Banco:</p>
                        <p> {item.name_banck} </p>
                    </li>
                    <li className='text-xs mb-5'>
                        <p className='font-bold'> Tipo de Tarjeta:</p>
                        <p> {item.type_card} </p>
                    </li>
                    <li className='text-xs mb-5'>
                        <p className='font-bold'> Monto:</p>
                        <p> {item.bottom_line} </p>
                    </li>
                    <li className='text-xs mb-5'>
                        <p className='font-bold'> F.Expiracion:</p>
                        <p> {item.card_expiration_date} </p>
                    </li>
                    <li className='text-xs mb-5'>
                        <p className='font-bold'> F.Expiracion:</p>
                        <p> {item.closing_date} </p>
                    </li>
                    {/* {console.log(item.closing_date)} */}
                    
                </ul>
            ));
        }

        if (data == null) {
            return <NotData />
        }

        return (
            <ul className='text-ellipsis overflow-y-auto h-full'>
                {data}
            </ul>
        );
    }
}

CardData.contextType = CardContext;

export default CardData;