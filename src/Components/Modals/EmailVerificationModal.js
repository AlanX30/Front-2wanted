import React, { useState } from 'react'
import Modal from './Modal'
import Swal from 'sweetalert2'
import axios from 'axios'
import { url } from '../../urlServer'
import { useFormValues } from '../../hooks/useFormValues'
import { MdRefresh } from 'react-icons/md'
import '../Styles/EmailVerificationModal.css'

const EmailVerificationModal = props => {

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState(props.email)
    const [loadingForm, setLoadingForm] = useState(false)
    
    async function handleRefresh(){

        setLoading(true)

        await axios({
            data: {email: email},
            method: 'post',
            url: url+'/api/mailverificationRefresh'
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

    const newEmail = useFormValues()

    async function handleChangeEmail(e){

        e.preventDefault()

        setLoadingForm(true)

        await axios({
            data: {newEmail: newEmail.value, oldEmail: email},
            method: 'post',
            url: url+'/api/changemailverification'
        }).then(res => {
            setLoadingForm(false)
            if(res.data.error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.error,
                })
            }else{setEmail(res.data.email)}
        }).catch(err => {
            setLoadingForm(false)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err,
            })
        }) 
    }

    return <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <div className='emailVerification'>
            <h4>Se ha enviado un link de verificacion a la direccion de email, confirme para acceder.</h4>

            <form onSubmit={handleChangeEmail}>
                <p>Cambiar email en caso de equivocacion y pulsar reintentar</p>
                <div>
                    <input {...newEmail} className='join-input' placeholder='Email' type='email'/>
                    <button disabled={loadingForm ? true : false}>Cambiar</button>
                </div>
            </form>

            <label>Si, no ha recibido ningun email, pulse el boton reintentar</label>
            <button onClick={handleRefresh} disabled={loading || loadingForm ? true : false} className='btn btn-dark btn-block invitation-button'>
                <div className={loading ? "spinner-conf spinner-border text-danger" : 'dNone'} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <p  className={loading ? 'dNone' : ''}><MdRefresh /> Reintentar</p>
            </button>
        </div>
    </Modal>
}

export default EmailVerificationModal