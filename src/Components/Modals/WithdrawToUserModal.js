import React, { useState } from 'react'
import Swal from 'sweetalert2'
import Modal from './Modal'
import axios from 'axios'
import '../Styles/WithdrawToUserModal.css'
import { useFormValues } from '../../hooks/useFormValues'
import { MdInfo } from 'react-icons/md'
import { url } from '../../urlServer'

const WithdrawToUserModal = props => {

    const [loading, setLoading] = useState(false)
    const [confirm, setConfirm] = useState(false)

    const [errorAmount, setErrorAmount] = useState(false)
    const [errorBalance, setErrorBalance] = useState(false)
    const [errorUser, setErrorUser] = useState(false)

    const user = useFormValues()
    const amount = useFormValues()

    const amountNumber = Number(amount.value)

    function onError(){
        if(!user.value){ 
            setErrorUser(true)
            return
        }else{ setErrorUser(false) }
        if(amountNumber === 'Invalid value') { return }
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

    function onClose(){
        setConfirm(false)
        props.onClose()
    }

    async function handleWithdraw(e){
        e.preventDefault()

        setLoading(true)

        await axios({
            data: {amount: amount.value, username: `@${user.value}`},
            method: 'post',
            url: url+'/api/sendinternalbtc',
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
        <form onSubmit={handleWithdraw} className='withdraw-toUser-form'>
            <h2>Send Bitcoin to user</h2>

            <h4>Wallet ${props.wallet}</h4>

            <div className={confirm ? 'withdraw-toUser-confirm' : 'dNone'}>
                <h4>
                    To user:
                </h4>
                <p>{user.value}</p>
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
                    <input {...amount} required={true} className='join-input' type="text" placeholder='Amount'/>
                </div>
                <p className={errorBalance ? 'redLetters' : 'dNone'}><MdInfo />  The balance in the wallet is not enough.</p>
                <p className={errorAmount ? 'redLetters' : ''}><MdInfo />  Minimum to send: 0.00005 BTC.</p>
            </div>
            
            <p className='toUser-info'>This transaction is instantaneous and free.</p>

            <button onClick={onError} className={!confirm ? 'btn btn-dark btn-block invitation-button' : 'dNone'} type='button'>Send</button>
            <button disabled={loading ? true : false} className={confirm ? 'btn btn-dark btn-block invitation-button' : 'dNone'} type='submit'>
                <div className={loading ? "spinner-conf spinner-border text-danger" : 'dNone'} role="status">
                        <span className="sr-only">Loading...</span>
                </div>
                <p className={loading ? 'dNone' : ''}> Confirm withdrawal for {amount.value}</p>
            </button>
            <button className='btn btn-dark btn-block toUser-cancelar' onClick={onClose} type='button'>Cancel</button>

        </form>
    </Modal>
}

export default WithdrawToUserModal