import React, { useState } from "react"
import Swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'
import './Styles/InvitationModal.css'
import Modal from "./Modal"
import axios from 'axios'

const InvitationModal = (props) => {

    function formatNumber(number){
        return new Intl.NumberFormat("de-DE").format(number)
    }

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
            url: 'https://example2wanted.herokuapp.com/api/newUserInSala',
            headers: {
                authorization: props.token
            }
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
                    <p>Invitado por: <span>{invitation.host}</span></p>
                    <p>Nombre de sala: <span>{invitation.salaName}</span></p>
                    <p>Valor: <span>${formatNumber(invitation.price)}</span></p>
                    <p>Usuario padre: <span>{invitation.parentUsername}</span></p>
                    <p>Mensaje: <span>{invitation.message ? invitation.message : 'Ninguno' }</span></p>
                    <button className='btn btn-dark btn-block invitation-button' onClick={handleClick}>
                        <div className={invitationLoading ? "spinner-conf spinner-border text-danger" : 'dNone'} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <p  className={invitationLoading ? 'dNone' : ''}>Unirse</p>
                    </button>
                </div>
            }
           
        </Modal>
    )
}

export default withRouter(InvitationModal)