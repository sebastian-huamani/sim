import React from 'react';

class Color extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: [],
            colorId: '',
        }
        this.handleColorSelected = this.handleColorSelected.bind(this);
    }

    componentDidMount() {
        let key = localStorage.getItem('key');

        const fetchPromise = fetch('https://financemeapi.com/api/colors', {
            method: 'GET',
            'headers': {
                'Authorization': 'Bearer ' + key,
            }
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            this.setState({ 
                colors: res.colors 
            });
        });
    }

    handleColorSelected(code, id){
        this.setState({ 
            colorId: id ,
            colorCode: code
        });
    }

    render() {
        const { currentColor } = this.props;
        const { colors, colorId, colorCode } = this.state;
        const { handleColorSelected } = this;

        return (

            <div className='mt-4 '>
                <label htmlFor="" className='flex items-center'>
                    Color:
                    { colorId == '' 
                        ? <p className='ml-4 h-8 w-8 rounded-full border border-spacing-1 border-black' style={{ background: currentColor }}></p>
                        : <p className='ml-4 h-8 w-8 rounded-full border border-spacing-1 border-black' style={{ background: colorCode }}></p>
                    }
                </label>

                <div className='grid grid-cols-7 gap-4 mt-4'>
                    {
                        colors.map(item => (
                            <p className='h-8 w-8 rounded-full cursor-pointer border border-black' onClick={ (e) => { handleColorSelected(item.color_panel_top, item.id);} } style={{ background: item.color_panel_top }} key={item.id} ></p>
                        ))
                    }
                </div>

                <input type="hidden" defaultValue={colorId} name="color" />
            </div>

        );
    }
}
export default Color;       