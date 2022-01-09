import React, { useContext, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useFormValues } from '../hooks/useFormValues'
import { Context } from '../context' 
import { MdMail } from "react-icons/md"
import { url } from '../urlServer'
import './Styles/Contact_us.css'

export const Contact_us = () => {

    const { csrfToken } = useContext(Context)

    const [ loading, setLoading ] = useState(false)

    const asunto = useFormValues()
    const emailPersonalized = useFormValues()

    const data = {
        asunto: asunto.value,
        msg: emailPersonalized.value
    }

    function handleSubmit(e){

        e.preventDefault()
        setLoading(true)

        axios({
            method: 'post',
            data: data,
            url: url+'/api/contact_us_email',
            headers: { 
                'X-CSRF-Token': csrfToken
            }
        })
        .then(res => {
            setLoading(false)
            if(res.data.error) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.error,
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.msg,
                })
            }
        }).catch( err => {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err,
            })
        })
    }

    return<div className='balance-container'>
            <h1 className='text-center'>Contactanos</h1>

            <form onSubmit={handleSubmit}>
                <div className='contact_text'>
                    <p>Envíe una solicitud y será respondida lo antes posible a su correo electrónico</p>
                    <p>O envienos un correo a nuestro email &nbsp; <MdMail /> support@2wanted.com</p>
                </div>
                <div>
                    <input className='contact_asunto' required {...asunto} type="text" placeholder='Asunto'/>
                    <textarea className='contact_msg' required {...emailPersonalized} placeholder='Mensaje'/>
                </div>
                <button disabled={loading ? true : false} className='contact_send'>
                    <div className={loading ? "spinner-border loading-login text-danger" : 'dNone'} role="status">
                        <span className="sr-only">Cargando...</span>
                    </div>
                    <p className={loading ? 'dNone' : ''}>Enviar</p>
                </button>
            </form>
        
        </div>
}