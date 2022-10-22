import React from 'react';
import './css/NotFound.css';

const style = {

}

class Notfound extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div >
                <button class="cybr-btn">
                    Glitch<span aria-hidden>_</span>
                    <span aria-hidden className="cybr-btn__glitch">Glitch_</span>
                    <span aria-hidden className="cybr-btn__tag">R25</span>
                </button>
            </div>
        );
    }
}
export default Notfound;