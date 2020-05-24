import React from 'react'
import logo from '../Images/logo.svg'
import { useFormValues } from '../hooks/useFormValues'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
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
        axios.post('http://localhost:3500/users/signin', form)
        .then(res => {
            if(!res.data.error){
                props.toggleAuth(res.data.token)
                props.history.push(`/home`)
            }
        })
        .catch( err => console.error(err))

    }

    return(
        <nav className="navbar-arbol mb-3 navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-sm">
                <Link className="navbar-brand logo" to="/"><img src={logo} alt='logo-img' /> Save Money</Link>
                <div>
                    <form onSubmit={handleSubmit} className="d-flex">
                        <div className="form-group login-inputs mr-3">
                            <input type="email" className='form-control' {...email} placeholder='Email'/>
                        </div>
                        <div className="form-group login-inputs mr-2">
                            <input className="form-control" type="password" {...password} placeholder="Password"/>
                        </div>
                        <button type='submit' className="btn btn-warning login-button">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default withRouter(NavbarLogin)