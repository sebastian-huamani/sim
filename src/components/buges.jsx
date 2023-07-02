import React from 'react';

class Budges extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected : false,
            colorDefault: 'bg-gray-50'
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.setState({
            selected : !this.state.selected
        });
    }

    render(){
        const { handleClick } = this;
        const { colorSelected = null, colorSelectedText = null,  title , type = null} = this.props;

        if(type == "button"){
            return(
                <span onClick={handleClick} className={"cursor-pointer inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10 " + (this.state.selected ? colorSelected : 'bg-gray-50' ) + ' ' + (this.state.selected ? colorSelectedText : 'text-gray-600' ) }>{title}</span>
            );
        }
        
        if(type == "view"){
            return(
                <span className={"inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10 " + colorSelected + ' ' +  colorSelectedText  }>{title}</span>
            );
        }

        if(type == null){
            return(
                <span className={"inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10 bg-gray-50 text-gray-600"}>{title}</span>
            );
        }

    }
}
export default Budges;