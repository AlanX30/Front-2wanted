import React, { useState } from 'react'
import Modal from './Modal'
import Swal from 'sweetalert2'
import axios from 'axios'
import { url } from '../../urlServer'
import { MdRefresh } from 'react-icons/md'
import '../Styles/EmailVerificationModal.css'

const EmailVerificationModal2 = props => {

    const [loading, setLoading] = useState(false)

    async function handleRefresh(){

        setLoading(true)

        await axios({
            data: {email: props.email},
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

    return <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <div className='emailVerification'>
            <h4>Este usuario no ha confirmado email de registro, para acceder dirigirse a link de correo y confirmar.</h4>
            <label>Si no ha recibido ningun email o desea reenviar, pulse el boton reintentar</label>
            <button onClick={handleRefresh} disabled={loading ? true : false} className='btn btn-dark btn-block invitation-button'>
                <div className={loading ? "spinner-conf spinner-border text-danger" : 'dNone'} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <p  className={loading ? 'dNone' : ''}><MdRefresh /> Reintentar</p>
            </button>
        </div>
    </Modal>
}

export default EmailVerificationModal2