import React,{ useState } from "react"
import { withRouter } from 'react-router-dom'
import '../Styles/InvitationModal.css'
import Modal from "./Modal"
import { url } from '../../urlServer'
import PasswordVerificationNewRoom from './PasswordVerificationNewRoom'

const InvitationModal = (props) => {

    const invitation = props.invitationData

    const [modalOpen, setModalOpen] = useState(null)

    let joinData

    function onCloseModal(){
        setModalOpen(null)
    }

    if(invitation){

        let random = false

        if(!invitation.parentUsername){ random = true }

        joinData = {
            salaId: invitation.salaId,
            parentUser: invitation.parentUsername,
            random: random
        }
    }

    function handleClick( e ){
        e.preventDefault()
        setModalOpen(true)
    }
    
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
           <h3>Estas seguro?</h3>

            {
                invitation && <div className='invitationModal'>
                    <p>Invitado por: <span>{invitation.host}</span></p>
                    <p>Nombre de sala: <span>{invitation.salaName}</span></p>
                    <p>Precio: <span>{invitation.price.toString().slice(0,9)} BTC</span></p>
                    <p>Usuario padre: <span>{invitation.parentUsername}</span></p>
                    <p>Mensaje: <span>{invitation.message ? invitation.message : 'Ninguno' }</span></p>
                    <button className='btn btn-dark btn-block invitation-button' onClick={handleClick}>
                        <p>Unirse</p>
                    </button>
                </div>
            }
        
        <PasswordVerificationNewRoom isOpen={modalOpen} onClose={onCloseModal} onClose2={props.onClose} data={joinData} history={props.history} url={url+'/api/newUserInSala'}/>
        </Modal>
    )
}

export default withRouter(InvitationModal)