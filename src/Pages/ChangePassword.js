import React, { useState } from 'react'
import './Styles/ChangePassword.css'
import { useFormValues } from '../hooks/useFormValues'
import Swal from 'sweetalert2'
import axios from 'axios'
import { url } from '../urlServer'

export const ChangePassword= props => {

    const reg_password = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
    const forgotHash = props.match.params.token

    const [ loading, setLoading ] = useState(false)

    const password = useFormValues()
    const confirmPassword = useFormValues()

    async function handleChange(e){

        e.preventDefault()

        setLoading(true)

        if(!reg_password.test(password.value)){
            console.log('aqui')
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe contener mayuscula, minuscula y numero, minimo 8 caracteres',
            })
        }
        if(password.value === confirmPassword.value){
            await axios({
                data: {forgotHash, password: password.value, confirmPassword: confirmPassword.value },
                method: 'post',
                url: url+'/api/changeForgotPassword',
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
                    props.history.push(`/`)
                }
            }).catch(err => {
                setLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err,
                })
            })
        }else{
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las contraseñas no coinciden',
            })
        }
    }

    return <div className='changePasswordEmail'>
        <form onSubmit={handleChange}>
            <h1>Cambio de contraseña</h1>
            <p>Escribe nueva contraseña</p>
            <input  {...password} type="password"/>
            <p>Confirmar nueva contraseña</p>
            <input  {...confirmPassword} type="password"/>
            <button disabled={loading ? true : false} className='btn btn-dark btn-block changepasswordemail-button'>
                <div className={loading ? "spinner-conf spinner-border text-danger" : 'dNone'} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <p  className={loading ? 'dNone' : ''}>Cambiar</p>
            </button>
        </form>
    </div>
}