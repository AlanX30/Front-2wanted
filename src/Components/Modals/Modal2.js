import React from "react"
import ReactDOM from "react-dom"
import "../Styles/Modal.css"

function Modal2(props) {
    
    if(!props.isOpen){
        return null
    }
    return(
        ReactDOM.createPortal(
            <div className="Modal">
                <div className="Modal__container">
                    <button onClick={props.onClose} className="Modal__close-button">X</button>
                    {props.children}
                </div>
            </div>
            
        , document.getElementById("modal2"))
    )
}

export default Modal2