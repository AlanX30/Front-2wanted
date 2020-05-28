import React, { useContext, useState, useEffect } from 'react'
import logo from '../Images/logo.svg'
import { Link } from 'react-router-dom'
import './Styles/Navbar.css'
import { Context } from '../context'
import { withRouter } from 'react-router-dom'
import { useUserData } from '../hooks/useUserData'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { InvitationModal } from './InvitationModal'
import axios from 'axios'

const Navbar = (props) => {

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
        <nav className="mb-3 navbar navbar-expand-lg navbar-dark bg-dark">
            <div className='navbar-arbol'>
                <div>
                    <Link className="navbar-brand logo" to="/home"><img src={logo} alt='logo-img' /> Save Money</Link>
                </div>
                
                <div className='d-flex'>

                    <Dropdown className='mr-2 d-flex' isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle className='user-button badge badge-pill badge-warning mb-0' >
                            Invitations ▼
                        </DropdownToggle>
                        <DropdownMenu className='dropdown-user p-2 bg-dark'>
                            <DropdownItem className='p-0' header>Invitations</DropdownItem>
                            {
                                invitations.map(invitation => {
                                    return (
                                        <li key={invitation._id}>
                                            <button onClick={()=> onOpenModal(invitation)}>
                                                <p>Invited for: <span>{invitation.host}</span></p>
                                                <p>Room Name: <span>{invitation.salaName}</span></p>
                                                <p>Price: <span>${invitation.price}</span></p>
                                            </button>
                                        </li>
                                    )
                                })
                            }
                            <DropdownItem className='p-0' divider />
                        </DropdownMenu>
                    </Dropdown> 
                    <Dropdown className='mr-2 d-flex' isOpen={dropdownOpen2} toggle={toggle2}>
                        <DropdownToggle className='user-button badge badge-pill badge-warning mb-0' >
                            {`Wallet: $${userData.wallet}  ▼`}
                        </DropdownToggle>
                        <DropdownMenu className='dropdown-user p-2 bg-dark'>
                            <DropdownItem className='p-0' header>Wallet</DropdownItem>
                            <button onClick={handleWallet} className='btn btn-warning mt-2'>Deposit</button>
                            <button onClick={handleWallet} className='btn btn-warning mt-2'>Withdraw</button>
                            <DropdownItem className='p-0' divider />
                        </DropdownMenu>
                    </Dropdown> 
                    <Dropdown className='mr-2 d-flex' isOpen={dropdownOpen3} toggle={toggle3}>
                        <DropdownToggle className='user-button badge badge-pill badge-warning mb-0' >
                             {`User: ${userData.userName}  ▼`}
                        </DropdownToggle>
                        <DropdownMenu className='dropdown-user p-2 bg-dark'>
                            <DropdownItem className='p-0' header>User</DropdownItem>
                            <DropdownItem className='p-0' divider />
                            <button onClick={handleLogout} className='btn btn-warning'>Logout</button>
                        </DropdownMenu>
                    </Dropdown> 
                </div>
            </div>
            <InvitationModal token={token} invitationData={invitationData} isOpen={modalOpen} onClose={onCloseModal} />
        </nav>
    )
}

export default withRouter(Navbar)


