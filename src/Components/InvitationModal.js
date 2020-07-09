import React from "react"
import Swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'
import './Styles/InvitationModal.css'
import Modal from "./Modal"
import axios from 'axios'

const InvitationModal = (props) => {

    const invitation = props.invitationData

    let joinData

    if(invitation){
        joinData = {
            salaId: invitation.salaId,
            parentUser: invitation.parentUsername
        }
    }

    async function handleClick( e ){
        e.preventDefault()
        await axios({
            data: joinData,
            method: 'post',
            url: 'https://example2wanted.herokuapp.com/api/newUserInSala',
            headers: {
                authorization: props.token
            }
        }).then(res => {
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
                    <p>Invited for: <span>{invitation.host}</span></p>
                    <p>Room Name: <span>{invitation.salaName}</span></p>
                    <p>Price: <span>${invitation.price}</span></p>
                    <p>In Parent User: <span>{invitation.parentUsername}</span></p>
                    <p>Message: <span>{invitation.message ? invitation.message : 'Ninguno' }</span></p>
                    <button className='btn btn-dark btn-block invitation-button' onClick={handleClick}>Join</button>
                </div>
            }
           
        </Modal>
    )
}

export default withRouter(InvitationModal)