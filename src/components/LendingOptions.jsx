import React from 'react';
import LendingsActive from "./LendingsActive";
import LendingsDesactive from "./LendingsDesactive";
import LendingsContext from "../context/LendingsContext";


class LendingOptions extends React.Component {
  constructor(props) {
    super(props);
   
  }

  render() {
    const { stateOptions, changeOption, } = this.context;

    return (
      <div className='h-97vh grid grid-rows-1/9 gap-4 px-3'>

        <div className='flex p-4 justify-evenly items-center rounded-lg bg-white shadow-md shadow-slate-500/20'>
          <button onClick={() => changeOption(true)} className={`border-b-2 ${stateOptions ? 'border-b-neutral-700' : 'border-none'}` } > Activos </button>
          <button onClick={() => changeOption(false)} className={`border-b-2 ${!stateOptions ? 'border-b-neutral-700 ' : 'border-none'}` }> Desactivos </button>
        </div>

        {stateOptions ? <LendingsActive  /> : <LendingsDesactive /> }
        
      </div>
    );
  }
}

LendingOptions.contextType = LendingsContext;
export default LendingOptions;