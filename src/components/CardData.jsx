import React from 'react';
import CardContext from "../context/CardContext";


class CardData extends React.Component {

    render() {
        
        let dataJson = JSON.parse(this.context.dataCard)
        
        var data = [];
        for ( let clave in dataJson ){
            if (dataJson[clave] != null) {
                data.push([clave , dataJson[clave] ]);
            }
        }
        
        const info = data.map((item) => (
            <li className='text-xs mb-3' key={item[0]}>   
                <p className='font-bold'> {item[0]} </p>
                <p> {item[1]} </p>
            </li>
        ));

        return (
            <ul className='text-ellipsis overflow-y-auto h-full '>
                {info}
            </ul>
        );
    }
}

CardData.contextType = CardContext;

export default CardData;