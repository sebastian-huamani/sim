import React from 'react';
import TemplateItem from "../components/TemplateItem";
import TemplateContext from "../context/TemplateContext";
import Loading from "./Loading";
import Error from './Error';


class TemplateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            res: false,
            loading: true,
            data: [],
            error: false
        });
    }

    componentDidMount() {
        let key = localStorage.getItem('key');

        fetch("https://financemeapi.com/api/templates", {
            'headers': {
                'Authorization': 'Bearer ' + key,
                'Content-Type': 'text/plain',
                'Accept': 'application/json',
            }
        }, [])
        .then(response => response.json() )
        .then(res => {
            this.setState({
                res: res['res'],
                loading: res['res'] ? false : true,
                error: res['res'] ? false : true,
                data: res['msg'],
            })
            this.context.updateTemplates(res['msg'])
        });
    }

    render() {
        var { res, error, loading, data } = this.state;
        var { listTemplates } = this.context;


        if (error) {
            return (
                <div className='px-0 sm:px-3 h-90vh'>

                <div className='grid grid-cols-5/2/2 gap-0 md:gap-2 w-full items-center bg-white p-3 mb-4 shadow-slate-500/20 shadow-lg rounded-md sticky top-1'>
                    <p>Plantilla</p>
                    <div className='flex justify-center'>
                        <p>Estado</p>
                    </div>
                    <p className='text-end'>Opciones</p>
                </div>

                <div className='flex items-center justify-center text-8xl opacity-30 h-full' id='idTemplateList'>
                    <Error />
                </div>

            </div>
            )
        }

        if (loading) {
            return(
                <div className='px-0 sm:px-3 h-90vh'>

                <div className='grid grid-cols-5/2/2 gap-0 md:gap-2 w-full items-center bg-white p-3 mb-4 shadow-slate-500/20 shadow-lg rounded-md sticky top-1'>
                    <p>Plantilla</p>
                    <div className='flex justify-center'>
                        <p>Estado</p>
                    </div>
                    <p className='text-end'>Opciones</p>
                </div>

                <div className='overflow-y-auto h-full text-xs p-1 pt-1 animate-pulse' id='idTemplateList'>

                    <p className='h-14 w-full rounded-sm odd:bg-slate-200 even:bg-slate-100'></p>
                    <p className='h-14 w-full rounded-sm odd:bg-slate-200 even:bg-slate-100'></p>
                    <p className='h-14 w-full rounded-sm odd:bg-slate-200 even:bg-slate-100'></p>
                    <p className='h-14 w-full rounded-sm odd:bg-slate-200 even:bg-slate-100'></p>
                    <p className='h-14 w-full rounded-sm odd:bg-slate-200 even:bg-slate-100'></p>
                    <p className='h-14 w-full rounded-sm odd:bg-slate-200 even:bg-slate-100'></p>
                    <p className='h-14 w-full rounded-sm odd:bg-slate-200 even:bg-slate-100'></p>
                    <p className='h-14 w-full rounded-sm odd:bg-slate-200 even:bg-slate-100'></p>
                    <p className='h-14 w-full rounded-sm odd:bg-slate-200 even:bg-slate-100'></p>
                    <p className='h-14 w-full rounded-sm odd:bg-slate-200 even:bg-slate-100'></p>
                    <p className='h-14 w-full rounded-sm odd:bg-slate-200 even:bg-slate-100'></p>

                </div>

            </div>
            );
        }

        return (
            <div className='px-0 sm:px-3 h-90vh'>

                <div className='grid grid-cols-5/2/2 gap-0 md:gap-2 w-full items-center bg-white p-3 mb-4 shadow-slate-500/20 shadow-lg rounded-md sticky top-1'>
                    <p>Plantilla</p>
                    <div className='flex justify-center'>
                        <p>Estado</p>
                    </div>
                    <p className='text-end'>Opciones</p>
                </div>

                <div className='overflow-y-auto h-full text-xs p-1 ' id='idTemplateList'>

                    {
                        !res ? <Loading /> : listTemplates.map((item) => (
                            <TemplateItem
                                key={item.id}
                                title={item.title}
                                state={item.state}
                                id={item.id}
                                created_at={item.created_at}
                            />
                        ))
                    }

                </div>

            </div>
        );
    }
}

TemplateList.contextType = TemplateContext;
export default TemplateList;