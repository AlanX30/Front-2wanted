import React, { useState, useContext } from 'react'
import { useFormValues } from '../../hooks/useFormValues'
import { Context } from '../../context'
import Modal from './Modal'
import Swal from 'sweetalert2'
import axios from 'axios'
import { url } from '../../urlServer'
import '../Styles/Withdraw2wantedModal.css'

export const Withdraw2wantedModal = props => {

    const [loading, setLoading] = useState(false)

    const { csrfToken } = useContext(Context)

    const amount = useFormValues()
    const address = useFormValues()

    const form = {
        user: props.user, 
        amount: amount.value,
        address: address.value
    }

    function handleWithdraw(){

        setLoading(true)

        axios({
            method: 'post',
            data: form,
            url: url+'/api/admin/user2wanted_withdraw',
            headers: {
                'X-CSRF-Token': csrfToken
            }
        })
        .then(res => {
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
                props.refresh()
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

        <div className='withdraw2wanted-modal-container'>
            <h1>Estas seguro?</h1>

            <div>
                <p>Registrar retiro de cuenta de 2Wanted con el usuario:</p>
                <h4>{props.user}</h4>
            </div>
            <div>
                <p>Disponible:</p>
                <h4>{props.available}</h4>
            </div>
            <div>
                <p>Usado:</p>
                <h4>{props.used}</h4>
            </div>
            <div>
                <p>Monto:</p>
                <input {...amount} placeholder='Monto' required type="number"/>
            </div>
            <div>
                <p>Direccion Btc</p>
                <input {...address} placeholder='Direccion' required type="text"/>
            </div>
            <div className='withdraw2wanted-modal-buttons'>
                <button onClick={props.onClose}>Cancelar</button>
                <button onClick={handleWithdraw}>{loading ? 'CARGANDO........' : 'Confirmar'}</button>
            </div>
        </div>

    </Modal>
}