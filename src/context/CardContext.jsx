import React from 'react';

const CardContext = React.createContext();

export class CardProvider extends React.Component {
    state = {
        idCard: 0,
        dataCard : null,
        idItemSelected : null,
        itemsList : null,
        time : false,
        CardList : [],
        disableInputItemEdited: true,
        seriesArr : [],
        OptionsArr: [],
    }

    updateCardsList = (data) =>{
        this.setState({
            CardList : data
        });
    }

    updateCard = (data) => {
        let card = sessionStorage.getItem('card');

        if (card != null) {
            this.setState({ 
                idCard: sessionStorage.getItem('card'), 
                dataCard: data,
                seriesArr : [],
                OptionsArr : [],
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

    updateItemsList = (items, seriesArr, OptionsArr) => {
        this.setState({ 
            itemsList : items,
            seriesArr : seriesArr,
            OptionsArr : OptionsArr,
        });
    }

    updateChangeState = () => {
        this.setState({ disableInputItemEdited : false});
    }

    updateChangeReset = () => {
        this.setState({ disableInputItemEdited : true});
    }

    render() {
        
        const { seriesArr, OptionsArr, idCard, dataCard, itemsList,  idItemSelected, time, CardList, disableInputItemEdited } = this.state;
        const { updateChangeState, updateChangeReset, updateItemsList, updateCard, updateItem, updateStateHistory, updateCardsList } = this;
        return (
            <CardContext.Provider value={{ seriesArr, OptionsArr, disableInputItemEdited, idCard, dataCard, itemsList, idItemSelected, updateCard, updateItem, updateItemsList, updateStateHistory, time, updateCardsList, CardList, updateChangeState, updateChangeReset, }}>
                {this.props.children}
            </CardContext.Provider>
        );
    }
}
export default CardContext;