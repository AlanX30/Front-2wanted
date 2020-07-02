import React, { useContext, useState } from 'react'
import { useFormValues } from '../hooks/useFormValues'
import Swal from 'sweetalert2'
import NavbarLogin from '../Components/NavbarLogin'
import { MdCreditCard, MdLockOutline, MdMail } from "react-icons/md";
import { Context } from '../context'
import axios from 'axios'
import android from '../Images/ANDROID.png'
import ios from '../Images/IOS.png'
import IMG from '../Images/esfinge.svg'
import './Styles/Signup.css'

export const Signup = (props) => {

    const { toggleAuth } = useContext(Context)

    const userName = useFormValues()
    const email = useFormValues()
    const dni = useFormValues()
    const password = useFormValues()
    const confirm_password = useFormValues()

    const form = {
        userName: `@${userName.value}`,
        email: email.value,
        dni: dni.value,
        password: password.value,
        confirm_password: confirm_password.value
    }
    const reg_password = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/

    const [password_valid, setPassword_valid] = useState(true)
    
    const [userValid, setUserValid] = useState(true)
    const [signupLoading, setSignupLoading] = useState(false)

    function handleSubmit( e ){
        e.preventDefault()
        if(userName.value.length < 4 || userName.value.length > 16){
            setUserValid(false)
        }else if(userName.value.split(" ").length > 1 ) {
            setUserValid(false)
        }else if(!reg_password.test(password.value)){
            setPassword_valid(false)
        }else{
        setSignupLoading(true)
        axios.post('https://example2wanted.herokuapp.com/api/users/signup', form)
        .then(res => {
            if(res.data.error){
                setSignupLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.error,
                })
            }else{
                toggleAuth(res.data.token)
                props.history.push(`/home`)
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
    }
        
    return(
        <>   

        <NavbarLogin toggleAuth={toggleAuth} />

        <div className='signup-container'>

            <div className='signup-left'>

                <div className='apps-button'>
                    <div>
                        <img className='android-button' alt='android' src={android} />

                    </div>
                    <div>
                        <img className='ios-button' alt='ios' src={ios} />
                    </div>
                </div>

                <img className='logo-signup-p' src={IMG} alt=""/>

            </div>

             <div className='signup-right'>
                <div className='card-signup'>
                            <h3 className="text-white card-header pl-4">
                                Account Register
                            </h3>
                            <div className="card-body form-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group form-inputs">
                                        <div className='d-flex'>
                                            <div class="input-group- pre-formS">
                                                <div class="input-group-text pre-form">@</div>
                                            </div>
                                            <input type="text" id="inlineFormInputGroupUsername2" className='form-control' {...userName} placeholder='UserName' required/>
                                        </div>
                                        <label className={!userValid ? 'password-valid' : 'dNone'}>Minimo 8 caracteres, Maximo , sin espacios</label>
                                    </div>
                                    <div className="form-group form-inputs">
                                        <div className='d-flex'>
                                            <div class="input-group- pre-formS">
                                                <div class="input-group-text pre-form"><MdMail /></div>
                                            </div>
                                            <input type="email" className='form-control' {...email} placeholder='Email' required/>
                                        </div>
                                    </div>
                                    <div className="form-group form-inputs">
                                        <div className='d-flex'>
                                            <div class="input-group- pre-formS">
                                                <div class="input-group-text pre-form"><MdCreditCard /></div>
                                            </div>
                                            <input type="text" className='form-control' {...dni} placeholder='CC, DNI ETC...' required/>
                                        </div>
                                    </div>
                                    <div className="form-group form-inputs">
                                        <div className='d-flex'>
                                            <div class="input-group- pre-formS">
                                                <div class="input-group-text pre-form"><MdLockOutline /></div>
                                            </div>
                                            <input type="password"  className='form-control' {...password} placeholder='Password' required/>
                                        </div>
                                        <label className={!password_valid ? 'password-valid' : 'dNone'}>Debe contener mayuscula, minuscula y numero, minimo 8 caracteres</label>
                                    </div>
                                    <div className="form-group form-inputs">
                                    <div className='d-flex'>
                                            <div class="input-group- pre-formS">
                                                <div class="input-group-text pre-form"><MdLockOutline /></div>
                                            </div>
                                            <input type="password" suggested="new-password" className='form-control' {...confirm_password} placeholder='Confirm Password' required/>
                                        </div>
                                    </div>
                                    <button type='submit' className='button-signup'>
                                        <div className={signupLoading ? "spinner-border text-danger" : 'dNone'} role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                        <p className={signupLoading ? 'dNone' : ''}>Signup</p>
                                    </button>
                                </form>
                            </div>
                        </div>
                </div>
        </div>    

        </>
    )
}