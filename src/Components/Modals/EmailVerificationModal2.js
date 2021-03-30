import React, { useState, useContext } from 'react'
import { useFormValues } from '../../hooks/useFormValues'
import Modal from './Modal'
import Swal from 'sweetalert2'
import axios from 'axios'
import { url } from '../../urlServer'
import { Context } from '../../context'
import { MdRefresh } from 'react-icons/md'
import '../Styles/EmailVerificationModal.css'

const EmailVerificationModal2 = props => {

    const [loading, setLoading] = useState(false)

    const { toggleAuth, csrfToken } = useContext(Context)

    const code = useFormValues()

    async function onConfirm(e){

        e.preventDefault()

        setLoading(true)

        await axios({
            data: {email: props.email, code: code.value},
            method: 'post',
            url: url+'/api/mailverification',
            headers: { 
                'X-CSRF-Token': csrfToken
            }
        }).then(res => {
            setLoading(false)
            if(res.data.error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.error,
                })
            }else if(res.data === 'has exceeded the number of attempts, try again in 10 minutes'){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data,
                })
            }else{
                toggleAuth(res.data.userName)
                props.props.history.push(`/home`)
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

    async function handleRefresh(){

        setLoading(true)

        await axios({
            data: {email: props.email},
            method: 'post',
            url: url+'/api/mailverificationRefresh'
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
        <div className='emailVerification'>

            <h4>Enter the six-digit code sent to your email.</h4>
            
            <form onSubmit={onConfirm} className='input-verificationemail'> 
                <input maxLength='6' className='join-input' {...code} type="text" placeholder='Code'/>
                <button> Confirm </button>
            </form>

            <label>If you have not received any email or want to resend, press the retry button</label>
            <button onClick={handleRefresh} disabled={loading ? true : false} className='btn btn-dark btn-block invitation-button'>
                <div className={loading ? "spinner-conf spinner-border text-danger" : 'dNone'} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <p  className={loading ? 'dNone' : ''}><MdRefresh />Retry</p>
            </button>
        </div>
    </Modal>
}

export default EmailVerificationModal2