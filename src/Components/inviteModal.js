import React from "react"
import Modal from "./Modal"
import { useFormValues } from '../hooks/useFormValues'
import axios from 'axios'

export const InviteModal = (props) => {
    
    const user = useFormValues()
    const message = useFormValues()

    let data

    if(props.data){
        data = {
            newUser: user.value, parentUsername: props.data.parentUsername,
            message: message.value, salaId: props.data.salaId,
            price: props.data.price, salaName: props.data.salaName
        }
    }

    async function handleSubmit( e ){
        e.preventDefault()
        const res = await axios({
            data: data,
            method: 'post',
            url: 'http://localhost:3500/user/invite',
            headers: {
                authorization: props.token
            }
        })
        console.log(res)
        props.onClose() 
    }
    console.log(data)
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
           <h3>Invite User</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <p>User</p>
                    <input {...user} type="text" className='form-control'/>
                </div>
                <div className="form-group">
                    <p>Message</p>
                    <input {...message} type="text" placeholder='Optional' className='form-control'/>
                </div>
                <button className='btn btn-dark btn-block'>Invite</button>
            </form>
        </Modal>
    )
}