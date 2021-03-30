import React, { useContext, useState } from 'react'
import { useFormValues } from '../../hooks/useFormValues'
import {  MdLockOutline } from "react-icons/md"
import { Context } from '../../context'
import Modal2 from './Modal2'
import Swal from 'sweetalert2'
import axios from 'axios'

const PasswordVerification = props => {

    const { csrfToken } = useContext(Context)

    const [loading, setLoading] = useState(false)

    const password = useFormValues()

    const payload = {...props.data, password: password.value}

    function onConfirm(e){

        e.preventDefault()

        setLoading(true)

        axios({
            data: payload,
            method: 'post',
            url: props.url,
            headers: { 
                'X-CSRF-Token': csrfToken
            }
        }).then(res => {
            setLoading(false)
            if(res.data.error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.error,
                })
            }else{
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res.data.msg,
                })
                if(props.onClose2){props.onClose2()}
                if(props.onClose){props.onClose()}
            }
        }).catch(err => {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err,
            })
        })
    }

    return <Modal2 isOpen={props.isOpen} onClose={props.onClose2}>
        <form onSubmit={onConfirm}>
            <h4>Enter your password</h4>
            <div className='mb-3 mt-1 d-flex'>
                <div className="pre-formS">
                    <div className="input-group-text invite-pre-form"><MdLockOutline /></div>
                </div>
                <input className='join-input' {...password} type="password"/>
            </div>
            <button className='btn btn-dark btn-block invitation-button' disabled={loading ? true : false}>
                <div className={loading ? "spinner-border loading-login text-danger" : 'dNone'} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <p className={loading ? 'dNone' : ''}>Confirm!</p>
            </button>
        </form>
    </Modal2>
}

export default PasswordVerification