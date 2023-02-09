import React from 'react';
import TemplateItem from "../components/TemplateItem";
import TemplateContext from "../context/TemplateContext";
import Loading from "./Loading";


class TemplateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            done: false,
            items: []
        });
    }

    componentDidMount() {
        let key = localStorage.getItem('key');

        const fetchPromise = fetch("https://financemeapi.com/api/template/showAll", {
            'headers': {
                'Authorization': 'Bearer ' + key,
            }
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            this.setState({
                done: res['res'],
                items: res['msg']
            })
            this.context.updateTemplates(res['msg'])
        })
    }

    render() {
        var { done, items } = this.state;
        var { listTemplates } = this.context;

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
                        !done ? <Loading /> : listTemplates.map((item) => (
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