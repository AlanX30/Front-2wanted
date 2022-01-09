import React, {useContext, useState, useEffect } from 'react'
import './Styles/Navbar.css'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Context } from '../context'
import { WithdrawModal } from './Modals/WithdrawModal'
import { DepositModal } from './Modals/DepositModal'
import { IoMdSettings, IoIosContact } from 'react-icons/io'
import { MdRefresh, MdAccountCircle, MdAccountBalanceWallet, MdFileUpload, MdFileDownload, MdHelpOutline, MdChromeReaderMode, MdExitToApp, MdMail } from "react-icons/md"
import WithdrawToUserModal from './Modals/WithdrawToUserModal'

const Navbar_navigation2 = props => {

    const [countUserData, setCountUserData] = useState(0)

    const { logout, autoLogout, userData, loadingUserData, usdBtc, onUpdate } = useContext(Context)

    function formatNumber(number){
        return new Intl.NumberFormat('en-US').format(number)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const cookie = Cookies.get('conected')
            if(!cookie){ 
                props.pushLogout()
                autoLogout()
            }
        }, 300000)
        return () => clearInterval(interval)
    })

    useEffect(() => {
        if(countUserData > 0){onUpdate(countUserData)}
    },[countUserData, onUpdate])
    
    const [modal2Open, setModal2Open] = useState(null)
    const [modal3Open, setModal3Open] = useState(null)
    const [modal4Open, setModal4Open] = useState(null)

    function onClose2Modal(){
        setModal2Open(null)
    }
    function onClose3Modal(){
        setModal3Open(null)
    }
    function onClose4Modal(){
        setModal4Open(null)
    }

    function handleLogout() {
        props.pushLogout()
        logout()
    }

    const toggle3 = props.useComponentVisible(false)

    const wallet = userData.wallet ? userData.wallet.toString().slice(0,9) : 0

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
                        <div><MdAccountBalanceWallet />&nbsp;Wallet</div>
                        <div>
                            <div className='d-flex balance-refresh-container'>< MdRefresh size='35' className={loadingUserData ? 'refresh-balance-loading ' : 'refresh-balance'} onClick={()=> setCountUserData(countUserData + 1)} />  {Number(wallet)} <p>&nbsp;BTC</p></div>
                            <div className='d-flex justify-content-center'><p>&nbsp;&nbsp;(&nbsp;</p><p>  {!usdBtc ? '' : userData.wallet < usdBtc ? 0 : formatNumber(userData.wallet / usdBtc)}</p><p>&nbsp; USD)</p></div>
                        </div>
                    </div>
                    <div className='item-menu-right-cashier'>
                        <div onClick={()=> setModal4Open(true)} to='/wallet' className='button-deposit'><MdFileUpload />Depositar</div>
                        <div onClick={()=>setModal3Open(true)} className='button-withdraw'><MdFileDownload />Retirar</div>
                    </div>
                    <Link onClick={()=> toggle3.setIsComponentVisible(false)} to='/balance/' className="item-menu-right">
                        <MdChromeReaderMode /><p>&nbsp;Historial de balance</p> 
                    </Link>
                    <Link onClick={()=> toggle3.setIsComponentVisible(false)} to='/profile/' className="item-menu-right" >
                    < IoMdSettings /><p>&nbsp;Configuracion</p> 
                    </Link>
                    <Link onClick={()=> toggle3.setIsComponentVisible(false)} to='/help/' className="item-menu-right">
                        <MdHelpOutline /><p>&nbsp;Instrucciones</p> 
                    </Link>
                    <Link onClick={()=> toggle3.setIsComponentVisible(false)} to='/contact_us/' className="item-menu-right">
                        <MdMail /><p>&nbsp;Contactanos</p> 
                    </Link>
                    <div onClick={handleLogout} className="item-menu-right">
                        <MdExitToApp /><p>&nbsp;Cerrar sesion</p>  
                    </div>
                </div> 
                
            </div>  
            <WithdrawToUserModal wallet={userData.wallet} isOpen={modal2Open} onClose={onClose2Modal}/>
            <WithdrawModal  wallet={userData.wallet} isOpen={modal3Open} onClose={onClose3Modal} />
            <DepositModal userData={userData} isOpen={modal4Open} onClose={onClose4Modal} />        
        </div>
    )    
}

export default React.memo(Navbar_navigation2)
