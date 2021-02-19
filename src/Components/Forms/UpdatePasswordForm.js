import React, { useState } from 'react'
import '../../Pages/Styles/Profile.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import { MdInfo, MdLockOutline } from "react-icons/md"

const UpdatePasswordForm = ({useFormValues, url, token}) => {
    
    const [newPasswordError, setNewPasswordError] = useState(false)
    const [password_valid, setPassword_valid] = useState(true)
    const [passwordLoading, setPasswordLoading] = useState(false)

    const reg_password = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
    const password = useFormValues()
    const newPassword = useFormValues()
    const confirmNewPassword = useFormValues()

    function updatePassword(e){
        e.preventDefault()  

        if(!reg_password.test(newPassword.value)){
            return setPassword_valid(false)
         }else{setPassword_valid(true)}

        if(newPassword.value === confirmNewPassword.value){

            setPasswordLoading(true)

            axios({
                method: 'post',
                data: { password: password.value, newPassword: newPassword.value },
                url: url+'/edit/passwordemail',
                headers: {
                    authorization: token
                }
            }).then( res => {
                setPasswordLoading(false)
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
                setPasswordLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error,
                })
            })
        }else{return setNewPasswordError(true)}
    }

    return(
        <div className='password-configuration'>
            <h4><MdLockOutline />&nbsp;Change password</h4>
            <form onSubmit={updatePassword}>
                <input {...password} autoComplete='true' required type="password" placeholder='Password'/>
                <input {...newPassword} autoComplete='true' required type="password" placeholder='New password'/>
                <input {...confirmNewPassword} autoComplete='true' required type="password" placeholder='Confirm new password'/>
                <p className={newPasswordError ? 'configuration-warning' : 'dNone'}><MdInfo />the confirmation does not match</p>
                <p className={!password_valid ? 'configuration-warning' : 'dNone'}><MdInfo />&nbsp;Minimum 8 characters without spaces, upper and lower case</p>
                <button disabled={passwordLoading ? true : false}>
                    <div className={passwordLoading ? "spinner-conf spinner-border text-danger" : 'dNone'} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p className={passwordLoading ? 'dNone' : '' }> Update password </p>
                </button>
            </form>
        </div>
    )
}

export default UpdatePasswordForm