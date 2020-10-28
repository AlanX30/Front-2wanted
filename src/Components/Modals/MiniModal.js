import React from "react"
import ReactDOM from "react-dom"
import '../Styles/MiniModal.css'

function MiniModal(props) {
    
    if(!props.isOpen){
        return null
    }
    return(
        ReactDOM.createPortal(
            <div className="MiniModal">
                <div className="MiniModal__container">
                    <button onClick={props.onClose} className="MiniModal__close-button">X</button>
                    {props.children}
                </div>
            </div>
            
        , document.getElementById("modal"))
    )
}

export default MiniModal