import React from 'react'
import './Styles/JoinModal.css'
import Modal from './Modal'
import axios from 'axios'
import { useFormValues } from '../hooks/useFormValues'

export const JoinModal = (props) => {

    const parentUser = useFormValues()

    const joinData = {
        salaId: props.salaId,
        parentUser: parentUser.value
    }

    async function handleSubmit( e ){
        console.log(joinData)
        e.preventDefault()
        await axios({
            data: joinData,
            method: 'post',
            url: 'http://localhost:3500/api/newUserInSala',
            headers: {
                authorization: props.token
                }
        })
        props.onClose() 

    }

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <div className='join-modal'>
                <h2>Are You sure?</h2>
                <p>Price: <span>${props.price}</span></p>

                <form onSubmit={handleSubmit}>
                    <p>Enter Parent Username</p>
                    <div className="form-group">
                        <input {...parentUser} type="text" className='form-control'/>
                    </div>
                    <button className='btn btn-dark'>Confirm</button>
                </form>
            </div>
        </Modal>
    )
}