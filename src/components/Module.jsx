import React from 'react';


class Module extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const classNames = `module ${this.props.className}`;

        return (

            <div className={classNames}>
                {this.props.text}
            </div>

        );
    }
}


export default Module