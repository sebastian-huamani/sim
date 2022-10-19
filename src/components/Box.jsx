// import React from 'react'

// class Card  extends React.Component{
//     constructor(props){
//         super(props);
//     }

//     render(){
//         const data = this.props.data;
//         return(
            
//             <div className='card  grid grid-cols-2 gap-2 ' >

//                 <div>
//                     <p>name:  {data.name}</p>
//                     <p>banck: {data.name_banck}</p>
//                     <p>user: {data.user_id}</p>
//                 </div>
//                 <div>
//                     <p>money: {data.bottom_line}</p>
//                     <p>C. Exp:  {data.card_expiration_date}</p>
//                     <p>T. Create: {data.created_at}</p>
//                 </div>
//             </div>

//         );
// }
// }
// export default Card

import React from 'react';


class Box extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const classNames = `box ${this.props.className}`;

        return (

            <div className={classNames}>
                {this.props.text}
            </div>

        );
    }
}


export default Box