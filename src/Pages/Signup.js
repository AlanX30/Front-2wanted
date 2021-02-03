import React, { useContext, useState } from 'react'
import { useFormValues } from '../hooks/useFormValues'
import Swal from 'sweetalert2'
import NavbarLogin from '../Components/NavbarLogin'
import { MdInfo, MdLockOutline, MdMail } from "react-icons/md";
import { Context } from '../context'
import axios from 'axios'
import IMG from '../Images/bigLogo.svg'
import './Styles/Signup.css'
import { url } from '../urlServer'
import Cookies from 'js-cookie'
import EmailVerificationModal from '../Components/Modals/EmailVerificationModal';

export const Signup = (props) => {

    const token = Cookies.get('token')

    if(token){
        props.history.push(`/home`)
    }

    const reg_password = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
    const reg_whiteSpace = /^$|\s+/

    const { toggleAuth } = useContext(Context)

    const [modalOpen, setModalOpen] = useState(false)
    
    function onCloseModal(){
        setModalOpen(null)
    }

    const userName = useFormValues()
    const email = useFormValues()
    const email2 = useFormValues()
    const password = useFormValues()
    const confirm_password = useFormValues()

    const form = {
        userName: `@${userName.value}`,
        email: email.value,
        password: password.value,
        confirm_password: confirm_password.value,
    }

    const [validEmail, setValidEmail] = useState(true)
    const [password_valid, setPassword_valid] = useState(true)
    const [userValid, setUserValid] = useState(true)

    const [signupLoading, setSignupLoading] = useState(false)

    function handleSubmit( e ){
        e.preventDefault()
        
        if(userName.value.length < 4 || userName.value.length > 16){return setUserValid(false)}else{setUserValid(true)}
        if(email2 === email){ setValidEmail(true)}else{ return setValidEmail(false)}
        if(reg_whiteSpace.test(userName.value)){return setUserValid(false)}else{setUserValid(true)}
        if(!reg_password.test(password.value)){return setPassword_valid(false)}else{setPassword_valid(true)}

        setSignupLoading(true)

        axios.post( url+'/api/users/signup', form)
        .then(res => {
            setSignupLoading(false)
            if(res.data.error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.error,
                })
            }else{
                setModalOpen(true)
            }
        })
        .catch( err => {
            setSignupLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err,
            })
        }) 
    
    }
        
    return <div>   

        <NavbarLogin toggleAuth={toggleAuth} />

        <div className='signup-container'>
            <div className='wrap-1100'>
            <div className='signup-left'>

                <img className='logo-signup-p' src={IMG} alt=""/>

            </div>

             <div className='signup-right'>
                <div className='card-signup'>
                            <h3 className="text-center text-white card-header pl-4">
                                Signup
                            </h3>
                            <div className="card-body form-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group form-inputs">
                                        <div className='d-flex'>
                                            <div className="input-group- pre-formS">
                                                <div className="input-group-text pre-form">@</div>
                                            </div>
                                            <input type="text" id="inlineFormInputGroupUsername2" className='form-control' {...userName} placeholder='Username' required/>
                                        </div>
                                        <label className={!userValid ? 'password-valid' : 'dNone'}><MdInfo />&nbsp;Minimum 8 characters without spaces, upper and lower case</label>
                                    </div>
                                    <div className="form-group form-inputs">
                                        <div className='d-flex'>
                                            <div className="input-group- pre-formS">
                                                <div className="input-group-text pre-form"><MdMail /></div>
                                            </div>
                                            <input autoComplete='true' type="email" className='form-control' {...email} placeholder='Email' required/>
                                        </div>
                                    </div>
                                    <div className="form-group form-inputs">
                                        <div className='d-flex'>
                                            <div className="input-group- pre-formS">
                                                <div className="input-group-text pre-form"><MdMail /></div>
                                            </div>
                                            <input type="text" className='form-control' {...email2} placeholder='Repeat Email' required/>
                                        </div>
                                        <label className={!validEmail ? 'password-valid' : 'dNone'}><MdInfo />&nbsp;Emails do not match</label>
                                    </div>
                                    <div className="form-group form-inputs">
                                        <div className='d-flex'>
                                            <div className="input-group- pre-formS">
                                                <div className="input-group-text pre-form"><MdLockOutline /></div>
                                            </div>
                                            <input autoComplete='true' type="password"  className='form-control' {...password} placeholder='Password' required/>
                                        </div>
                                        <label className={!password_valid ? 'password-valid' : 'dNone'}><MdInfo />&nbsp;Minimum 8 characters without spaces, upper and lower case</label>
                                    </div>
                                    <div className="form-group form-inputs">
                                    <div className='d-flex'>
                                            <div className="input-group- pre-formS">
                                                <div className="input-group-text pre-form"><MdLockOutline /></div>
                                            </div>
                                            <input autoComplete='true' type="password" suggested="new-password" className='form-control' {...confirm_password} placeholder='Confirm Password' required/>
                                        </div>
                                    </div>
                                    <button disabled={signupLoading ? true : false} type='submit' className='button-signup'>
                                        <div className={signupLoading ? "spinner-border text-danger" : 'dNone'} role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                        <p className={signupLoading ? 'dNone' : ''}>Signup</p>
                                    </button>
                                </form>
                            </div>
                        </div>
                </div>
                </div>
        </div>    
        <EmailVerificationModal email={email.value} isOpen={modalOpen} onClose={onCloseModal} />
        </div>
}