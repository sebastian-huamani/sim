import React from 'react'
import Navbar from "../../components/Navbar";
import NavTop from "../../components/NavTop";
import MixedChart from "../../components/chart/MixedChart";
import PanelLending from '../../components/PanelLending';
import PanelIndicators from '../../components/PanelIndicators';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar />
        <NavTop />
        <div className='p-2 h-screen md:pl-20 pl-0'>

          <PanelIndicators />        

          <div className="module">
            <MixedChart title="Historial por Mes" />
            <PanelLending />
          </div>

        </div>
      </div>
    );
  }
    
}
export default Home;
