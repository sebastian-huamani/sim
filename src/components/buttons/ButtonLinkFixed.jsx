import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
const ButtonLinkFixed = ({ name, customClass, actionButton, toLink }) => {
    
    
    // return (
    //     <button type="submit" className={`btn fixed ${customClass}`} onClick={actionButton} >{name}</button>
    // )
    return (
        // <button type="submit" className={`btn fixed ${customClass}`} onClick={actionButton} >{name}</button>
        <Link to={toLink} className={`btn fixed flex items-center ${customClass}`} onClick={actionButton}> 
            <FaArrowLeft className="mr-3"/> {name}
        </Link>
    )
}

export default ButtonLinkFixed;