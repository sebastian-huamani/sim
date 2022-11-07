import { Navigate } from "react-router-dom";
import React from 'react';

class Logout extends React.Component{
    constructor(props){
        super(props);
        this.state = ({
            redirectTo : "/login",
            done: false,
            msg: '',
        })
    }

    componentDidMount() {
        let key = localStorage.getItem('key');
        const fetchPromise = fetch("http://127.0.0.1:8000/api/logout", {
            method: 'POST',
                // 'mode': 'cors',
            'headers': {
                'Content-Type': 'text/plain',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + key,
            }
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            this.setState({
                done: res['res'],
                msg: res['msg'],
            });
            console.log(res);
        });
    }

    render(){
        var { done, msg }  = this.state
        if( done ){
            localStorage.removeItem('key');
            localStorage.removeItem('done');
            console.log(msg);
            return <Navigate to={this.state.redirectTo} />
        }
        console.log(msg);
    }

}
export default Logout;