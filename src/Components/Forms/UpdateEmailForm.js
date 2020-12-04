import React, { useState } from 'react'
import '../../Pages/Styles/Profile.css'
import Swal from 'sweetalert2'
import { MdInfo, MdMail } from "react-icons/md"
import axios from 'axios'

const UpdateEmailForm = ({url, useFormValues, token}) => {

    const [newEmailError, setNewEmailError] = useState(false)
    const [emailLoading, setEmailLoading] = useState(false)
    
    const email = useFormValues()
    const newEmail = useFormValues()
    const confirmNewEmail = useFormValues()

    function updateEmail(e){
        e.preventDefault()

        if(newEmail.value === confirmNewEmail.value){

            setEmailLoading(true)

            axios({
                method: 'post',
                data: { newEmail: newEmail.value, email: email.value },
                url: url+'/edit/passwordemail',
                headers: {
                    authorization: token
                }
            }).then( res => {
                setEmailLoading(false)
                if(res.data.error){
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: res.data.error,
                    })
                }else{
                    Swal.fire({
                        icon: 'success',
                        title: res.data.msg,
                    })
                }
            }).catch( error => {
                setEmailLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error,
                })
            })
            
        }else{return  setNewEmailError(true)}
    }

    return(
        <div className='email-configuration'>
            <h4><MdMail />&nbsp;Change Email</h4>
            <form onSubmit={updateEmail}>
                <input id='changeEmail' autoComplete='true' {...email} required type="email" placeholder='Email'/>
                <input {...newEmail} autoComplete='true' required type="email" placeholder='New email'/>
                <input {...confirmNewEmail} autoComplete='true' required type="email" placeholder='Confirm new email'/>
                <p className={newEmailError ? 'configuration-warning' : 'dNone'}><MdInfo />The confirmation does not match</p>
                <button disabled={emailLoading ? true : false}>
                    <div className={emailLoading ? "spinner-conf spinner-border text-danger" : 'dNone'} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p className={emailLoading ? 'dNone' : '' }>Update email</p>
                </button>
            </form>
        </div>
    )
}

export default UpdateEmailForm
