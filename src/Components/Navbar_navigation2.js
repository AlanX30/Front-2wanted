import React, {useContext, useState } from 'react'
import './Styles/Navbar.css'
import { Link } from 'react-router-dom'
import { Context } from '../context'
import { WithdrawModal } from './Modals/WithdrawModal'
import { DepositModal } from './Modals/DepositModal'
import { useUserData } from '../hooks/useUserData'
import { IoMdSettings, IoIosContact } from 'react-icons/io'
import { MdRefresh, MdAccountCircle, MdAccountBalanceWallet, MdFileUpload, MdFileDownload, MdHelpOutline, MdChromeReaderMode, MdExitToApp } from "react-icons/md";

const Navbar_navigation2 = props => {
    
    const [countUserData, setCountUserData] = useState(0)
    const { userData, loadingUserData } = useUserData(countUserData)
    const { logout } = useContext(Context)
    
    const [modal3Open, setModal3Open] = useState(null)
    const [modal4Open, setModal4Open] = useState(null)

    function onClose3Modal(){
        setModal3Open(null)
    }
    function onClose4Modal(){
        setModal4Open(null)
    }

    function handleLogout() {
        props.push()
        logout()
    }

    const toggle3 = props.useComponentVisible(false)

    function formatNumber(number){
        return new Intl.NumberFormat("de-DE").format(number)
    }

    return (
        <div className='section-navIcons'>
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
                        <p className='balance-refresh-container'>< MdRefresh size='35' className={loadingUserData ? 'refresh-balance-loading ' : 'refresh-balance'} onClick={()=> setCountUserData(countUserData + 1)} />  ${formatNumber(userData.wallet)}</p>
                    </div>
                    <div className='item-menu-right-cashier'>
                        <div onClick={()=> setModal4Open(true)} to='/wallet' className='button-deposit'><MdFileUpload />Depositar</div>
                        <div onClick={()=>setModal3Open(true)} className='button-withdraw'><MdFileDownload />Retirar</div>
                    </div>
                    <Link onClick={()=> toggle3.setIsComponentVisible(false)} to='/balance/' className="item-menu-right">
                                <MdChromeReaderMode /><p>&nbsp;Historial de balance</p> 
                    </Link>
                    <Link onClick={()=> toggle3.setIsComponentVisible(false)} to='/profile/' className="item-menu-right" >
                    < IoMdSettings /><p>&nbsp;Configuracion de usuario</p> 
                    </Link>
                    <div className="item-menu-right">
                        <MdHelpOutline /><p>&nbsp;Ayuda</p> 
                    </div>
                    <div onClick={handleLogout} className="item-menu-right">
                        <MdExitToApp /><p>&nbsp;Cerrar Sesion</p>  
                    </div>
                </div> 
                
            </div>  
            <WithdrawModal token={props.token} wallet={userData.wallet} isOpen={modal3Open} onClose={onClose3Modal} />
            <DepositModal token={props.token} isOpen={modal4Open} onClose={onClose4Modal} />        
        </div>
    )    
}

export default React.memo(Navbar_navigation2)
