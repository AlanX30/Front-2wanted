import React, { useState, useContext } from 'react'
import './Styles/ChangePassword.css'
import { useFormValues } from '../hooks/useFormValues'
import { Context } from '../context'
import Swal from 'sweetalert2'
import axios from 'axios'
import { url } from '../urlServer'

export const ChangePassword= props => {

    const reg_password = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
    const forgotHash = props.match.params.token

    const [ loading, setLoading ] = useState(false)
    const { csrfToken } = useContext(Context)
    const password = useFormValues()
    const confirmPassword = useFormValues()

    async function handleChange(e){

        e.preventDefault()

        setLoading(true)

        if(!reg_password.test(password.value)){
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Minimo 8 caracteres, sin espacios, usar mayuscula y minuscula.',
            })
        }
        if(password.value === confirmPassword.value){
            await axios({
                data: {forgotHash, password: password.value, confirmPassword: confirmPassword.value },
                method: 'post',
                url: url+'/api/changeForgotPassword',
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
            <p>Ingrese nueva contraseña</p>
            <input  {...password} type="password"/>
            <p>Confirme nueva contraseña</p>
            <input  {...confirmPassword} type="password"/>
            <button disabled={loading ? true : false} className='btn btn-dark btn-block changepasswordemail-button'>
                <div className={loading ? "spinner-conf spinner-border text-danger" : 'dNone'} role="status">
                    <span className="sr-only">Cargando...</span>
                </div>
                <p  className={loading ? 'dNone' : ''}>Actualizar</p>
            </button>
        </form>
    </div>
}