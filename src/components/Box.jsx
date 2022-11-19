import React from 'react';


class Box extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const classNames = `box ${this.props.className}`;

        return (

            <div className={classNames}>
                {this.props.text}
            </div>

        );
    }
}


export default Box