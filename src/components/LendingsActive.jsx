import React from 'react';
import LendingsContext from "../context/LendingsContext";
import Loading from "./Loading";
import LendingsItem from "./LendingsItem";
import NotData from "./NotData";

class LendingsActive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            done: false
        }

    }

    componentDidMount() {
        let key = localStorage.getItem('key');
    
        const fetchPromise = fetch("https://financemeapi.com/api/lending/showAllActives", {
          'headers': {
            'Authorization': 'Bearer ' + key,
          }
        });
    
        fetchPromise.then(response => {
          return response.json();
        }).then(res => {
          res['res'] ? this.context.updateListActive(res['msg']) : this.context.deleteItemtoList(this.context.idItem);
          this.setState({
            done : res['res']
          });
        });
      }
      


    render() {
        const { done } = this.state;
        const { listActive } = this.context;

        if(listActive == "Se Ha Producido Un Error" ){
            return (
                <div className='overflow-y-auto h-full text-xs p-1' >
                    {<NotData />}
                </div>
            )
        }

        return (
            <div className='overflow-y-auto h-full text-xs p-1' >

                {  listActive.length == 0 ? <NotData /> : ( listActive == null ? 
                    
                    <NotData />
                    :
                    listActive.map(item => (
                        <LendingsItem item={item} key={item.id} />
                        ))
                    ) 
                }
            </div>
        );
    }
}

LendingsActive.contextType = LendingsContext;
export default LendingsActive;