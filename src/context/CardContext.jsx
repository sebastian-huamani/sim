import React from 'react';

const CardContext = React.createContext();

export class CardProvider extends React.Component {
    state = {
        idCard: 0,
        dataCard: null,
        dataItem: null
    }

    updateCard = () => {
        let card = sessionStorage.getItem('card');

        if (card != null) {
            this.setState({ 
                idCard: sessionStorage.getItem('card'), 
                dataCard: sessionStorage.getItem('dataCard')
            });
        }
    }

    updateItem = () => {
        this.setState({ 
            dataItem : sessionStorage.getItem('dataItem') 
        });
    }

    render() {
        
        const { idCard, dataCard, dataItem } = this.state;
        const { updateCard, updateItem } = this;
        return (
            <CardContext.Provider value={{ idCard, dataCard, dataItem, updateCard, updateItem }}>
                {this.props.children}
            </CardContext.Provider>
        );
    }
}
export default CardContext;