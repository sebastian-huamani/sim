import React from 'react';

const UpdateCardContext = React.createContext();

export class UpdateCardProvider extends React.Component {
    state = {
        time : false
    }
   
    update = () => {
        console.log(this.state.time);
    }

    

    render() {
        
        const { time } = this.state;
        const { update } = this;
        return (
            <UpdateCardContext.Provider value={{ time, update}}>
                {this.props.children}
            </UpdateCardContext.Provider>
        );
    }
}
export default UpdateCardContext;