import React, { useContext, useState } from 'react'
import { useFormValues } from '../../hooks/useFormValues'
import {  MdLockOutline } from "react-icons/md"
import { Context } from '../../context'
import Modal2 from './Modal2'
import Swal from 'sweetalert2'
import axios from 'axios'

const PasswordVerificationNewRoom = props => {

    const { csrfToken } = useContext(Context)

    const [createLoading, setCreateLoading] = useState(false)

    const password = useFormValues()

    const payload = {...props.data, password: password.value}

    function onConfirm(e){
        e.preventDefault()
        setCreateLoading(true)
        axios({
            data: payload,
            method: 'post',
            url: props.url,
            headers: { 
                'X-CSRF-Token': csrfToken
            }
        }).then(res => {
            setCreateLoading(false)
            if (res.data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.error
                })
            }else{ 
                if(props.onClose2){props.onClose2()}
                if(props.onClose){props.onClose()}
                props.history.push(`/sala/${res.data.id}`)
            }
        }).catch(err => {
            setCreateLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err,
            })
        })
    }

    return <Modal2 isOpen={props.isOpen} onClose={props.onClose}>
        <form onSubmit={onConfirm}>
            <h4>Ingresa tu contraseña</h4>
            <div className='mb-3 mt-1 d-flex'>
                <div className="pre-formS">
                    <div className="input-group-text invite-pre-form"><MdLockOutline /></div>
                </div>
                <input className='join-input' {...password} type="password"/>
            </div>
            <button className='btn btn-dark btn-block invitation-button' disabled={createLoading ? true : false}>
                <div className={createLoading ? "spinner-border loading-login text-danger" : 'dNone'} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <p className={createLoading ? 'dNone' : ''}>Confirmar!</p>
            </button>
        </form>
    </Modal2>
}

export default PasswordVerificationNewRoom