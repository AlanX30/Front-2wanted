import React from "react"
import Modal from "./Modal"
import Swal from 'sweetalert2'
import { useFormValues } from '../hooks/useFormValues'
import { MdInfo } from "react-icons/md"
import axios from 'axios'
import './Styles/Invite.css'
import { useState } from "react"

export const InviteModal = (props) => {
    
    const user = useFormValues()
    const message = useFormValues()

    let data

    if(props.data){
        data = {
            newUser: `@${user.value}`, parentUsername: props.data.parentUsername,
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
        
        await axios({
            data: data,
            method: 'post',
            url: 'https://example2wanted.herokuapp.com/api/new-invitation',
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
            }
        }).catch(err => {
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
           <h3>Invitar Usuario</h3>
            <form className='invite-form' onSubmit={handleSubmit}>
                <div className='d-flex'>
                    <div className="pre-formS">
                        <div className="input-group-text invite-pre-form">@</div>
                    </div>
                    <input {...user} type="text" placeholder='Usuario'/>
                </div>
                <div className="form-group mt-4 mb-4">
                    <input {...message} type="text" placeholder='Mensaje Opcional'/>
                    <label className={msg_valid ? 'dNone' : 'warning-invite'}><MdInfo />&nbsp;Maximo 50 caracteres</label>
                </div>
                <button className='btn btn-dark btn-block invitation-button'>Invitar</button>
            </form>
        </Modal>
    )
}