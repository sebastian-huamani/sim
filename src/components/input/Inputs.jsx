import { BiTrash, BiEdit, BiTransfer } from "react-icons/bi";

export const InputSpecial = ({ type, name, placeholder, label, value }) => {
    return (
        <label htmlFor={name} className='grid my-6 justify-center' >
            {label} <br />
            <input type={type} name={name} id={name} placeholder={placeholder} className='w-40 text-center font-normal border-b-2' defaultValue={value} />
        </label>
    )
}


export const InputSpecialNumber = ({ name, placeholder, label, step = 1, min, max, value }) => {
    return (
        <label htmlFor={name} className='grid my-6 justify-center'>
            {label} <br />
            <input type="number" step={step} name={name} id={name} placeholder={placeholder} min={min} max={max} className='w-40 font-normal border-b-2 text-center' defaultValue={value} />
        </label>
    )
}

export const InputSimple = ({ type, name, placeholder, label, value }) => {
    return (
        <label htmlFor={name} className='my-2'>
            {label}: <br />
            <input type={type} name={name} id={name} placeholder={placeholder} defaultValue={value} />
        </label>
    )
}

export const InputRowTemplate = ({ name, id, label, value, actionButton }) => {
    return (
        <div className='grid grid-cols-2/5/2 gap-4 w-9/12 mx-auto mb-4'>
            <label htmlFor="title">Col. {label} :</label>

            <div className="flex">
                <input type="text" name={`body[${id}]`} id={name[0]} className='bg-gray-200 p-1 text-center' defaultValue={value[0]} key={value} />
                <select name={`type[${id}]`} defaultValue={name[1]} className=" border-none bg-none text-sm text-center">
                    <option value="text">Texto</option>
                    <option value="numero">Numero</option>
                </select>
            </div>

            <div className='flex justify-center items-center text-xl relative'>
                <div>
                    <p type="submit" className='absolute h-8 w-4 mr-4 cursor-pointer' onClick={ () => actionButton(name[0])} ></p>
                    <div className='mr-2'>
                        <BiTrash />
                    </div>
                </div>
            </div>

        </div>
    )
}