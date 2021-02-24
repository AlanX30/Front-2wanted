import React, { useState } from "react"
import Swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'
import '../Styles/InvitationModal.css'
import Modal from "./Modal"
import axios from 'axios'
import { url } from '../../urlServer'

const InvitationModal = (props) => {

    const invitation = props.invitationData

    const [invitationLoading, setInvitationLoading] = useState(false)

    let joinData

    if(invitation){
        joinData = {
            salaId: invitation.salaId,
            parentUser: invitation.parentUsername
        }
    }

    async function handleClick( e ){
        e.preventDefault()

        setInvitationLoading(true)

        await axios({
            data: joinData,
            method: 'post',
            url: url+'/api/newUserInSala'
        }).then(res => {
            setInvitationLoading(false)
            if(res.data.error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.error,
                })
            }else{
                props.onClose()
                props.history.push(`/sala/${res.data.id}`)
            }
        }).catch(err => {
            setInvitationLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err,
            })
        }) 
    }
    
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
           <h3>Are you sure?</h3>

            {
                invitation && <div className='invitationModal'>
                    <p>Invited by: <span>{invitation.host}</span></p>
                    <p>Room Name: <span>{invitation.salaName}</span></p>
                    <p>Price: <span>${invitation.price}</span></p>
                    <p>Parent user: <span>{invitation.parentUsername}</span></p>
                    <p>Message: <span>{invitation.message ? invitation.message : 'Ninguno' }</span></p>
                    <button disabled={invitationLoading ? true : false} className='btn btn-dark btn-block invitation-button' onClick={handleClick}>
                        <div className={invitationLoading ? "spinner-conf spinner-border text-danger" : 'dNone'} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <p  className={invitationLoading ? 'dNone' : ''}>Join</p>
                    </button>
                </div>
            }
           
        </Modal>
    )
}

export default withRouter(InvitationModal)