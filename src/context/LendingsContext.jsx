import React from 'react';
const LendingsContext = React.createContext();

export class LendingsProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            stateOptions: true,
            listActive : [],
            listDesactive : [],
            edited: false,
            create :false,
            currentItemEdited : null,
            idItem : null
        }
    }

    updateListActive = ( activeList ) => {
        this.setState({
            listActive : activeList,
        })
    }

    updateListDesactive = ( desactiveList ) => {
        this.setState({
            listDesactive : desactiveList,
        })
    }

    changeOption = ( value ) => {
        this.setState({
            stateOptions : value,
            edited: false,
        })
    }

    deleteItemtoList = ( idItem ) => {
        var arr = [];
        var currentList = this.state.stateOptions ? this.state.listActive : this.state.listDesactive;
        currentList.map((item) => {
            if( item.id != idItem){
                arr.push(item);
            }
        });

        this.state.stateOptions ? 
        this.setState({
            edited : false,
            listActive : arr,
        }) 
        :
        this.setState({
            edited : false,
            listDesactive : arr,
        }) 

    }

    ItemEditedToList = ( idItem, item ) => {
        this.setState({
            edited: true,
            idItem : idItem,
            currentItemEdited : item,
        });
    }

    updateItemEditing = ( item ) => {
        this.setState({
            currentItemEdited : item
        })
    }

    resetDataPanel = () => {
        this.setState({
            edited: false,
            create :false,
            currentItemEdited : null,
            idItem : null
        })
    }

    showCreateLending = () => {
        this.setState({
            create: true,
            edited : false
        });
    }

    render(){
        const { create, stateOptions, listActive, listDesactive, edited, currentItemEdited, idItem } = this.state;
        const { updateListActive, updateListDesactive, changeOption, deleteItemtoList, ItemEditedToList,updateItemEditing, resetDataPanel, showCreateLending  } = this;

        return(
            <LendingsContext.Provider value={{ create, idItem, currentItemEdited, edited, stateOptions, listActive, listDesactive, updateListActive, updateListDesactive, changeOption, deleteItemtoList, ItemEditedToList, updateItemEditing, resetDataPanel, showCreateLending }}>
                {this.props.children}
            </LendingsContext.Provider>
        );
    }
}
export default LendingsContext;