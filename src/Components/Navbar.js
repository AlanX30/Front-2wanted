import React, { useContext, useState, useEffect } from 'react'
import io from 'socket.io-client'
import ArbolImg from '../Images/arbol.svg'
import Swal from 'sweetalert2'
import logo from '../Images/logo.svg'
import './Styles/Navbar.css'
import { Link } from 'react-router-dom'
import { useFormValues } from '../hooks/useFormValues'
import logoletra from '../Images/2WANTED.svg'
import { useComponentVisible } from '../hooks/useComponentVisible'
import { FcOk, FcHighPriority } from 'react-icons/fc'
import { IoMdSettings, IoIosContact } from 'react-icons/io'
import { MdAccountCircle, MdAccountBalanceWallet,  MdInfo, MdSearch, MdNotificationsNone, MdFileUpload, MdFileDownload, MdKeyboardReturn,MdHelpOutline, MdChromeReaderMode, MdExitToApp } from "react-icons/md";
import  JoinModal  from './JoinModal'
import { Context } from '../context'
import { withRouter } from 'react-router-dom'
import { useUserData } from '../hooks/useUserData'
import  InvitationModal  from './InvitationModal'
import axios from 'axios'

const Navbar = (props) => {

    /* -----------------------------Busqueda---------------------------------------------------------------- */
    const { userData } = useUserData() 
    const [filterSala, setFilterSala] = useState(false)
    const dropdownFilter = useComponentVisible(false);
    const [modal2Open, setModal2Open] = useState(null)
    const [searchLoading, setSearchLoading] = useState(false)
    const room1 = useFormValues()

    function formatNumber(number){
        return new Intl.NumberFormat("de-DE").format(number)
    }

    function onClose2Modal(){
        setModal2Open(null)
    }

    function onOpen2Modal(price){
        setModal2Open(true)
    }
    async function searchRoom1( e ){
        e.preventDefault()

        setSearchLoading(true)

        dropdownFilter.setIsComponentVisible(true)

            try{
                const response = await axios({
                    data: { name: room1.value },
                    method: 'post',
                    url: 'https://example2wanted.herokuapp.com/api/search/sala',
                    headers: {
                        authorization: token
                    }
                })

                setSearchLoading(false)
                setFilterSala(response.data)

            }catch(error){
                setSearchLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error,
                })
            }
    }

    const [iconNone, setIconNone] = useState(false)

    /* -----------------------------Busqueda---------------------------------------------------------------- */

    const token = window.sessionStorage.getItem('token')

    const toggle1 = useComponentVisible(false);
    const toggle3 = useComponentVisible(false);

    const [invitations, setInvitations] = useState([])
    let [notifications, setNotifications] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [modalOpen, setModalOpen] = useState(null)
    const [invitationData, setInvitationData] = useState(null)
    let [countPages, setCountPages] = useState(1)
    let [count, setCount] = useState(0) 
    let cuenta = 0
    
    function onCloseModal(){
        setModalOpen(null)
    }

    function onOpenModal(invitationData){
        setModalOpen(true)
        setInvitationData(invitationData)
    }

    const socket = io('http://localhost:3500')
 
    if(userData.userName){
        socket.emit('user_online', userData.userName)
    }
    
    socket.on('new_message', () => {
        cuenta = cuenta + 1 
        setCount(cuenta) 
    })
    
    
    useEffect(()=>{

        if(count > 0){
            setCountPages(1)
        }
        
        axios({
            method: 'post',
            data: {page: countPages},
            url: 'http://localhost:3500/api/invitations',
            headers: {
                authorization: token
            }
        }).then(res => {
            if(res.data.error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.error,
                })
            }else{
                if(countPages === 1 || count > 0){
                    setNotifications(res.data.countNotification)
                    setTotalPages(res.data.totalPages)
                    setInvitations(res.data.invitations)
                    setCount(0)
                }else{
                    setInvitations( invitations => invitations.concat(res.data.invitations) )
                    setNotifications(res.data.countNotification)
                    setTotalPages(res.data.totalPages)
                }
            }
        }).catch( error => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
            })
        })

    },[token, countPages, count])
    
    function notificationButton() {
        
        toggle1.setIsComponentVisible(true)

        if(notifications > 0) {
            axios({
                method: 'post',
                url: 'http://localhost:3500/api/invitations-reset',
                headers: {
                    authorization: token
                }
            })
    
            setNotifications(0)
        }
    }   
    
    const { logout } = useContext(Context)
    
    function handleLogout() {
        props.history.push('/')
        logout()
    }

    //-------------Pagos--------------------------------------------------------//

    const pay = useFormValues()

    const [deposit, setDeposit] = useState(false)
    const [buttonPay, setButtonPay] = useState(false)
    const [urlPay, setUrlPay] = useState('')

    const onPay = async (e) => {

        e.preventDefault()

        await axios({
            method: 'post',
            data: { price: pay.value },
            url: 'https://example2wanted.herokuapp.com/api/payments',
            headers: {
                authorization: token
            }
        }).then(res => {
            setUrlPay(res.data)
            setButtonPay(true)
        })
    }

    //-------------Pagos--------------------------------------------------------//

    return(
        <>
        <nav>
{/* ------------------------------------Section-Logos---------------------------------------------------------------------- */}       
            <div className={!iconNone ? "section-logos" : 'dNone'}>

                <Link className="Link" to="/home">< img className='logo1' src={logo} alt='logo-img' /> <img className='logo2' src={logoletra} alt="logoletra"/> </Link>
            
            </div>
{/* ------------------------------------/Section-Logos---------------------------------------------------------------------- */}       
{/* ------------------------------------Section-Searcher hidden---------------------------------------------------------------------- */}      

            <div className="section-searcher-hidden">
                <button onClick={()=> setIconNone(true)} className={!iconNone ? 'icon-navbar' : 'dNone'}><MdSearch size='23' /></button>
                
                <div className={iconNone  ? 'searcher-hidden' : 'dNone'}>
                    <form onSubmit={searchRoom1} >
                        <button onClick={()=> setIconNone(false)} type='button' className='icon-navbar'><MdKeyboardReturn size='23' /></button>
                        <input {...room1} type='text' placeholder='Nombre de sala' />
                        <button type='submit' className='icon-navbar'><MdSearch size='23' /></button>
                    </form>
                </div>
                
            </div>

{/* ------------------------------------/Section-Searcher hidden---------------------------------------------------------------------- */}            
{/* ------------------------------------Section-Searcher---------------------------------------------------------------------- */}            
            <div className="section-searcher">

                <form onSubmit={searchRoom1} >
                    <div>
                        <input {...room1} type='text' placeholder='Nombre de sala'/>
                    </div>
                    <button type='submit' className='icon-navbar'><MdSearch size='23' /></button>
                </form>
                
                <div ref={dropdownFilter.ref} className={dropdownFilter.isComponentVisible ? 'dropdown-menu-navbar-filter isActive' : 'dNone'}>
                    { 

                        searchLoading ? <div className= "spinner-border text-danger" role="status">
                             <span className="sr-only">Loading...</span>
                        </div> : 
                            
                        filterSala.data ?

                        <div>
                            
                        <div className={dropdownFilter.isComponentVisible ? 'filter-sala' : 'dNone'}>            
                                <div onClick={onOpen2Modal} className=' filter-sala-wrap'>
                                    <img src={ArbolImg} className='' alt="..." />
                                    <div className='filter-sala-description'>
                                        <p> Nombre de sala:  <span> {filterSala.data.name}</span>  </p>
                                        <p> Creador:  <span> {filterSala.data.creator}</span>  </p>
                                        <p> Valor:  <span> ${formatNumber(filterSala.data.price)}</span>  </p>
                                    </div>
                                </div>
                            <button onClick={onOpen2Modal} className=''>Unirse</button>
                        </div> 
                        <p className='aviso-filtro'><MdInfo />  Recuerda respetar mayusculas y minusculas</p>
                        </div> : <div className='no-spaces'>{filterSala.error}! <p className='aviso-filtro'><MdInfo />   Recuerda respetar mayusculas y minusculas</p></div>
                    } 
                </div>

            </div>
{/* ------------------------------------/Section-Searcher---------------------------------------------------------------------- */}       
{/* ------------------------------------Section-NavIcons---------------------------------------------------------------------- */}       
            <div className={!iconNone ? 'section-navIcons' : 'dNone'}>

                <div className='button-nav-1'>
                    <button className='icon-navbar' onClick={notificationButton}>
                        <div className={notifications > 0 ? 'notification' : 'dNone'}>{notifications}</div>
                        <MdNotificationsNone size='23' />
                    </button>
                    <div ref={toggle1.ref} className={toggle1.isComponentVisible ? 'dropdown-menu-navbar1 isActive' : 'dropdown-menu-navbar1'}>
                        {
                            invitations.length === 0 && <p className='no-spaces'>No hay notificationes</p>
                        }
                        {
                            invitations.map(invitation => {
                                return (
                                    <li className={toggle1.isComponentVisible ? 'invitations-li isActive' : 'invitations-li'} key={invitation._id}>
                                        <button className='' onClick={()=> onOpenModal(invitation)}>
                                                <img src={ArbolImg} alt="ArbolImg"/>
                                                <div className='invitation-description'>
                                                    <p>Invitado por: <span> {invitation.host}</span></p>
                                                    <p>Nombre de sala: <span> {invitation.salaName}</span></p>
                                                    <p>valor: <span> ${formatNumber(invitation.price)}</span></p>
                                                </div>
                                        </button>
                                    </li>
                                )
                            })
                        }
                        <button className={totalPages > countPages ? 'button-more-notifications' : 'dNone'} onClick={()=>{setCountPages(countPages + 1)}}>Ver mas ▼</button>
                    </div>
                </div>

                <div className='button-nav-2'>

                    <button onClick={()=>toggle3.setIsComponentVisible(true)} className='icon-navbar'>
                        <MdAccountCircle size='23' />
                    </button>

                    <div ref={toggle3.ref} className={toggle3.isComponentVisible ? 'dropdown-menu-navbar2 isActive' : 'dropdown-menu-navbar2'}>
                        <div onClick={()=>toggle3.setIsComponentVisible(false)} className='button-close-nav'>X</div>
                        <div  className="item-menu-right user">
                            < IoIosContact size='46'/>    <p> {userData.userName}</p>
                        </div>
                        <div className='item-menu-right-wallet-container'>
                            <div><MdAccountBalanceWallet />&nbsp;Billetera</div>
                            <p>${formatNumber(userData.wallet)}</p>
                        </div>
                        <div className='item-menu-right-cashier'>
                            <div onClick={()=> setDeposit(true)} to='/wallet' className='button-deposit'><MdFileUpload />Depositar</div>
                            <div to='/wallet' className='button-withdraw'><MdFileDownload />Retirar</div>
                        </div>
                        <div className={deposit ? "item-menu-right payments" : "dNone"}>
                             <form className={buttonPay ? 'dNone' : ''} onSubmit={onPay}>
                                 <input className='pl-2' type="text" {...pay} placeholder='$'/>
                                 <button type='submit'>Continuar</button>
                             </form>
                             <div className={buttonPay ? 'button-pay' : 'dNone'} >
                                <div onClick={()=> {
                                    setButtonPay(false) 
                                    setDeposit(false)
                                    }} className='cancel-pay'><FcHighPriority />&nbsp;Cancelar</div>
                                <a className='Link' href={urlPay} rel="noopener noreferrer" target='_blank'><FcOk />&nbsp;Confirmar pago por &nbsp; ${pay.value}</a>
                             </div>
                        </div>
                        <div className="item-menu-right">
                            <MdChromeReaderMode /><p>&nbsp;Historial de balance</p> 
                        </div>
                        <a href='/profile/' className="item-menu-right" >
                           < IoMdSettings /><p>&nbsp;Configuracion de usuario</p> 
                        </a>
                        <div className="item-menu-right">
                           <MdHelpOutline /><p>&nbsp;Ayuda</p> 
                        </div>
                        <div onClick={handleLogout} className="item-menu-right">
                           <MdExitToApp /><p>&nbsp;Cerrar Sesion</p>  
                        </div>
                    </div> 
                </div>          

            </div>
{/* ------------------------------------/Section-NavIcons--------------------------------------------------------------------- */}       
        </nav>
        <JoinModal token={token} data={filterSala.data} isOpen={modal2Open} onClose={onClose2Modal}/>
        <InvitationModal token={token} invitationData={invitationData} isOpen={modalOpen} onClose={onCloseModal} />
        </>
    )
}

export default withRouter(Navbar)


