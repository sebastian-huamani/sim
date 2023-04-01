import React from 'react'
import { NavLink } from "react-router-dom";
import Box from "../../components/Box";
import Navbar from "../../components/Navbar";
import NavTop from "../../components/NavTop";
import IndicatorsChart from "../../components/chart/IndicatorsChart";
import MixedChart from "../../components/chart/MixedChart";
import BarChart from "../../components/chart/BarChart";
import { ImArrowRight2 } from "react-icons/im";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      full_credit: null,
      aviable_credit: null,
      full_debit: null,
      aviable_debit: null,
      full_lending: null,
      dataLending: null,
      dataxMonth: null,
    }
  }

  componentDidMount() {
    let key = localStorage.getItem('key');

    const fetchPromise = fetch("https://financemeapi.com/api/transaction/count/DataDashboard", {
      'headers': {
        'Authorization': 'Bearer ' + key,
      }
    });

    fetchPromise.then(response => {
      return response.json();
    }).then(res => {
      var res = res["msg"];
      this.setState({
        full_credit: res['full_credit'],
        aviable_credit: res['aviable_credit'],
        full_debit: res['full_debit'],
        aviable_debit: res['aviable_debit'],
        full_lending: res['full_lending'],
        dataLending: res['dataLending'],
        dataxMonth: res['dataxMonth'],
      });
    });
  }

  render() {
    const { full_credit, aviable_credit, full_debit, full_lending, aviable_debit, dataxMonth, dataLending } = this.state;

    var LandingsList = '';
    if (dataLending != null) {
      LandingsList = dataLending.map((item) => (
        <li className='text-xs mt-1 p-1 flex justify-between items-center border-b'>
          <div className='w-5 text-ellipsis'> {item.debtor} </div>
          <div> S/. {item.amount} </div>
          <div> {item.name} </div>
        </li>
      ));
    }

    return (
      <div>

        <Navbar />
        <NavTop />
        <div className='p-2 h-screen md:pl-20 pl-0'>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4  mx-5 md:mx-0 bg-black-scene '>
            <IndicatorsChart data={full_credit} name="Credito Total" title="Suma del Credito total" />
            <IndicatorsChart data={aviable_credit} name="Credito Disponible" title="Credito disponible para uso" />
            <IndicatorsChart data={full_debit} name="Debito Total" title="Debito total " />
            <IndicatorsChart data={aviable_debit} name="Debito Disponible" title="Debito disponible" />
            <IndicatorsChart data={full_lending} name="Prestamos Total" title="Prestamos" />
          </div>

          <div className="module">
            <MixedChart title="Historial por Mes" />

            <div className='box'>
              <div className='flex justify-between items-center'>
                <p className='font-semibold'>Prestamos</p>
                <NavLink to="/Dashboard/Prestamos" >
                  <ImArrowRight2 className='text-lg mr-1 cursor-pointer ' />
                </NavLink>
              </div>
              <ul className=''>
                <li className='text-xs mt-1 p-1 flex justify-between items-center border-b'>
                  <div> User </div>
                  <div> Monto </div>
                  <div> Estado </div>
                </li>
                <div className='overflow-x-hidden h-52'>
                  {LandingsList}
                </div>
              </ul>
            </div>
            
          </div>

        </div>
      </div>


    );
  }
}
export default Home;
