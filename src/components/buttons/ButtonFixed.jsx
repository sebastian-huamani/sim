import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export const ButtonLinkFixed = ({ name, customClass, actionButton, toLink }) => {
    
    return (
        <Link to={toLink} className={`btn fixed flex items-center ${customClass}`} onClick={actionButton}> 
            <FaArrowLeft className="mr-3"/> {name}
        </Link>
    )
}

export const ButtonActionAbsolute = ({ name, customClass, actionButton}) => {
    
    return (
        <button type="submit"  className={`btn absolute flex items-center ${customClass}`} onClick={actionButton}>
            <FaArrowLeft className="mr-3"/>{name}
        </button>
    )
}
