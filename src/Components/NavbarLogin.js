import React from 'react'
import logo from '../Images/logo.svg'
import { useFormValues } from '../hooks/useFormValues'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import logoletra from '../Images/2WANTED.svg'
import axios from 'axios'
import './Styles/NavbarLogin.css'

 const NavbarLogin = (props) => {

    const email = useFormValues()
    const password = useFormValues()

    const form = {
        email: email.value,
        password: password.value
    }

    function handleSubmit( e ){
        e.preventDefault()
        axios.post('http://localhost:3500/api/users/signin', form)
        .then(res => {
            if(!res.data.error){
                props.toggleAuth(res.data.token)
                props.history.push(`/home`)
            }
        })
        .catch( err => console.error(err))

    }

    return(
        <nav className="navbar-arbol-login">
                <Link className="logo" to="/"><img className='login-logo1' src={logo} alt='logo-img' /><img className='login-logo2' src={logoletra} alt="logoletra"/></Link>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group login-inputs">
                            <input type="email" className='form-control' {...email} placeholder='Email'/>
                        </div>
                        <div className="form-group login-inputs">
                            <input className="form-control" type="password" {...password} placeholder="Password"/>
                            <a href='https://www.youtube.com/' target='_blank' rel="noopener noreferrer">Forgot your account?</a>
                        </div>
                        <button type='submit' className="login-button">
                            Login
                        </button>
                    </form>
        </nav>
    )
}

export default withRouter(NavbarLogin)