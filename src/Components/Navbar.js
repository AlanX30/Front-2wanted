import React, { useContext, useState, useEffect } from 'react'
import ArbolImg from '../Images/arbol.svg'
import logo from '../Images/logo.svg'
import './Styles/Navbar.css'
import { Link } from 'react-router-dom'
import { useFormValues } from '../hooks/useFormValues'
import useMediaQuery from '../hooks/useMediaQuery'
import { MdAccountCircle, MdSearch, MdAttachMoney, MdFeedback, MdKeyboardReturn } from "react-icons/md";
import { JoinModal } from './JoinModal'
import { Context } from '../context'
import { withRouter } from 'react-router-dom'
import { useUserData } from '../hooks/useUserData'
import { InvitationModal } from './InvitationModal'
import axios from 'axios'

const Navbar = (props) => {

    /* -----------------------------Busqueda---------------------------------------------------------------- */
    const [filterSala, setFilterSala] = useState(false)
    
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

        if(oneString(room1.value)){
            const response = await axios({
                data: { name: room1.value },
                method: 'post',
                url: 'http://localhost:3500/search/sala',
                headers: {
                    authorization: token
                    }
            })
            setFilterSala(response.data)
        }
    }

    const query530 = useMediaQuery("(min-width: 530px)")
    const [iconNone, setIconNone] = useState(false)

    /* -----------------------------Busqueda---------------------------------------------------------------- */

    const token = window.sessionStorage.getItem('token')

    const [invitations, setInvitations] = useState([])

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
            url: 'http://localhost:3500/user/invite',
            headers: {
                authorization: token
                }
        })
        .then(res => setInvitations(res.data)) 
    },[token])

    console.log(invitations)
    
    const { userData } = useUserData()    
    const { logout } = useContext(Context)
    
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);
    const [dropdownOpen3, setDropdownOpen3] = useState(false);
    
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const toggle2 = () => setDropdownOpen2(prevState => !prevState);
    const toggle3 = () => setDropdownOpen3(prevState => !prevState);
    
    function handleLogout() {
        props.history.push('/')
        logout()
    }
    function handleWallet() {
        props.history.push('/wallet')
    }

    return(
        <nav className="bg-dark">
            <div className='navbar-arbol'>
                <div className={iconNone ? 'none': ''}>
                    <Link className="navbar-brand logo" to="/home"><img src={logo} alt='logo-img' /> Save Money</Link>
                </div>


                <div className={query530 ? '' : 'w-100' }>{ query530 ? 
                    <div className='search-form-c'>

                        <form className='search-form h-100' onSubmit={searchRoom1} >
                            <div className='search-input form-group h-100 m-0'>
                                <input {...room1} className=" form-control h-100" type='text' placeholder='Room Name'/>
                            </div>
                            <button type='submit' className='ml-2 mr-2 m-0 btn icon-navbar btn-warning'><MdSearch size='20' /></button>
                        </form>

                        { 
                        !oneString(room1.value) &&  <div className=''>Must not contain spaces</div>
                        } 

                        {
                        filterSala && 
                            <div className='filter-sala bg-dark'>                               
                                <div className='filter-sala-wrap'>
                                    <img src={ArbolImg} className='mr-4' alt="..." />
                                    <div className='text-center'>
                                        <p> Room Name: <span>{filterSala.name}</span>  </p>
                                        <p> Password: <span>{filterSala.protected ? 'Yes' : 'No'}</span>  </p>
                                        <p> Creator: <span>{filterSala.creator}</span>  </p>
                                        <p> Price: <span>${filterSala.price}</span>  </p>
                                    </div>
                                </div>
                                    <button onClick={onOpen2Modal} className='btn btn-warning btn-block'>Join</button>
                            </div>     
                        }
                    
                    </div>
                    : <div className='search-button-530'>
                        <button onClick={()=>setIconNone(true)} className={iconNone? 'none' :'ml-2 mr-2 m-0 btn icon-navbar btn-warning'}><MdSearch size='20' /></button>
                        <form className={iconNone ? 'search-form w-100 h-100' : 'none'} onSubmit={searchRoom1} >
                            <button type='button' className='mr-2 btn icon-navbar btn-warning' onClick={()=>setIconNone(false)}><MdKeyboardReturn size='20' /></button>
                            <div className='w-100'>
                                <input {...room1} className='h-100 form-control' type='text' placeholder='Room Name'/>
                            </div>
                            <button type='submit' className='ml-2 mr-2 m-0 btn icon-navbar btn-warning'><MdSearch size='20' /></button>
                        </form>

                        { 
                        !oneString(room1.value) &&  <div className=''>Must not contain spaces</div>
                        } 

                        {
                        filterSala && 
                            <div className='filter-sala bg-dark'>                               
                                <div className='filter-sala-wrap'>
                                    <img src={ArbolImg} className='mr-4' alt="..." />
                                    <div className='text-center'>
                                        <p> Room Name: <span>{filterSala.name}</span>  </p>
                                        <p> Password: <span>{filterSala.protected ? 'Yes' : 'No'}</span>  </p>
                                        <p> Creator: <span>{filterSala.creator}</span>  </p>
                                        <p> Price: <span>${filterSala.price}</span>  </p>
                                    </div>
                                </div>
                                    <button onClick={onOpen2Modal} className='btn btn-warning btn-block'>Join</button>
                            </div>     
                        }
                    </div>
                }</div>

                
                
                
                
                
                
                <div className={iconNone ? 'none' : 'd-flex'}>

                    <div className='mr-2'>
                        <button onClick={toggle} className='btn icon-navbar bg-warning'>
                            <MdFeedback size='20' />
                        </button>
                        <div className={dropdownOpen ? 'dropdown-menu-navbar isActive bg-dark' : 'dropdown-menu-navbar'}>
                            {
                                invitations.map(invitation => {
                                    return (
                                        <li className='mb-2' key={invitation._id}>
                                            <button className='btn btn-warning' onClick={()=> onOpenModal(invitation)}>
                                                <div className='invitation-button'>
                                                    <img src={ArbolImg} alt="ArbolImg"/>
                                                    <div className='invitation-description'>
                                                        <p>Invited for: <span>{invitation.host}</span></p>
                                                        <p>Room Name: <span>{invitation.salaName}</span></p>
                                                        <p>Price: <span>${invitation.price}</span></p>
                                                    </div>
                                                </div>
                                            </button>
                                        </li>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='mr-2'>
                        <button onClick={toggle2} className='btn icon-navbar bg-warning'>
                            <MdAttachMoney size='20' />
                        </button>
                        <div className={dropdownOpen2 ? 'dropdown-menu-navbar isActive bg-dark' : 'dropdown-menu-navbar'}>
                            <Link className={dropdownOpen2 ? 'w-100 mb-2 btn btn-warning' : 'none'} to='/wallet'>Deposit</Link>
                            <Link className={dropdownOpen2 ? 'w-100 mb-2 btn btn-warning' : 'none'} to='/wallet'>Withdraw</Link>
                        </div>
                    </div>
                    <div>
                        <button onClick={toggle3} className='btn icon-navbar bg-warning'>
                            <MdAccountCircle size='20' />
                        </button>
                        <div className={dropdownOpen3 ? 'dropdown-menu-navbar isActive bg-dark' : 'dropdown-menu-navbar'}>
                            <button onClick={handleLogout} className='btn btn-warning'>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
            <JoinModal token={token} price={filterSala.price} salaId={filterSala._id} isOpen={modal2Open} onClose={onClose2Modal}/>
            <InvitationModal token={token} invitationData={invitationData} isOpen={modalOpen} onClose={onCloseModal} />
        </nav>
    )
}

export default withRouter(Navbar)


