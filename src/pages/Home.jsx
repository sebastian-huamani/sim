import React from 'react'
import Box from "../components/Box";
import Navbar from "../components/Navbar";
import NavTop from "../components/NavTop";
import Sparkline from "../components/chart/Sparkline";
import IndicatorsChart from "../components/chart/IndicatorsChart";
import MixedChart from "../components/chart/MixedChart";
import BarChart from "../components/chart/BarChart";


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      full_credit: null,
      aviable_credit: null,
      full_debit: null,
      dataxMonth: null,
    }
  }

  componentDidMount() {
    let key = localStorage.getItem('key');

    const fetchPromise = fetch("http://127.0.0.1:8000/api/transaction/count/DataDashboard", {
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
        dataxMonth: res['dataxMonth'],
      });
    });
    

    // const fetchPromise2 = fetch("http://127.0.0.1:8000/api/pruebas",{
    //   'method' : 'POST'
    // });

    // fetchPromise2.then(response => {
    //   return response.json();
    // }).then( res => {
    //   console.log(res);

    // })

  }

  render() {
    const { full_credit, aviable_credit, full_debit, dataxMonth } = this.state;

    return (
      <div>

        <Navbar />
        <NavTop />
        <div className='p-2 h-full md:pl-20 pl-0'>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 bg-black-scene '>
            <IndicatorsChart data={full_credit} title="Credito Total"/>
            <IndicatorsChart data={aviable_credit} title="Credito Disponible"/>
            <IndicatorsChart data={full_debit}  title="Debito Total" />
            <IndicatorsChart data={aviable_credit} title="Credito Disponible" />
            <IndicatorsChart data={aviable_credit} title="Credito Disponible" />
          </div>

          <div className="module">
            <MixedChart data={dataxMonth} title="Historial"/>
            <div className='box'>
              <p>Prestamos</p>
              <ul>
                <li>aa</li>
                <li>aa</li>
                <li>aa</li>
                <li>aa</li>
                <li>aa</li>
                <li>aa</li>
              </ul>
            </div>
          </div>

          <div className="module">
            <Box />
            <BarChart value={50} /> 
          </div>

        </div>
      </div>


    );
  }
}
export default Home;