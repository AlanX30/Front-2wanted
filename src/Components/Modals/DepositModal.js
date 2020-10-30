import React, { useState } from 'react'
import Modal from './Modal'
import Swal from 'sweetalert2'
import axios from 'axios'
import '../Styles/DepositModal.css'
import { url } from '../../urlServer'
import { useFormValues } from '../../hooks/useFormValues'

export const DepositModal = props => {

    function formatNumber(number){
        return new Intl.NumberFormat("de-DE").format(number)
    }

    const amount = useFormValues()
    
    const [loading, setLoading] = useState(false)
    const [urlPay, setUrlPay] = useState('')
    const [buttonPay, setButtonPay] = useState(false)

    const onPay = async (e) => {

        e.preventDefault()
        setLoading(true)

        await axios({
            method: 'post',
            data: { price: amount.value },
            url: url+'/api/payments',
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
                setUrlPay(res.data)
                setButtonPay(true)
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

    function onCancel(){
        setButtonPay(false)
        props.onClose()
    }
    function onLinkPay(){
        setButtonPay(false)
        props.onClose()
    }

    return <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <form onSubmit={onPay} className='depositForm'>
            <h2>Ingrese Monto a depositar</h2>

            <input className={buttonPay ? 'dNone' : 'join-input'} type="text" {...amount} placeholder='$'/>
            <button className={buttonPay ? 'dNone' : 'next-depostit-modal btn btn-dark btn-block'} type='submit'>
                <div className={loading ? "spinner-conf spinner-border text-danger" : 'dNone'} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <p className={loading ? 'dNone' : ''}>Continuar</p>
            </button>

            <a onClick={onLinkPay} className={buttonPay ? 'link-mercadopago btn btn-dark btn-block' : 'dNone'} href={urlPay} rel="noopener noreferrer" target='_blank'>Confirmar pago por ${formatNumber(amount.value)}</a>

            <button className='btn btn-dark btn-block withdraw-modal-cancelar' type='button' onClick={onCancel}>Cancelar</button>

        </form>
    </Modal>
}