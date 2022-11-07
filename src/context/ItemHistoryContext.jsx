import React from 'react';

const ItemHistoryContext = React.createContext();

export class ItemHistoryProvider extends React.Component{
    state = {
        data : 'nothing'
    }

    update = () => {
        this.setState({data: 'ok'})
    }

    render(){
        const { data } = this.state;
        const { update } = this;
        
        return(
            <ItemHistoryContext.Provider value={{data, update}}>
                {this.props.children}
            </ItemHistoryContext.Provider>

        );
    }
}
export default ItemHistoryContext;