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

    const user = useFormValues()
    const amount = useFormValues()

    return <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <form>
            <h2>Send Bitcoin to user</h2>
            
            <div className='toUser-div1'>
                <div className="pre-formS">
                    <div className="input-group-text invite-pre-form">@</div>
                </div>
                <input {...user} className='join-input' type="text" placeholder='User'/>
            </div>
            <p><MdInfo />  The user must respect uppercase and lowercase letters.</p>
            <div className='toUser-div1'>
                <div className="pre-formS">
                    <div className="input-group-text invite-pre-form">$</div>
                </div>
                <input {...amount} className='join-input' type="text" placeholder='Amount'/>
            </div>
            <p><MdInfo />  Minimum to send: 0.00005 BTC.</p>

            
            <p className='toUser-info'>This transaction is instantaneous and free.</p>

            <button onClick={()=>setConfirm(true)} className={!confirm ? 'btn btn-dark btn-block invitation-button' : 'dNone'} type='button'>Send</button>
            <button disabled={loading ? true : false} className={confirm ? 'btn btn-dark btn-block invitation-button' : 'dNone'} type='submit'>
                <div className={loading ? "spinner-conf spinner-border text-danger" : 'dNone'} role="status">
                        <span className="sr-only">Loading...</span>
                </div>
                <p className={loading ? 'dNone' : ''}>Confirmar retiro por {amount.value}</p>
            </button>
            <button className='btn btn-dark btn-block toUser-cancelar' onClick={props.onClose} type='button'>Cancel</button>

        </form>
    </Modal>
}

export default WithdrawToUserModal