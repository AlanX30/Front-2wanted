import React, { useState, useContext } from "react"
import Modal from "./Modal"
import Swal from 'sweetalert2'
import { Context } from '../../context'
import { useFormValues } from '../../hooks/useFormValues'
import { MdInfo } from "react-icons/md"
import axios from 'axios'
import '../Styles/Invite.css'
import { url } from '../../urlServer'

export const InviteModal = (props) => {
    
    const user = useFormValues()
    const message = useFormValues()
    const { csrfToken } = useContext(Context)
    const [inviteLoading, setInviteLoading] = useState(false)

    let data
    
    if(props.data){

        let parentUser = props.data.parentUsername ? props.data.parentUsername.split(" ")[0] : ''
        
        data = {
            newUser: `@${user.value}`, parentUsername: parentUser,
            message: message.value, salaId: props.data.salaId,
            price: props.data.price, salaName: props.data.salaName, host: props.data.host
        }
    }

    const [msg_valid, setMsg_valid] = useState(true)

    async function handleSubmit( e ){
        e.preventDefault()

        if(message.value.length > 50){
            return setMsg_valid(false)
        }else{setMsg_valid(true)}

        setInviteLoading(true)
        
        await axios({
            data: data,
            method: 'post',
            url: url+'/api/new-invitation',
            headers: { 
                'X-CSRF-Token': csrfToken
            }
        }).then(res => {
            setInviteLoading(false)
            if(res.data.error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.error,
                })
            }else{
                Swal.fire({
                    icon: 'success',
                    title: 'Invitation sent',
                })
            }
        }).catch(err => {
            setInviteLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err,
            })
        })

        props.onClose() 
    }
    
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
           <h3>Invite user</h3>
            <form className='invite-form' onSubmit={handleSubmit}>
                <div className='d-flex'>
                    <div className="pre-formS">
                        <div className="input-group-text invite-pre-form">@</div>
                    </div>
                    <input {...user} type="text" placeholder='User'/>
                </div>
                <div className="form-group mt-4 mb-4">
                    <input {...message} type="text" placeholder='Optional message'/>
                    <label className={msg_valid ? 'dNone' : 'warning-invite'}><MdInfo />&nbsp;Maximum 50 characters</label>
                </div>
                <button disabled={inviteLoading ? true : false} className='btn btn-dark btn-block invitation-button'>
                    <div className={inviteLoading ? "spinner-conf spinner-border text-danger" : 'dNone'} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p className={inviteLoading ? 'dNone' : ''}>Invite</p>
                </button>
            </form>
        </Modal>
    )
}