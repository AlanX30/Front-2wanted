import React, { useContext, useState } from 'react'
import logo from '../Images/logo.svg'
import {Link} from 'react-router-dom'
import './Styles/Navbar.css'
import { Context } from '../context'
import { withRouter } from 'react-router-dom'
import { useUserData } from '../hooks/useUserData'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

    const Navbar = (props) => {
    
    const { userData } = useUserData()    
    const { logout } = useContext(Context)
    
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);
    
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const toggle2 = () => setDropdownOpen2(prevState => !prevState);
    
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
                            {`Wallet: $${userData.wallet}  ▼`}
                        </DropdownToggle>
                        <DropdownMenu className='dropdown-user p-2 bg-dark'>
                            <DropdownItem className='p-0' header>Wallet</DropdownItem>
                            <button onClick={handleWallet} className='btn btn-warning mt-2'>Deposit</button>
                            <button onClick={handleWallet} className='btn btn-warning mt-2'>Withdraw</button>
                            <DropdownItem className='p-0' divider />
                        </DropdownMenu>
                    </Dropdown> 
                    <Dropdown className='mr-2 d-flex' isOpen={dropdownOpen2} toggle={toggle2}>
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
        </nav>
    )
}

export default withRouter(Navbar)


