import React, { useState, useContext } from 'react'
import { Context } from '../../context'
import Modal from './Modal'
import Swal from 'sweetalert2'
import axios from 'axios'
import { url } from '../../urlServer'

export const MailModal = props => {

    const [loading, setLoading] = useState(false)

    const { csrfToken } = useContext(Context)

    function handleEmailPersonalized(){

        setLoading(true)

        axios({
            method: 'post',
            data: { msg: props.msg, asunto: props.asunto, user: `@${props.user}` },
            url: url+'/api/admin/mailpersonalized',
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
                setLoading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res.data.msg,
                })
                props.onClose()
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

    return <Modal isOpen={props.isOpen} onClose={props.onClose}>

        <h1>Estas seguro?</h1>

        <p>Enviar Email al usuario:</p>
        <h2> {props.user} </h2>
        <p>Con el asunto:</p>
        <h2> {props.asunto} </h2>

        <div className='withdraw2wanted-modal-buttons'>
            <button onClick={props.onClose}>Cancelar</button>
            <button onClick={handleEmailPersonalized}>{loading ? 'CARGANDO........' : 'Confirmar'}</button>
        </div>
    </Modal>
}