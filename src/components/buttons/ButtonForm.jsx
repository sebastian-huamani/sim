const ButtonForm = ({ name, actionButton }) => {
    return (
        <button type="submit" className='btn' onClick={actionButton} >{name}</button>
    )
}

export default ButtonForm;