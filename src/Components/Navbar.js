import React, { useState, useCallback } from 'react'
import ArbolImg from '../Images/arbol.svg'
import './Styles/Navbar.css'
import { useComponentVisible } from '../hooks/useComponentVisible'
import { url } from '../urlServer'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Cookies from 'js-cookie'
import NavbarForm from './Forms/NavbarForm'
import Logo from './NavbarLogo'
import ButtonNav1 from './Navbar_navigation1'
import ButtonNav2 from './Navbar_navigation2'

const Navbar = (props) => {

    /* -----------------------------Busqueda---------------------------------------------------------------- */
    
    const username = Cookies.get('username') 

    /* -----------------------------Busqueda---------------------------------------------------------------- */

    const pushLogout = useCallback(() => props.history.push('/'), [props.history])

    const [iconNone, setIconNone] = useState(false)

    const iconSet = useCallback((state) => {
        if(state){
            setIconNone(true)
        }else { setIconNone(false) }
    }, [])

    return(
        <>
        <Helmet> <title>2wanted</title> </Helmet>
        <nav className='principal-navbar'>
            
{/* ------------------------------------Section-Logos---------------------------------------------------------------------- */}       
            <Logo iconNone={iconNone} />
{/* ------------------------------------/Section-Logos---------------------------------------------------------------------- */}       
            
{/* ------------------------------------Section-Searcher---------------------------------------------------------------------- */}            
            <NavbarForm useComponentVisible={useComponentVisible} iconSet={iconSet} ArbolImg={ArbolImg} url={url} />
{/* ------------------------------------/Section-Searcher---------------------------------------------------------------------- */}       
{/* ------------------------------------Section-NavIcons---------------------------------------------------------------------- */}       
            
            <div className={!iconNone ? 'navbar-buttons-left' : 'dNone'}>
                <ButtonNav1 ArbolImg={ArbolImg} useComponentVisible={useComponentVisible} url={url} username={username} />
                <ButtonNav2 pushLogout={pushLogout} useComponentVisible={useComponentVisible} />
            </div>
{/* ------------------------------------/Section-NavIcons--------------------------------------------------------------------- */}       
        </nav>
        </>
    )
}

export default withRouter(Navbar)


