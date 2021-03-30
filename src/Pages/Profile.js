import React, { useContext } from 'react'
import { IoMdSettings, IoIosContact } from 'react-icons/io'
import { Context } from '../context'
import { useFormValues } from '../hooks/useFormValues'
import { url } from '../urlServer'
import './Styles/Profile.css'
import UpdatePasswordForm from '../Components/Forms/UpdatePasswordForm'
import UpdateEmailForm from '../Components/Forms/UpdateEmailForm'

export const Profile = () => {

    const { userData } = useContext(Context)

    if(!userData.date) {return 'Loading'}
    
    return  <div className='configurations-container'>
                <div className='profile-title-container'>
                    <h2 className='profile-title'><IoMdSettings />&nbsp;User configuration</h2>
                </div>
                <div className='configuration-wrap'>
                    <div className='configuration-buttons'>
                        <div className='configuration-button active'>Profile</div>
                    </div>
                    <div className='configuration-details'>
                        <div className='perfil-configuration-container'>
                            <div className='datos-configuration'>
                                <div><IoIosContact size='50' />&nbsp; {userData.userName}</div>
                                <h4>User data</h4>
                                <div className='datos-description-container'>
                                    <p className='datos-titles'>Username: </p>
                                    <p className='datos-description'>{userData.userName}</p>
                                </div>
                                <div className='datos-description-container'>
                                    <p className='datos-titles'>Email: </p>
                                    <p className='datos-description'>{userData.email}</p>
                                    <a href="#changeEmail">Edit...</a>
                                </div>
                                <div className='datos-description-container'>
                                    <p className='datos-titles'>Created from: </p>
                                    <p className='datos-description'>{`${new Date(userData.date).getDate()}/${new Date(userData.date).getMonth() + 1}/${new Date(userData.date).getFullYear()}`}</p>
                                </div>
                            </div>

                            <UpdatePasswordForm url={url} useFormValues={useFormValues} />
                            
                            <UpdateEmailForm url={url} useFormValues={useFormValues} />

                        </div>

{/* -------------------------------------------------------------------------------------------------------------  */}

                    </div>
                </div>
            </div>
}