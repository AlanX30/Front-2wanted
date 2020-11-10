import React, { useState } from 'react'
import { IoMdSettings, IoIosContact, IoIosCloseCircle } from 'react-icons/io'
import { useUserData } from '../hooks/useUserData'
import { useFormValues } from '../hooks/useFormValues'
import { url } from '../urlServer'
import Cookies from 'js-cookie'
import './Styles/Profile.css'
import UpdatePasswordForm from '../Components/Forms/UpdatePasswordForm'
import UpdateEmailForm from '../Components/Forms/UpdateEmailForm'
import WithdrawBank from '../Components/Forms/WithdrawBank'

export const Profile = () => {
    
    const token = Cookies.get('token')

    const [buttonDebito, setButtonDebito] = useState(false)
    const [buttonPerfil, setButtonPerfil] = useState(true)
    const [count, setCount] = useState(0)

    const { userData } = useUserData(count)
    
    function formatNumber(number){
        return new Intl.NumberFormat("de-DE").format(number)
    }

    if(!userData.date) {return 'Loading'}
    
    return  <div className='configurations-container'>
                <div className='profile-title-container'>
                    <h2 className='profile-title'><IoMdSettings />&nbsp;Configuracion de usuario</h2>
                </div>
                <div className='configuration-wrap'>
                    <div className='configuration-buttons'>
                        <div onClick={()=>{setButtonPerfil(true); setButtonDebito(false)}} className={!buttonPerfil ? 'configuration-button' : 'configuration-button active'}>Perfil</div>
                        <div onClick={()=>{setButtonPerfil(false); setButtonDebito(true)}} className={!buttonDebito ? 'configuration-button' : 'configuration-button active'}>Cuenta de retiro</div>
                    </div>
                    <div className='configuration-details'>
                        <div className={buttonPerfil ? 'perfil-configuration-container' : 'dNone'}>
                            <div className='datos-configuration'>
                                <div><IoIosContact size='50' />&nbsp; {userData.userName}</div>
                                <h4>Datos de usuario</h4>
                                <div className='datos-description-container'>
                                    <p className='datos-titles'>Nombre de usuario: </p>
                                    <p className='datos-description'>{userData.userName}</p>
                                </div>
                                <div className='datos-description-container'>
                                    <p className='datos-titles'>Email: </p>
                                    <p className='datos-description'>{userData.email}</p>
                                    <a href="#changeEmail">Editar...</a>
                                </div>
                                <div className='datos-description-container'>
                                    <p className='datos-titles'>Numero de documento: </p>
                                    <p className='datos-description'>{formatNumber(userData.dni)}</p>
                                </div>
                                <div className='datos-description-container'>
                                    <p className='datos-titles'>Fecha de creacion: </p>
                                    <p className='datos-description'>{`${new Date(userData.date).getDate()}/${new Date(userData.date).getMonth() + 1}/${new Date(userData.date).getFullYear()}`}</p>
                                </div>
                            </div>

                            <UpdatePasswordForm url={url} token={token} useFormValues={useFormValues} />
                            
                            <UpdateEmailForm url={url} token={token} useFormValues={useFormValues} />
                            
                            <div className='user-delete-configuration'>
                                <button><IoIosCloseCircle size='40px' />Eliminar usuario</button>
                            </div>
                        </div>

{/* -------------------------------------------------------------------------------------------------------------  */}
                        <div className={buttonDebito ? 'debit-configuration-container' : 'dNone'}>
                            <WithdrawBank url={url} token={token} useFormValues={useFormValues} userData={userData} counter={setCount} />
                        </div>
                    </div>
                </div>
            </div>
}