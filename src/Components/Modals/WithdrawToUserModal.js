import React, { useState } from 'react'
import Modal from './Modal'
import '../Styles/WithdrawToUserModal.css'
import { useFormValues } from '../../hooks/useFormValues'
import { MdInfo } from 'react-icons/md'
import { url } from '../../urlServer'
import PasswordVerification from './PasswordVerfication'

const WithdrawToUserModal = props => {

    const [confirm, setConfirm] = useState(false)
    const [errorAmount, setErrorAmount] = useState(false)
    const [modalOpen, setModalOpen] = useState(null)
    const [errorBalance, setErrorBalance] = useState(false)
    const [errorUser, setErrorUser] = useState(false)

    const user = useFormValues()
    const amount = useFormValues()

    function onCloseModal(){
        setModalOpen(null)
    }

    const amountNumber = Number(amount.value)

    function onError(){
        if(!user.value){ 
            setErrorUser(true)
            return
        }else{ setErrorUser(false) }
        if(amountNumber === 'Invalid value') { return }
        if(amountNumber < 0.00005) { 
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

    function onClose(){
        setConfirm(false)
        props.onClose()
    }

    const data = {amount: amount.value, username: `@${user.value}`}

    async function handleWithdraw(e){
        e.preventDefault()
        setModalOpen(true)
    }
    
    const wallet = props.wallet ? props.wallet.toString().slice(0,9) : 0

    return <Modal isOpen={props.isOpen} onClose={onClose}>
        <form onSubmit={handleWithdraw} className='withdraw-toUser-form'>
            <h2>Send Bitcoin to user</h2>

            <h4>Wallet {wallet} BTC</h4>

            <div className={confirm ? 'withdraw-toUser-confirm' : 'dNone'}>
                <h4>
                    To user:
                </h4>
                <p>@{user.value}</p>
            </div>

            <div className={confirm ? 'dNone' : ''}>
                <div className='toUser-div1'>
                    <div className="pre-formS">
                        <div className="input-group-text invite-pre-form">@</div>
                    </div>
                    <input {...user} required={true} className='join-input' type="text" placeholder='User'/>
                </div>
                <p className={errorUser ? 'redLetters' : ''}><MdInfo />  The user must respect uppercase and lowercase letters.</p>
                <div className='toUser-div1'>
                    <div className="pre-formS">
                        <div className="input-group-text invite-pre-form">$</div>
                    </div>
                    <input {...amount} required={true} className='join-input' type='number' placeholder='Amount'/>
                </div>
                <p className={errorBalance ? 'redLetters' : 'dNone'}><MdInfo />  The balance in the wallet is not enough.</p>
                <p className={errorAmount ? 'redLetters' : ''}><MdInfo />  Minimum to send: 0.00005 BTC.</p>
            </div>
            
            <p className='toUser-info'>If it is the first deposit of the receiving user a fee of 0.00002 btc will be deducted.</p>
            <p className='toUser-info'>This transaction is instantaneous and free.</p>

            <button onClick={onError} className={!confirm ? 'btn btn-dark btn-block invitation-button' : 'dNone'} type='button'>Send</button>
            <button className={confirm ? 'btn btn-dark btn-block invitation-button' : 'dNone'} type='submit'>
                <p> Confirm withdrawal for {amount.value} BTC</p>
            </button>
            <button className='btn btn-dark btn-block toUser-cancelar' onClick={onClose} type='button'>Cancel</button>

        </form>
        <PasswordVerification isOpen={modalOpen} onClose={onClose} onClose2={onCloseModal} data={data} url={url+'/api/sendinternalbtc'} />
    </Modal>
}

export default WithdrawToUserModal