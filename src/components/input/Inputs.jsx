export const InputSpecial = ({ type, name, placeholder, label, value }) => {
    return (
        <label htmlFor={name} className='grid my-6 justify-center' >
            {label} <br />
            <input type={type} name={name} id={name} placeholder={placeholder} className='w-40 text-center font-normal border-b-2' defaultValue={value}/>
        </label>
    )
}


export const InputSpecialNumber = ({ name, placeholder, label, step=1, min, max, value }) => {
    return (
        <label htmlFor={name} className='grid my-6 justify-center'>
            {label} <br />
            <input type="number" step={step} name={name} id={name} placeholder={placeholder} min={min} max={max} className='w-40 font-normal border-b-2 text-center' defaultValue={value}/>
        </label>
    )
}

export const InputSimple = ({ type, name, placeholder, label, value }) => {
    return (
        <label htmlFor={name} className='my-2'>
            {label}: <br />
            <input type={type} name={name} id={name} placeholder={placeholder} vadefaultValuelue={value}/>
        </label>
    )
}

