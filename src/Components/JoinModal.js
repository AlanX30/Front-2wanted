import React from 'react'
import Swal from 'sweetalert2'
import './Styles/JoinModal.css'
import { withRouter } from 'react-router-dom'
import Modal from './Modal'
import axios from 'axios'
import { useFormValues } from '../hooks/useFormValues'

const JoinModal = (props) => {

    const parentUser = useFormValues()

    const joinData = {
        salaId: props.salaId,
        parentUser: parentUser.value
    }

    async function handleSubmit( e ){

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

export default withRouter(JoinModal)