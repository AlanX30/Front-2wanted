import React from 'react'
import Swal from 'sweetalert2'
import logo from '../Images/logo.svg'
import { useFormValues } from '../hooks/useFormValues'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import logoletra from '../Images/2WANTED.svg'
import axios from 'axios'
import './Styles/NavbarLogin.css'
import { useState } from 'react'

 const NavbarLogin = (props) => {

    const email = useFormValues()
    const password = useFormValues()

    const form = {
        email: email.value,
        password: password.value
    }

    const [loginLoading, setLoginLoading] = useState(false)

    function handleSubmit( e ){
        e.preventDefault()
        setLoginLoading(true)
        axios.post('https://example2wanted.herokuapp.com/api/users/signin', form)
        .then(res => {
            if(res.data.error){
                setLoginLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.error,
                })
            }else{
                props.toggleAuth(res.data.token)
                props.history.push(`/home`)
            }
        })
        .catch( err => {
            setLoginLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err,
            })
        })
    }

    return(
        <nav className="navbar-arbol-login">
                <Link className="logo" to="/"><img className='login-logo1' src={logo} alt='logo-img' /><img className='login-logo2' src={logoletra} alt="logoletra"/></Link>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group login-inputs">
                            <input type="email" className='form-control' {...email} placeholder='Email'/>
                        </div>
                        <div className="form-group login-inputs">
                            <input className="form-control" type="password" {...password} placeholder="Contraseña"/>
                            <a href='https://www.youtube.com/' target='_blank' rel="noopener noreferrer">Olvidaste tu cuenta?</a>
                        </div>
                        <button disabled={loginLoading ? true : false} type='submit' className="login-button">
                            <div className={loginLoading ? "spinner-border loading-login text-danger" : 'dNone'} role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        <p className={loginLoading ? 'dNone' : ''}>Entrar</p>
                        </button>
                    </form>
        </nav>
    )
}

export default withRouter(NavbarLogin)