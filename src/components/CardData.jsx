import React from 'react';
import CardContext from "../context/CardContext";
import NotData from "./NotData";


class CardData extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let dataJson = JSON.parse(this.context.dataCard)
    if (dataJson != null) {
      var data = (
        <div className='' key={dataJson.id}>
          <div className='text-xs mb-5'>
            <p className='font-bold'> Nombre:</p>
            <p> {dataJson.name} </p>
          </div>
          <div className='text-xs mb-5'>
            <p className='font-bold'> Nombre del Banco:</p>
            <p> {dataJson.name_banck} </p>
          </div>
          <div className='text-xs mb-5'>
            <p className='font-bold'> amount:</p>
            <p> {dataJson.amount} </p>
          </div>
          <div className='text-xs mb-5'>
            <p className='font-bold'> Tipo de Tarjeta:</p>
            <p> {dataJson.type_card} </p>
          </div>
          <div className='text-xs mb-5'>
            <p className='font-bold'> F.Expiracion:</p>
            <p> {dataJson.card_expiration_date} </p>
          </div>
        </div>
      );

      if (dataJson.billing_cycle != null && dataJson.billing_cycle != 'undefined') {
        var test = (
          <div>
            <div className='text-xs mb-5'>
              <p className='font-bold'> tipo de tarjeta:</p>
              <p> {dataJson.billing_cycle} </p>
            </div>
            <div className='text-xs mb-5'>
              <p className='font-bold'> F.Expiracion:</p>
              <p> {dataJson.closing_date} </p>
            </div>
            <div className='text-xs mb-5'>
              <p className='font-bold'> F.Expiracion:</p>
              <p> {dataJson.payment_due_date} </p>
            </div>


          </div>

        )
      } else {
        ""
      }
    }

    if (data == null || data == 'undefined') {
      return <NotData />
    }

    return (
      <div className='text-ellipsis overflow-y-auto h-96 p-2'>
        {data}
        {test}
      </div>
    );
  }
}

CardData.contextType = CardContext;

export default CardData;
