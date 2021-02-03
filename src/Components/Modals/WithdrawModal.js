import React, { useState } from 'react'
import Modal from './Modal'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useFormValues } from '../../hooks/useFormValues'
import { MdInfo } from 'react-icons/md'
import { url } from '../../urlServer'
import '../Styles/WithdrawModal.css'

export const WithdrawModal = props => {

    const [loading, setLoading] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [errorAmount, setErrorAmount] = useState(false)
    const [errorBalance, setErrorBalance] = useState(false)
    const [errorAdress, setErrorAddress] = useState(false)

    const amount = useFormValues()
    const address = useFormValues()
    const amountNumber = Number(amount.value)
    const amountWithFee = amountNumber - 0.00005

    let totalAmount = isNaN(amountNumber) ? 'Invalid value' : amountNumber === 0 ? 0 : amountWithFee.toFixed(7)

    function onClose(){
        setConfirm(false)
        props.onClose()
    }

    function onError(){ 
        if(totalAmount === 'Invalid value') { return }
        if(address.value.length < 20 || address.value.length > 50){ 
            setErrorAddress(true)
            return 
        }else{ setErrorAddress(false) }
        if(amountNumber < 0.0003) { 
            setErrorAmount(true)
            return
        }else{ 
            setErrorAmount(false)
        }
        if(props.wallet < amountNumber) { setErrorBalance(true)}else{
            setErrorBalance(false)
            setConfirm(true)
        }
    }
    
    async function handleWithdraw(e){
        e.preventDefault()

        setLoading(true)

        await axios({
            data: {amount: amount.value, address: address.value},
            method: 'post',
            url: url+'/api/sendbtc',
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

    return <Modal isOpen={props.isOpen} onClose={onClose}>
            <form className='withdraw-modal' onSubmit={handleWithdraw} >
                <h2>Send Bitcoin to address</h2>
                <h4>Wallet ${props.wallet}</h4>
                <div className={confirm ? 'withdraw-confirm-address' : 'dNone'}>
                    <h4>To Address:</h4>
                    <p>{address.value}</p>
                </div>
                <div className={confirm ? 'dNone' : ''}>
                    <div>
                        <p className='p-withdrawModal'>Address</p>
                        <input {...address} required={true} className='join-input' type="text" placeholder='bc1qwyxy6s5zegv70ynz247qwyypnns4zy6ljz8tst'/>
                        <p className={errorAdress ? 'minimun-withdraw-p minimunBtc' : 'dNone'}><MdInfo />  Invalid address.</p>
                    </div>
                    <div>
                        <p className='p-withdrawModal'>Amount</p>
                        <input {...amount} required={true} className='join-input' type="text" placeholder='$ 0.01'/>
                        <p className={errorBalance ? 'minimun-withdraw-p minimunBtc' : 'dNone'}><MdInfo />  The balance in the wallet is not enough.</p>
                        <p className={errorAmount ? 'minimun-withdraw-p minimunBtc' : 'minimun-withdraw-p'}><MdInfo />  Minimum amount 0.0003 BTC.</p>
                    </div>
                </div>
                <div className='total-receive-withdraw'>
                    <p>Total to receive in address: <span className={totalAmount === 'Invalid value' ? 'total-receive-span' : ''}>{totalAmount}</span></p>
                </div>
                <div>
                    <p><MdInfo />  Fee: 0.00005 BTC.</p>
                    <p><MdInfo />  Bitcoin transactions usually take 20 minutes to 1 day to complete.</p>
                </div>

                <button onClick={onError} className={!confirm ? 'btn btn-dark btn-block invitation-button' : 'dNone'} type='button'>Send</button>
                <button disabled={loading ? true : false} className={confirm ? 'btn btn-dark btn-block invitation-button' : 'dNone'} type='submit'>
                    <div className={loading ? "spinner-conf spinner-border text-danger" : 'dNone'} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p className={loading ? 'dNone' : ''}> Confirm withdrawal for {Number(amount.value)}</p>
                </button>
                <button className='btn btn-dark btn-block withdraw-modal-cancelar' onClick={onClose} type='button'>Cancel</button>
            </form>
        </Modal>
}