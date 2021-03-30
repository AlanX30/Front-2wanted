import React, { useState } from 'react'
import Modal from './Modal'
import PasswordVerification from './PasswordVerfication' 
import { useFormValues } from '../../hooks/useFormValues'
import { url } from '../../urlServer'
import { MdInfo } from 'react-icons/md'
import '../Styles/WithdrawModal.css'

export const WithdrawModal = props => {

    const [confirm, setConfirm] = useState(false)
    const [errorAmount, setErrorAmount] = useState(false)
    const [errorBalance, setErrorBalance] = useState(false)
    const [errorAdress, setErrorAddress] = useState(false)
    const [modalOpen, setModalOpen] = useState(null)

    const fee = 0.0001
    const amount = useFormValues()
    const address = useFormValues()
    const amountNumber = Number(amount.value)
    const amountWithFee = amountNumber - fee

    const data = {amount: amount.value, address: address.value}

    let totalAmount = isNaN(amountNumber) ? 'Invalid value' : amountNumber === 0 ? 0 : amountWithFee.toFixed(7)

    function onCloseModal(){
        setModalOpen(null)
    }

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
        setModalOpen(true)
    }

    const wallet = props.wallet ? props.wallet.toFixed(7) : 0

    return <Modal isOpen={props.isOpen} onClose={onClose}>
            <form className='withdraw-modal' onSubmit={handleWithdraw} >
                <h2>Send Bitcoin to address</h2>
                <h4>Wallet {wallet} BTC</h4>
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
                    <p><MdInfo />  Fee: 0.0001 BTC.</p>
                    <p><MdInfo />  Bitcoin transactions usually take 20 minutes to 1 day to complete.</p>
                </div>

                <button onClick={onError} className={!confirm ? 'btn btn-dark btn-block invitation-button' : 'dNone'} type='button'>Send</button>
                <button className={confirm ? 'btn btn-dark btn-block invitation-button' : 'dNone'} type='submit'>
                    <p> Confirm withdrawal for {Number(amount.value).toFixed(7)}</p>
                </button>
                <button className='btn btn-dark btn-block withdraw-modal-cancelar' onClick={onClose} type='button'>Cancel</button>
            </form>

            <PasswordVerification isOpen={modalOpen} onClose={onClose} onClose2={onCloseModal} data={data} url={url+'/api/sendbtc'} />
        </Modal>
}