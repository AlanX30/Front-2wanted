import React, { useState } from 'react'
import Modal from './Modal'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useFormValues } from '../../hooks/useFormValues'
import { url } from '../../urlServer'
import '../Styles/WithdrawModal.css'

export const WithdrawModal = props => {

    const [loading, setLoading] = useState(false)
    const [confirm, setConfirm] = useState(false)

    const amount = useFormValues()

    function formatNumber(number){
        return new Intl.NumberFormat("de-DE").format(number)
    }

    async function handleWithdraw(e){
        e.preventDefault()

        setLoading(true)

        await axios({
            data: {amount: amount.value},
            method: 'post',
            url: url+'/api/newWithdraw',
            headers: {
                authorization: props.token
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
                props.onClose()
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
            <h4 className={props.wallet >= 20000 ? 'dNone' : ''}>
                Retiros apartir de $20.000
            </h4>
            <form className={props.wallet >= 20000 ? 'withdraw-modal' : 'dNone'} onSubmit={handleWithdraw} >
                <h2>Ingrese monto a retirar</h2>
                <h4>Disponible ${formatNumber(props.wallet)}</h4>
                <input {...amount} className='join-input' type="text" placeholder='$'/>
                <button onClick={()=>setConfirm(true)} className={!confirm ? 'btn btn-dark btn-block invitation-button' : 'dNone'} type='button'>Retirar</button>
                <button disabled={loading ? true : false} className={confirm ? 'btn btn-dark btn-block invitation-button' : 'dNone'} type='submit'>
                    <div className={loading ? "spinner-conf spinner-border text-danger" : 'dNone'} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p className={loading ? 'dNone' : ''}>Confirmar retiro por {formatNumber(amount.value)}</p>
                </button>
                <button className='btn btn-dark btn-block withdraw-modal-cancelar' onClick={props.onClose} type='button'>Cancelar</button>
            </form>
        </Modal>
}