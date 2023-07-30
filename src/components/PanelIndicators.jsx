import React from 'react';
import IndicatorsChart from './chart/IndicatorsChart';
import Error from './Error';

class PanelIndicators extends React.Component {
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
        fetch('https://financemeapi.com/api/currentmoney', {
            'headers': {
                method: 'GET',
                'Authorization': 'Bearer ' + key,
                'Content-Type': 'text/plain',
                'Accept': 'application/json',
            }
        }, [])
            .then(response => response.json())
            .then(res => {
                this.setState({
                    res: res['res'],
                    loading: res['res'] ? false : true,
                    error: res['res'] ? false : true,
                    data: res['msg'],
                });
            });
    }

    render() {
        const { data, error, loading, res } = this.state;

        if (error) {
            return (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4  mx-5 md:mx-0 bg-black-scene '>
                    <div className="IndicatorsChart"> <div className='flex items-center justify-center text-4xl opacity-25 h-full'> <Error/> </div> </div>
                    <div className="IndicatorsChart"> <div className='flex items-center justify-center text-4xl opacity-25 h-full'> <Error/> </div> </div>
                    <div className="IndicatorsChart"> <div className='flex items-center justify-center text-4xl opacity-25 h-full'> <Error/> </div> </div>
                    <div className="IndicatorsChart"> <div className='flex items-center justify-center text-4xl opacity-25 h-full'> <Error/> </div> </div>
                    <div className="IndicatorsChart"> <div className='flex items-center justify-center text-4xl opacity-25 h-full'> <Error/> </div> </div>
                </div>
            );
        }

        return (
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mx-5 md:mx-0 bg-black-scene my-3'>
                <IndicatorsChart data={data.full_credit} name="Credito Total" title="Suma del Credito total" />
                <IndicatorsChart data={data.aviable_credit} name="Credito Disponible" title="Credito disponible para uso" />
                <IndicatorsChart data={data.full_debit} name="Debito Total" title="Debito total " />
                <IndicatorsChart data={data.aviable_debit} name="Debito Disponible" title="Debito disponible" />
                <IndicatorsChart data={data.full_lending} name="Prestamos Total" title="Prestamos" />
            </div>

        );
    }
}
export default PanelIndicators;