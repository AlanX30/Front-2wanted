import React from 'react'
import logo from '../Images/logo.svg'
import logoletra from '../Images/2WANTED.svg'
import { Link } from 'react-router-dom'

const NavbarLogo = ({iconNone}) => {
    return (<div className={!iconNone ? "section-logos" : 'dNone'}>
        <Link className="Link" to="/home">< img className='logo1' src={logo} alt='logo-img' /> <img className='logo2' src={logoletra} alt="logoletra"/> </Link>
    </div>)
}

export default React.memo(NavbarLogo)