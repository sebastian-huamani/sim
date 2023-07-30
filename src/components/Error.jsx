import React from 'react';
import { FiAlertTriangle } from "react-icons/fi";
import { NavLink } from 'react-router-dom';

class Error extends React.Component{
    constructor(props){
        super(props);
        this.state = ({
            done: false
        })
        this.onClickLogout = this.onClickLogout.bind(this);
    }

    onClickLogout() {
        let key = localStorage.getItem('key');
        const fetchPromise = fetch("https://financemeapi.com/api/logout", {
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
                done: true,
            });
        });
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload(false);
    }

    render(){
        const { onClickLogout } = this;

        return(
            <div className='relative w-full min-h-34 h-full flex  justify-center items-center' > 
                <div className='text-8xl opacity-30'>
                    <FiAlertTriangle />
                    <div onClick={onClickLogout} className='text-sm text-center cursor-pointer bg-slate-900 text-white p-0.5 rounded'>
                        {this.props.children == null ? 'Login' : this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
export default Error;

