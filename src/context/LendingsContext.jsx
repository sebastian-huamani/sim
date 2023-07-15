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
            idItem : null,
            listQuota : []
        }
    }

    setListActives = (activeList) => {
        this.setState({
            listActive : activeList,
        })
    }

    updateListActive = (  ) => {
        let key = localStorage.getItem('key');

        const fetchPromise = fetch("https://financemeapi.com/api/lending/actives", {
            'headers': {
                'Authorization': 'Bearer ' + key,
            }
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            this.setState({
                listActive : res['msg'],
            })
        });
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
            currentItemEdited :null
        });        
        this.setState({
            edited: true,
            idItem : idItem,
            currentItemEdited : item,
        });
    }

    updateItemEditing = ( item ) => {
        this.setState({
            currentItemEdited : item,
            // edited: false,
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

    setListCuota = (list) => {
        this.setState({
            listQuota : list
        });  
    }

    addListQuota = (value) => {
        this.state.listQuota.push(value)
    }
    deleteListQuota = (id) => {
        // this.state.listQuota.splice(id, id);

        var newArr = [];
        this.state.listQuota.map((elem) => {
            elem[0] != id ? newArr.push(elem) : [];
        });
        
        this.setState({
            listQuota : newArr
        });
    }

    render(){
        const { create, stateOptions, listActive, listDesactive, edited, currentItemEdited, idItem, listQuota } = this.state;
        const { updateListActive, updateListDesactive, changeOption, deleteItemtoList, ItemEditedToList,updateItemEditing, resetDataPanel, showCreateLending, setListCuota, addListQuota, deleteListQuota , setListActives } = this;

        return(
            <LendingsContext.Provider value={{ create, idItem, currentItemEdited, edited, stateOptions, listActive, listDesactive, updateListActive, updateListDesactive, changeOption, deleteItemtoList, ItemEditedToList, setListCuota,updateItemEditing, resetDataPanel, showCreateLending, listQuota, addListQuota, deleteListQuota, setListActives }}>
                {this.props.children}
            </LendingsContext.Provider>
        );
    }
}
export default LendingsContext;