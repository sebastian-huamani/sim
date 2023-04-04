import React from 'react';
import LendingsContext from "../context/LendingsContext";
import Loading from "./Loading";
import LendingsItem from "./LendingsItem";
import NotData from "./NotData";
import Error from './Error';

class LendingsActive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: false,
      loading: true,
      data: [],
      error: false
    }
  }

  componentDidMount() {
    let key = localStorage.getItem('key');

    fetch("https://financemeapi.com/api/lending/actives", {
      'headers': {
        'Authorization': 'Bearer ' + key,
      }
    }, [])
      .then(response => response.json())
      .then(res => {
        res['res'] ? this.context.updateListActive(res['msg']) : this.context.deleteItemtoList(this.context.idItem);
        this.setState({
          res: res['res'],
          loading: res['res'] ? false : true,
          error: res['res'] ? false : true,
          data: res['msg'],
        });
      });
  }



  render() {
    const { res, loading, error, data } = this.state;
    const { listActive } = this.context;

    if (listActive == "Se Ha Producido Un Error") {
      return (
        <div className='overflow-y-auto h-full text-xs p-1' >
          {<NotData />}
        </div>
      )
    }

    if(error){
      return(
        <div className='flex items-center justify-center h-full p-1 text-8xl opacity-25' >
          <Error />
        </div>
      );
    }

    if(loading){
      return(
        <div className='overflow-y-auto h-full text-xs p-1' >
          <p className='h-12 w-full rounded-sm odd:bg-slate-200 even:bg-slate-100'></p>
          <p className='h-12 w-full rounded-sm odd:bg-slate-200 even:bg-slate-100'></p>
          <p className='h-12 w-full rounded-sm odd:bg-slate-200 even:bg-slate-100'></p>
          <p className='h-12 w-full rounded-sm odd:bg-slate-200 even:bg-slate-100'></p>
          <p className='h-12 w-full rounded-sm odd:bg-slate-200 even:bg-slate-100'></p>
          <p className='h-12 w-full rounded-sm odd:bg-slate-200 even:bg-slate-100'></p>
          <p className='h-12 w-full rounded-sm odd:bg-slate-200 even:bg-slate-100'></p>
          <p className='h-12 w-full rounded-sm odd:bg-slate-200 even:bg-slate-100'></p>
          <p className='h-12 w-full rounded-sm odd:bg-slate-200 even:bg-slate-100'></p>
          <p className='h-12 w-full rounded-sm odd:bg-slate-200 even:bg-slate-100'></p>
          <p className='h-12 w-full rounded-sm odd:bg-slate-200 even:bg-slate-100'></p>
          <p className='h-12 w-full rounded-sm odd:bg-slate-200 even:bg-slate-100'></p>
          <p className='h-12 w-full rounded-sm odd:bg-slate-200 even:bg-slate-100'></p> 
        </div>
      );
    }

    return (
      <div className='overflow-y-auto h-full text-xs p-1' >

        {listActive.length == 0 ? <NotData /> : (listActive == null ?

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