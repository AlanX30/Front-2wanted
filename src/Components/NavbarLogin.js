import React, { useState, useContext } from 'react'
import Swal from 'sweetalert2'
import logo from '../Images/logo.svg'
import { useFormValues } from '../hooks/useFormValues'
import { Link } from 'react-router-dom'
import { Context } from '../context'
import { withRouter } from 'react-router-dom'
import { url } from '../urlServer'
import logoletra from '../Images/2WANTED.svg'
import axios from 'axios'
import './Styles/NavbarLogin.css'
import EmailVerificationModal2 from './Modals/EmailVerificationModal2'
import ForgotPasswordModal from './Modals/ForgotPasswordModal'

 const NavbarLogin = (props) => {

    const params = new URLSearchParams(window.location.search)
    const salaParams = params.get('add')

    const [modalOpen, setModalOpen] = useState(false)
    const [check, setCheck] = useState(false)
    const [refresh, setRefresh] = useState(0)
    const [type, setType] = useState('password')
    const [modal2Open, setModal2Open] = useState(false)
    const { csrfToken } = useContext(Context)
    
    function onCloseModal(){
        setModalOpen(null)
    }
    function onClose2Modal(){
        setModal2Open(null)
    }

    function handleCheck(){
        if(check){
            setCheck(false)
            setType('password')
        }else{
            setCheck(true)
            setType('text')
        }
    }

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
        axios({
            method: 'post',
            data: form,
            url: url+'/api/users/signin',
            headers: { 
                'X-CSRF-Token': csrfToken
            }
        })
        .then(res => {
            setLoginLoading(false)
            if(res.data.error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.error,
                })
            }else if(res.data.isVerified === false){
                setModalOpen(true)
                setRefresh(refresh + 1)
            }else if(res.data === 'has exceeded the number of attempts, try again in 10 minutes'){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data,
                })
            }else{
                if(salaParams){ 
                    props.toggleAuth(res.data.userName)
                    props.history.push(`/home?add=${salaParams}`)
                }else{ 
                    props.toggleAuth(res.data.userName)
                    props.history.push(`/home`)
                }
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
            <div className='wrap-1100'>
            <Link className="logo" to="/"><img className='login-logo1' src={logo} alt='logo-img' /><img className='login-logo2' src={logoletra} alt="logoletra"/></Link>
            <form onSubmit={handleSubmit}>
                <div className="form-group login-inputs">
                    <input required autoComplete="on" type="email" className='form-control' {...email} placeholder='Email'/>
                </div>
                <div className="form-group login-inputs">
                    <input required autoComplete='on' className="form-control" type={type} {...password} placeholder="Password"/>
                    <div className='checkLogin'>
                        <input checked={check} onChange={handleCheck} className="" type="checkbox" /><span> Show password</span>
                    </div>
                    <label className='forgotPassworLogin' onClick={()=>setModal2Open(true)}>Forgot password?</label>
                </div>
                <button disabled={loginLoading ? true : false} type='submit' className="login-button">
                    <div className={loginLoading ? "spinner-border loading-login text-danger" : 'dNone'} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                <p className={loginLoading ? 'dNone' : 'p-nav-login'}>Log in</p>
                </button>
            </form>
            <EmailVerificationModal2 refresh={refresh} props={props} email={email.value} isOpen={modalOpen} onClose={onCloseModal}/>
            <ForgotPasswordModal isOpen={modal2Open} onClose={onClose2Modal}/>
            </div>
        </nav>
    )
}

export default withRouter(NavbarLogin)