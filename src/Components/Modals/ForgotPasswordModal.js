import React, { useState, useContext } from 'react'
import Modal from './Modal'
import { useFormValues } from '../../hooks/useFormValues'
import { Context } from '../../context'
import Swal from 'sweetalert2'
import axios from 'axios'
import { url } from '../../urlServer'

const ForgotPasswordModal = props => {
    
    const [ loading, setLoading ] = useState(false) 
    const [ count, setCount ] = useState(0)
    const { csrfToken } = useContext(Context)
    const email = useFormValues()

    async function handleForgotPassword(e){
        e.preventDefault()

        setLoading(true)

        await axios({
            method: 'post',
            data: { email: email.value },
            url: url+'/api/forgotpassword',
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
                setCount(count + 1)
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res.data.msg,
                })
            }
        }).catch(error => {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
            })
        })
    }


    return <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <div>
            <h4>Olvidaste tu contraseña?</h4>
            <form onSubmit={handleForgotPassword}>
                <p>Ingresa tu email de acceso y recibiras un link de acceso en tu correo.</p>
                <input required className='join-input forgotModalInput' {...email} placeholder='Email' type='email'/>
                <button disabled={loading ? true : false} className='btn btn-dark btn-block invitation-button'>
                    <div className={loading ? "spinner-conf spinner-border text-danger" : 'dNone'} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p  className={loading ? 'dNone' : ''}>{count > 0 ? 'Reenviar' : 'Enviar'}</p>
                </button>
            </form>
        </div>
    </Modal>
}

export default ForgotPasswordModal