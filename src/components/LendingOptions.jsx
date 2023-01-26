import React from 'react';
import LendingsActive from "./LendingsActive";
import LendingsDesactive from "./LendingsDesactive";
import LendingsContext from "../context/LendingsContext";


class LendingOptions extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let key = localStorage.getItem('key');

    const fetchPromise = fetch("http://127.0.0.1:8000/api/lending/showAllActives", {
      'headers': {
        'Authorization': 'Bearer ' + key,
      }
    });

    fetchPromise.then(response => {
      return response.json();
    }).then(res => {
      res['res'] ? this.context.updateListActive(res['msg']) : '';
       
    }).catch(err => {
      console.log(err, "err");
    })
  }


  render() {
    const { stateOptions, changeOption } = this.context;

    return (
      <div className='h-97vh grid grid-rows-1/9 gap-4 px-3'>

        <div className='flex p-4 justify-evenly items-center rounded-lg bg-white shadow-md shadow-slate-500/20'>
          <button onClick={() => changeOption(true)}> Activos </button>
          <button onClick={() => changeOption(false)}> Desactivos </button>
        </div>

        {stateOptions ? <LendingsActive  /> : <LendingsDesactive /> }
        
      </div>
    );
  }
}

LendingOptions.contextType = LendingsContext;
export default LendingOptions;