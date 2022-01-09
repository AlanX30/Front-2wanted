import React, { useState } from 'react'
import PasswordVerification from '../Modals/PasswordVerfication'
import '../../Pages/Styles/Profile.css'
import { MdInfo, MdMail } from "react-icons/md"

const UpdateEmailForm = ({url, useFormValues}) => {

    const [newEmailError, setNewEmailError] = useState(false)
    const [modalOpen, setModalOpen] = useState(null)
    const email = useFormValues()
    const newEmail = useFormValues()
    const confirmNewEmail = useFormValues()

    function onCloseModal(){
        setModalOpen(null)
    }

    const data = { newEmail: newEmail.value, email: email.value }

    function updateEmail(e){

        e.preventDefault()

        if(newEmail.value === confirmNewEmail.value){

            setModalOpen(true)
            
        }else{return  setNewEmailError(true)}
    }

    return(
        <div className='email-configuration'>
            <h4><MdMail />&nbsp;Cambiar Email</h4>
            <form onSubmit={updateEmail}>
                <input id='changeEmail' autoComplete='true' {...email} required type="email" placeholder='Email'/>
                <input {...newEmail} autoComplete='true' required type="email" placeholder='Nuevo email'/>
                <input {...confirmNewEmail} autoComplete='true' required type="email" placeholder='Confirma el nuevo email'/>
                <p className={newEmailError ? 'configuration-warning' : 'dNone'}><MdInfo />La confirmacion no coincide</p>
                <button>
                    <p>Actualizar email</p>
                </button>
            </form>
            <PasswordVerification isOpen={modalOpen} onClose2={onCloseModal} data={data} url={url+'/edit/passwordemail'} />
        </div>
    )
}

export default UpdateEmailForm
