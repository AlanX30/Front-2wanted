import React, {useContext, useState } from 'react'
import './Styles/Navbar.css'
import { Link } from 'react-router-dom'
import { Context } from '../context'
import { WithdrawModal } from './Modals/WithdrawModal'
import { DepositModal } from './Modals/DepositModal'
import { useUserData } from '../hooks/useUserData'
import { IoMdSettings, IoIosContact } from 'react-icons/io'
import { MdRefresh, MdAccountCircle, MdKeyboardTab, MdAccountBalanceWallet, MdFileUpload, MdFileDownload, MdHelpOutline, MdChromeReaderMode, MdExitToApp } from "react-icons/md"
import WithdrawToUserModal from './Modals/WithdrawToUserModal'

const Navbar_navigation2 = props => {
    
    const [countUserData, setCountUserData] = useState(0)
    const { userData, loadingUserData, usdBtc } = useUserData(countUserData)
    const { logout } = useContext(Context)
    
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
        props.push()
        logout()
    }

    const toggle3 = props.useComponentVisible(false)

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
                            <div className='d-flex balance-refresh-container'>< MdRefresh size='35' className={loadingUserData ? 'refresh-balance-loading ' : 'refresh-balance'} onClick={()=> setCountUserData(countUserData + 1)} />  {userData.wallet} <p>&nbsp;BTC</p></div>
                            <div className='d-flex justify-content-center'><p>&nbsp;&nbsp;($&nbsp;</p><p>  {!usdBtc ? '' : userData.wallet < usdBtc ? 0 : Math.floor(userData.wallet / usdBtc)}</p><p>&nbsp;USD)</p></div>
                        </div>
                    </div>
                    <div className='item-menu-right-cashier'>
                        <div onClick={()=> setModal4Open(true)} to='/wallet' className='button-deposit'><MdFileUpload />Deposit</div>
                        <div onClick={()=>setModal3Open(true)} className='button-withdraw'><MdFileDownload />Withdraw</div>
                    </div>
                    <div onClick={()=> setModal2Open(true)} className="item-menu-right-withdrawToUser">
                        <MdKeyboardTab /> &nbsp;&nbsp; Send BTC to 2wanted User (free)
                    </div>
                    <Link onClick={()=> toggle3.setIsComponentVisible(false)} to='/balance/' className="item-menu-right">
                        <MdChromeReaderMode /><p>&nbsp;Balance history</p> 
                    </Link>
                    <Link onClick={()=> toggle3.setIsComponentVisible(false)} to='/profile/' className="item-menu-right" >
                    < IoMdSettings /><p>&nbsp;User settings</p> 
                    </Link>
                    <div className="item-menu-right">
                        <MdHelpOutline /><p>&nbsp;Help</p> 
                    </div>
                    <div onClick={handleLogout} className="item-menu-right">
                        <MdExitToApp /><p>&nbsp;Logout</p>  
                    </div>
                </div> 
                
            </div>  
            <WithdrawToUserModal wallet={userData.wallet} isOpen={modal2Open} onClose={onClose2Modal}/>
            <WithdrawModal  wallet={userData.wallet} isOpen={modal3Open} onClose={onClose3Modal} />
            <DepositModal isOpen={modal4Open} onClose={onClose4Modal} />        
        </div>
    )    
}

export default React.memo(Navbar_navigation2)
