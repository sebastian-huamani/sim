import React from 'react';
import LendingsContext from "../context/LendingsContext";
import Loading from "./Loading";
import LendingsItem from "./LendingsItem";
import NotData from "./NotData";

class LendingsActive extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { listActive } = this.context;

        return (
            <div className='overflow-y-auto h-full text-xs p-1' >

                { listActive == null ? <NotData /> : listActive.map(item => (
                        <LendingsItem item={item} key={item.id} />
                    ))
                }
            </div>
        );
    }
}

LendingsActive.contextType = LendingsContext;
export default LendingsActive;