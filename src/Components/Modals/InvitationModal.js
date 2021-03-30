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
           <h3>Are you sure?</h3>

            {
                invitation && <div className='invitationModal'>
                    <p>Invited by: <span>{invitation.host}</span></p>
                    <p>Room Name: <span>{invitation.salaName}</span></p>
                    <p>Price: <span>{invitation.price.toFixed(7)} BTC</span></p>
                    <p>Parent user: <span>{invitation.parentUsername}</span></p>
                    <p>Message: <span>{invitation.message ? invitation.message : 'Ninguno' }</span></p>
                    <button className='btn btn-dark btn-block invitation-button' onClick={handleClick}>
                        <p>Join</p>
                    </button>
                </div>
            }
        
        <PasswordVerificationNewRoom isOpen={modalOpen} onClose={onCloseModal} onClose2={props.onClose} data={joinData} history={props.history} url={url+'/api/newUserInSala'}/>
        </Modal>
    )
}

export default withRouter(InvitationModal)