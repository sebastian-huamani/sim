import React from 'react'
import Navbar from "../../components/Navbar";
import NavTop from "../../components/NavTop";
import TemplateList from "../../components/TemplateList";
import TemplateData from "../../components/TemplateData";
import TemplateContext, { TemplateProvider } from "../../context/TemplateContext";

class Plantillas extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
      return (
        <TemplateProvider>
    
          <div className='md:pl-20 pl-0 '>
            <Navbar />
            <NavTop />
    
            <div className='sm:grid block grid-cols-template gap-4 h-screen p-2 '>
              <div className='bg-white box-session'>
                <TemplateData />
    
              </div>
              <div className='max-h-97vh mt-4 sm:mt-0'>
                <TemplateList />
              </div>
            </div>
    
          </div>
        </TemplateProvider>
      )
  }
}
export default Plantillas;