import React from 'react'
import logo from '../Images/logo.svg'
import {Link} from 'react-router-dom'
import './Styles/Navbar.css'

export const Navbar = () => {
    return(
        <nav className="navbar-arbol mb-3 navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand logo" to="/"><img src={logo} alt='logo-img' /> Save Money</Link>
            <h5 className='user-button badge badge-pill badge-warning mb-0'>User: @AlanS</h5>
        </nav>
    )
}