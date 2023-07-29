import React from 'react'
import Navbar from "../../components/Navbar";
import NavTop from "../../components/NavTop";
import Bar from '../../components/chart/Bar';
import MixedChart from "../../components/chart/MixedChart";
import PanelLending from '../../components/PanelLending';
import PanelIndicators from '../../components/PanelIndicators';
import DataGeneral from '../../components/chart/DataGeneral';
import PieChart from '../../components/chart/PieChart';
import PieGeneral from '../../components/chart/PieGeneral';

function dateNow() {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  if(month < 10){
      return year + '-0' + month;
  }
  return year + '-' + month;
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      money : 'pen',
      date: dateNow()
    };
    this.changeDate = this.changeDate.bind(this);
    this.changeMoney = this.changeMoney.bind(this);
  }

  changeDate(e){
    this.setState({
      date: e.target.value
    });
  }

  changeMoney(e){
    this.setState({
      money: e.target.value
    });
  }



  render() {
    const {changeMoney, changeDate} = this;
    var { money, date } = this.state;
    // return (
    //   <div>
    //     <Navbar />
    //     <NavTop />
    //     <div className='p-2 h-screen md:pl-20 pl-0'>
    //       Bienvenido de nuevo 
    //       <PanelIndicators />        

    //       <div className="module">
    //         <MixedChart title="Historial por Mes" />
    //         {/* <PanelLending /> */}
    //       </div>

    //       <div>
    //           <Bar />
    //       </div>

    //     </div>
    //   </div>
    // );

    return (
      <div>
        <Navbar />
        <NavTop />
        <div className='p-2 h-screen md:pl-20 pl-0'> 

          <div className='flex justify-between items-start my-5'>
            <p className='text-3xl'>Dashboard</p>
            <div className=''>
              <select name="money" id="money" className='p-1' onChange={changeMoney}>
                <option value="pen" selected>PEN</option>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
              </select>
              <input type="month" onChange={changeDate} defaultValue={dateNow()}/>
            </div>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 justify-between  my-3'>
            <div className='w-full h-full bg-white rounded-lg'>
              <div className='p-2 pb-0'>
                <p className='text-xs'>This Month</p>
                <p className='text-md font-normal'>$/ 6666</p>
              </div>
              <DataGeneral money={money} date={date} />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
              <PieChart title="Debito" currentValue="2096.50" totalValue="5463.24" porcent="68%" date={date} type_card="1" />
              <PieChart title="Credito" currentValue="3692.36" totalValue="16953.23" porcent="79%" date={date} type_card="2"/>
              <PieChart title="Prestamos" currentValue="-653.12" totalValue="" porcent="79%" date={date} type_card="3"/>
              {/* <PieChart title="Debito" currentValue="3692.36" totalValue="16953.23" porcent="79%" /> */}
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 justify-between my-3'>
            <div className='w-full h-full bg-white rounded-lg'>
              <PieGeneral />
            </div>
            <div className='grid grid-cols-2 gap-3'>
              {/* <PieChart title="Credito" currentValue="2096.50" totalValue="5463.24" porcent="68%" />
              <PieChart title="Debito" currentValue="3692.36" totalValue="16953.23" porcent="79%" /> */}
            </div>
          </div>

        </div>
      </div>
    );
  }
    
}
export default Home;
