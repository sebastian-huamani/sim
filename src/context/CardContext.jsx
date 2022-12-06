import React from 'react';

const CardContext = React.createContext();

export class CardProvider extends React.Component {
    state = {
        idCard: 0,
        dataCard : null,
        idItemSelected : null,
        itemsList : null,
        time : false
    }
   
    updateCard = (data) => {
        let card = sessionStorage.getItem('card');

        if (card != null) {
            this.setState({ 
                idCard: sessionStorage.getItem('card'), 
                dataCard: data
            });
        }
    }

    updateItem = ( iditem ) => {
        this.setState({
            idItemSelected : iditem
        });
    }

    updateStateHistory = ( value ) => {
        this.setState({time : value , itemsList: null});
    }

    updateItemsList = (items) => {
        this.setState({ itemsList : items });
    }

    render() {
        
        const { idCard, dataCard, itemsList,  idItemSelected, time } = this.state;
        const { updateItemsList, updateCard, updateItem, updateStateHistory } = this;
        return (
            <CardContext.Provider value={{ idCard, dataCard, itemsList, idItemSelected, updateCard, updateItem, updateItemsList, updateStateHistory, time }}>
                {this.props.children}
            </CardContext.Provider>
        );
    }
}
export default CardContext;