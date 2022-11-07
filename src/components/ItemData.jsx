import React from 'react';
import CardContext from "../context/CardContext";

class ItemData extends React.Component {

    DataTime(time){
        dotless = time.split(".");
        
    }

    render() {

        let dataJson = JSON.parse(this.context.dataItem)

        var data = [];
        for (let clave in dataJson) {
            if (dataJson[clave] != null) {
                data.push([clave, dataJson[clave]]);
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

ItemData.contextType = CardContext;

export default ItemData;