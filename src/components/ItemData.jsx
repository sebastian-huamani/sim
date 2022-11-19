import React from 'react';
import CardContext from "../context/CardContext";
import NotData from "./NotData";

class ItemData extends React.Component {
    constructor(props) {
        super(props);
        this.processJson = this.processJson.bind(this);
    }

    processJson( dataJson ) {
        var data = JSON.parse(dataJson);
        console.log(data);
        var dataBody = null;
        for ( const [key, value] of Object.entries(data)){
            dataBody +=  <p> `${key}: ${value}` </p> ;
            // console.log(`${key}: ${value}`);
        }
        console.log(dataBody);
        
    }

    render() {

        let items = JSON.parse(this.context.itemsList);
        var idItem = this.context.idItemSelected;
        let itemselected;

        if (items != null) {
            items.map((item) => {
                if (item.id == idItem) {
                    itemselected = item;
                }
            });
        }
        // console.log(itemselected);

        if (itemselected != null) {
            var data = [itemselected].map((item) => (
                <ul className='text-ellipsis overflow-y-auto h-full' key={item.id}>
                    <li>
                        <p>{item.title}</p>
                    </li>
                    <li>
                        <p>{item.amount}</p>
                    </li>
                    <li>
                        {
                            Object.entries(JSON.parse(item.body)).map(([key, value]) => (
                                <p> {key} : {value} </p>
                            ))
                        }
                       
                    </li>
                    <li>
                        <p>{item.id}</p>
                    </li>
                </ul>
            ));
        }


        if (itemselected == null || itemselected == undefined) {
            return <NotData />
        }

        // if (items != null) {
        //     console.log(items);
        // }

        // const data = [info].map((item) => (
        //     <ul className='text-ellipsis overflow-y-auto h-full ' key={item.id}>
        //         <li>
        //             <p>{item.title}</p>
        //         </li>
        //         <li>
        //             <p>{item.amount}</p>
        //         </li>
        //         <li>
        //             <p>{this.processJson(item.body)}</p>
        //         </li>
        //         <li>
        //             <p>{item.id}</p>
        //         </li>
        //     </ul>
        // ))


        return (
            <div className='min-h-98'>
                {data}
            </div>
        );
    }
}

ItemData.contextType = CardContext;
export default ItemData;