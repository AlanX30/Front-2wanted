import React, { useContext, useState, useEffect } from 'react'
import ArbolImg from '../Images/arbol.svg'
import logo from '../Images/logo.svg'
import './Styles/Navbar.css'
import { Link } from 'react-router-dom'
import { useFormValues } from '../hooks/useFormValues'
import logoletra from '../Images/2WANTED.svg'
import { useComponentVisible } from '../hooks/useComponentVisible'
import { IoMdSettings, IoIosContact, IoIosCreate, IoMdContacts } from 'react-icons/io'
import { MdAccountCircle, MdSearch, MdNotificationsNone, MdKeyboardReturn,MdHelpOutline, MdChromeReaderMode, MdExitToApp } from "react-icons/md";
import { JoinModal } from './JoinModal'
import { Context } from '../context'
import { withRouter } from 'react-router-dom'
import { useUserData } from '../hooks/useUserData'
import { InvitationModal } from './InvitationModal'
import axios from 'axios'

const Navbar = (props) => {

    /* -----------------------------Busqueda---------------------------------------------------------------- */
    const [filterSala, setFilterSala] = useState(false)
    const dropdownFilter = useComponentVisible(false);
    const [filterLoading, setFilterLoading] = useState(false)
    const [modal2Open, setModal2Open] = useState(null)

    const room1 = useFormValues()

    function oneString(string) {
        if(string.split(" ").length === 1 ){
            return true
        }
        return false
    }
    function onClose2Modal(){
        setModal2Open(null)
    }

    function onOpen2Modal(price){
        setModal2Open(true)
    }
    async function searchRoom1( e ){
        e.preventDefault()
        setFilterLoading(true)

        dropdownFilter.setIsComponentVisible(true)

        if(oneString(room1.value)){
            const response = await axios({
                data: { name: room1.value },
                method: 'post',
                url: 'http://localhost:3500/search/sala',
                headers: {
                    authorization: token
                    }
            })
            if(response.data.error){
                setFilterSala(response.data)
            }else{setFilterSala(response.data)}
            
        }else{setFilterSala(false)}
    }

    const [iconNone, setIconNone] = useState(false)

    /* -----------------------------Busqueda---------------------------------------------------------------- */

    const token = window.sessionStorage.getItem('token')

    const toggle1 = useComponentVisible(false);
    const toggle2 = useComponentVisible(false);
    const toggle3 = useComponentVisible(false);

    const [invitations, setInvitations] = useState([])
    let [notifications, setNotifications] = useState(0)

    const [modalOpen, setModalOpen] = useState(null)
    const [invitationData, setInvitationData] = useState(null)

    function onCloseModal(){
        setModalOpen(null)
    }

    function onOpenModal(invitationData){
        setModalOpen(true)
        setInvitationData(invitationData)
    }
    
    useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://localhost:3500/invitations',
            headers: {
                authorization: token
                }
        })
        
        .then(res => {
            setInvitations(res.data.invitations)
            setNotifications(res.data.countNotification)
        }) 
    },[token])

    function notificationButton() {
        toggle1.setIsComponentVisible(true)

        if(notifications > 0) {
            axios({
                method: 'post',
                url: 'http://localhost:3500/invitations-reset',
                headers: {
                    authorization: token
                }
            })
    
            setNotifications(0)
        }
    }
    
    const { userData } = useUserData()    
    const { logout } = useContext(Context)
    
    function handleLogout() {
        props.history.push('/')
        logout()
    }

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
                        <input {...room1} type='text' placeholder='Room Name'/>
                        <button type='submit' className='icon-navbar'><MdSearch size='23' /></button>
                    </form>
                </div>
                
            </div>

{/* ------------------------------------/Section-Searcher hidden---------------------------------------------------------------------- */}            
{/* ------------------------------------Section-Searcher---------------------------------------------------------------------- */}            
            <div className="section-searcher">

                <form onSubmit={searchRoom1} >
                    <div>
                        <input {...room1} type='text' placeholder='Room Name'/>
                    </div>
                    <button type='submit' className='icon-navbar'><MdSearch size='23' /></button>
                </form>
                
                <div ref={dropdownFilter.ref} className={dropdownFilter.isComponentVisible ? 'dropdown-menu-navbar-filter isActive' : 'dropdown-menu-navbar-filter'}>
                    { 
                        !oneString(room1.value) ?  <div className=''>Must not contain spaces</div> :
                            
                        filterSala.data ? 
                            
                        <div className={dropdownFilter.isComponentVisible ? 'filter-sala isActive' : 'filter-sala'}>            
                                <div className=' filter-sala-wrap'>
                                    <img src={ArbolImg} className='' alt="..." />
                                    <div className='filter-sala-description'>
                                        <p> Room Name:  <span> {filterSala.data.name}</span>  </p>
                                        <p> Password:  <span> {filterSala.data.protected ? 'Yes' : 'No'}</span>  </p>
                                        <p> Creator:  <span> {filterSala.data.creator}</span>  </p>
                                        <p> Price:  <span> ${filterSala.data.price}</span>  </p>
                                    </div>
                                </div>
                            <button onClick={onOpen2Modal} className=''>Join</button>
                        </div> : <div>{filterSala.error}</div>
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
                            invitations.map(invitation => {
                                return (
                                    <li className={toggle1.isComponentVisible ? 'invitations-li isActive' : 'invitations-li'} key={invitation._id}>
                                        <button className='' onClick={()=> onOpenModal(invitation)}>
                                                <img src={ArbolImg} alt="ArbolImg"/>
                                                <div className='invitation-description'>
                                                    <p>Invited for: <span> {invitation.host}</span></p>
                                                    <p>Room Name: <span> {invitation.salaName}</span></p>
                                                    <p>Price: <span> ${invitation.price}</span></p>
                                                </div>
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </div>
                </div>

                <div className='button-nav-2'>
                    <button onClick={()=>toggle3.setIsComponentVisible(true)} className='icon-navbar'>
                        <MdAccountCircle size='23' />
                    </button>
                    <div ref={toggle3.ref} className={toggle3.isComponentVisible ? 'dropdown-menu-navbar2 isActive' : 'dropdown-menu-navbar2'}>
                        <div  className="item-menu-right user">
                            < IoIosContact size='46'/>    <p> {userData.userName}</p>
                        </div>
                        <div className='item-menu-right-wallet-container'>
                            <div>Wallet</div>
                            <p>${userData.wallet}</p>
                        </div>
                        <div className='item-menu-right-cashier'>
                            <div className='button-deposit'>Deposit</div>
                            <div className='button-withdraw'>Withdraw</div>
                        </div>
                        <div className="item-menu-right">
                            <MdChromeReaderMode /><p>&nbsp;Balance history</p> 
                        </div>
                        <div className="item-menu-right">
                           < IoMdSettings /><p>&nbsp;User Configuration</p> 
                        </div>
                        <div className="item-menu-right">
                           <MdHelpOutline /><p>&nbsp;Help</p> 
                        </div>
                        <div className="item-menu-right">
                           < IoMdContacts /><p>&nbsp;Support</p> 
                        </div>
                        <div onClick={handleLogout} className="item-menu-right">
                           <MdExitToApp /><p>&nbsp;Log Out</p>  
                        </div>
                    </div> 
                </div>          

            </div>
{/* ------------------------------------/Section-NavIcons--------------------------------------------------------------------- */}       
        </nav>
        <JoinModal token={token} price={filterSala.price} salaId={filterSala._id} isOpen={modal2Open} onClose={onClose2Modal}/>
        <InvitationModal token={token} invitationData={invitationData} isOpen={modalOpen} onClose={onCloseModal} />
        </>
    )
}

export default withRouter(Navbar)


