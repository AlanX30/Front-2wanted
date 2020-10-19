import React, { useContext, useState } from 'react'
import { useFormValues } from '../hooks/useFormValues'
import Swal from 'sweetalert2'
import NavbarLogin from '../Components/NavbarLogin'
import { MdCreditCard, MdInfo, MdLockOutline, MdMail } from "react-icons/md";
import { Context } from '../context'
import axios from 'axios'
import android from '../Images/ANDROID.png'
import ios from '../Images/IOS.png'
import IMG from '../Images/esfinge.svg'
import './Styles/Signup.css'
import { url } from '../urlServer'

export const Signup = (props) => {

    const reg_password = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
    const reg_whiteSpace = /^$|\s+/

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
        confirm_password: confirm_password.value,
        bank: {
            titular: ''
        }
    }

    const [password_valid, setPassword_valid] = useState(true)
    
    const [userValid, setUserValid] = useState(true)
    const [signupLoading, setSignupLoading] = useState(false)

    function handleSubmit( e ){
        e.preventDefault()
        
        if(userName.value.length < 4 || userName.value.length > 16){
            return setUserValid(false)
        }else{setUserValid(true)}
        if(reg_whiteSpace.test(userName.value)) {
           return setUserValid(false)
        }else{setUserValid(true)}
        if(!reg_password.test(password.value)){
           return setPassword_valid(false)
        }else{setPassword_valid(true)}

        setSignupLoading(true)

        axios.post( url+'/api/users/signup', form)
        .then(res => {
            if(res.data.error){
                setSignupLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.error,
                })
            }else{
                toggleAuth(res.data.token, res.data.userName)
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
                            <h3 className="text-center text-white card-header pl-4">
                                Registrarse
                            </h3>
                            <div className="card-body form-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group form-inputs">
                                        <div className='d-flex'>
                                            <div className="input-group- pre-formS">
                                                <div className="input-group-text pre-form">@</div>
                                            </div>
                                            <input type="text" id="inlineFormInputGroupUsername2" className='form-control' {...userName} placeholder='Nombre de usuario' required/>
                                        </div>
                                        <label className={!userValid ? 'password-valid' : 'dNone'}><MdInfo />&nbsp;Minimo 8 caracteres, Maximo 16, sin espacios</label>
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
                                                <div className="input-group-text pre-form"><MdCreditCard /></div>
                                            </div>
                                            <input type="text" className='form-control' {...dni} placeholder='CC, DNI ETC...' required/>
                                        </div>
                                    </div>
                                    <div className="form-group form-inputs">
                                        <div className='d-flex'>
                                            <div className="input-group- pre-formS">
                                                <div className="input-group-text pre-form"><MdLockOutline /></div>
                                            </div>
                                            <input autoComplete='true' type="password"  className='form-control' {...password} placeholder='Contraseña' required/>
                                        </div>
                                        <label className={!password_valid ? 'password-valid' : 'dNone'}><MdInfo />&nbsp;Debe contener mayuscula, minuscula y numero, minimo 8 caracteres</label>
                                    </div>
                                    <div className="form-group form-inputs">
                                    <div className='d-flex'>
                                            <div className="input-group- pre-formS">
                                                <div className="input-group-text pre-form"><MdLockOutline /></div>
                                            </div>
                                            <input autoComplete='true' type="password" suggested="new-password" className='form-control' {...confirm_password} placeholder='Confirmar contraseña' required/>
                                        </div>
                                    </div>
                                    <button disabled={signupLoading ? true : false} type='submit' className='button-signup'>
                                        <div className={signupLoading ? "spinner-border text-danger" : 'dNone'} role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                        <p className={signupLoading ? 'dNone' : ''}>Registrarse</p>
                                    </button>
                                </form>
                            </div>
                        </div>
                </div>
        </div>    

        </>
    )
}