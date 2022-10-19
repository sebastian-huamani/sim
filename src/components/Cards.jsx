import React, { Suspense } from 'react';
import Loading from "../components/Loading";
import { FiPlusCircle, FiTrash, FiEdit2 } from "react-icons/fi";



class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            done: true,
            items: [],
        }
    }

    componentDidMount() {
        const fetchPromise = fetch("http://127.0.0.1:8000/api/card/showAll", {
            // 'mode': 'cors',
            'headers': {
                // 'Content-Type': 'text/plain',
                // 'Accept': 'application/json',
                'Authorization': 'Bearer 40|bYhorsBc113LKwyJqnBhUfBV4LNWUnCJ1VCu5zYl',
            }
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            this.setState({
                items: res['msg'],
                done: res['res']
            });

        });
    }


    render() {
        var { items, done } = this.state;

        const LazyComponent = React.lazy(() => {
            return new Promise(resolve => setTimeout(resolve, 1000)).then(
                () => import("../components/Card")
            );
        });
      

        return (
            <div className='h-90vh'>
                <div className='my-4 flex justify-end text-center text-lg'>
                    <FiTrash className='mx-3' />
                    <FiEdit2 className='mx-3' />
                    <FiPlusCircle className='mx-3' />
                </div>

                <div className='overflow-y-auto h-full text-xs'>
                    <Suspense fallback={<Loading />}>
                        <LazyComponent data={items} />
                    </Suspense>
                </div>
            </div>
        );

    }
}

export default Cards;

