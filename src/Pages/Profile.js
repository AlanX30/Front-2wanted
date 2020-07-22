import React, {useState} from 'react'
import { IoMdSettings, IoIosContact, IoIosCloseCircle } from 'react-icons/io'
import { MdInfo, MdAddCircle, MdAccountBalanceWallet, MdCreate, MdMail, MdLockOutline } from "react-icons/md"
import { useFormValues } from '../hooks/useFormValues'
import { useUserData } from '../hooks/useUserData'
import Swal from 'sweetalert2'
import axios from 'axios'
import './Styles/Profile.css'
import { useEffect } from 'react'

export const Profile = () => {
    
    const token = window.sessionStorage.getItem('token')
    const reg_password = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
    const reg_numbers = /^([0-9])*$/
    /* const reg_whiteSpace = /^$|\s+/ */

    const [count, setCount] = useState(0)

    const { userData } = useUserData(count)
    
    const password = useFormValues()
    const newPassword = useFormValues()
    const confirmNewPassword = useFormValues()
    const email = useFormValues()
    const newEmail = useFormValues()
    const confirmNewEmail = useFormValues()

    const [newPasswordError, setNewPasswordError] = useState(false)
    const [newEmailError, setNewEmailError] = useState(false)
    const [password_valid, setPassword_valid] = useState(true)

    function updatePassword(e){
        e.preventDefault()  

        if(!reg_password.test(newPassword.value)){
            return setPassword_valid(false)
         }else{setPassword_valid(true)}

        if(newPassword.value === confirmNewPassword.value){

            axios({
                method: 'post',
                data: { password: password.value, newPassword: newPassword.value },
                url: 'http://localhost:3500/edit/passwordemail',
                headers: {
                    authorization: token
                }
            }).then( res => {
                if(res.data.error){
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: res.data.error,
                    })
                }else{
                    Swal.fire({
                        icon: 'success',
                        title: res.data.msg,
                    })
                }
            }).catch( error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error,
                })
            })
        }else{return setNewPasswordError(true)}

    }
    function updateEmail(e){
        e.preventDefault()

        if(newEmail.value === confirmNewEmail.value){

            axios({
                method: 'post',
                data: { newEmail: newEmail.value, email: email.value },
                url: 'http://localhost:3500/edit/passwordemail',
                headers: {
                    authorization: token
                }
            }).then( res => {
                if(res.data.error){
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: res.data.error,
                    })
                }else{
                    Swal.fire({
                        icon: 'success',
                        title: res.data.msg,
                    })
                }
            }).catch( error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error,
                })
            })
            
        }else{return  setNewEmailError(true)}

    }

    const [buttonPerfil, setButtonPerfil] = useState(true)
    const [buttonDebito, setButtonDebito] = useState(false)


    function formatNumber(number){
        return new Intl.NumberFormat("de-DE").format(number)
    }

    const [type, setType] = useState('')

    const optionTypes = [
        { value: 'CC' },
        { value: 'NIT' },
        { value: 'CE' }
    ]

    const handleSelectType = (e) => {
        const type = e.target.value
        setType(type)
    }

    const [Bank, setBank] = useState('')

    const optionBanks = [
        { value: 'Davivienda' },
        { value: 'Bancolombia' },
        { value: 'Nequi' },
        { value: 'Citibank' },
        { value: 'Banco Caja Social' },
        { value: 'Banco Compartir S.A.' },
        { value: 'AV Villas' },
        { value: 'BBVA Colombia' },
        { value: 'Banco Agrario' },
        { value: 'Banco Popular' },
        { value: 'Banco Finandina' },
        { value: 'Banco Cooperativo Coopcentral' },
        { value: 'Banco Mundo Mujer' },
        { value: 'Banco de Bogotá' },
        { value: 'Banco de Occidente' },
        { value: 'Banco Falabella' },
        { value: 'Banco ITAU' },
        { value: 'Banco ITAU antes CorpBanca' },
        { value: 'Banco GNB Sudameris' },
        { value: 'Banco Santander de Negocios' },
        { value: 'Banco Serfinanzas' },
        { value: 'Banco Pichincha' },
        { value: 'RappiPay' },
        { value: 'Banco Procredit' },
        { value: 'Bancoomeva' },
        { value: 'Scotiabank Colpatria' }
    ]

    const handleSelectBank = (e) => {
        const Bank = e.target.value
        setBank(Bank)
    }

    const [typeCount, setTypeCount] = useState('')

    const optionTypeCount = [
        { value: 'Cuenta Nequi' },
        { value: 'Cuenta de Ahorro' },
        { value: 'Cuenta Corriente'}
    ]

    const handleSelectTypeCount = (e) => {
        const TypeCount = e.target.value
        setTypeCount(TypeCount)
    }
    
    const titular = useFormValues()
    const dni = useFormValues()
    const numeroCuenta = useFormValues()
    
    const editBankValues = {
        titular: titular.value, tipo: type, dni: dni.value, banco: Bank, numeroCuenta: numeroCuenta.value, tipoCuenta: typeCount
    }

    const [dni_valid, setDni_valid] = useState(true)
    const [numeroCuenta_valid, setNumeroCuenta_valid] = useState(true)
    const [tipo_valid, setTipo_valid] = useState(true)
    const [bank_valid, setBank_valid] = useState(true)
    const [tipoCuenta_valid, setTipoCuenta_valid] = useState(true)

    async function handleEditBank(e) {
        e.preventDefault()

        if(type === 'Tipo' || type === ''){
            return setTipo_valid(false)
        }else{setTipo_valid(true)}
        if(!reg_numbers.test(dni.value)) {
            return setDni_valid(false)
        }else{setDni_valid(true)}
        if(Bank === 'Seleccionar Banco' || Bank === ''){
            return setBank_valid(false)
        }else{setBank_valid(true)}
        if(!reg_numbers.test(numeroCuenta.value)) {
            return setNumeroCuenta_valid(false)
        }else{setNumeroCuenta_valid(true)}
        if(typeCount === 'Tipo de Cuenta' || typeCount === ''){
            return setTipoCuenta_valid(false)
        }else{setTipoCuenta_valid(true)}

        await axios({
            method: 'post',
            data: editBankValues,
            url: 'http://localhost:3500/edit/bankAccount',
            headers: {
                authorization: token
            }
        }).then( res => {
            if(res.data.error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.error,
                })
            }else{
                Swal.fire({
                    icon: 'success',
                    title: res.data.msg,
                })
                setCount(count + 1)
            }
        }).catch( error => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
            })
        })
    }

    const [editBank, setEditBank] = useState(false)

    useEffect(()=>{
        if(userData.bank){
            if(userData.bank.titular){
                setEditBank(true)
            }
        }  
    }, [userData])

    function handleRemoveBank(e){

        e.preventDefault()

        axios({
            method: 'post',
            data: editBankValues,
            url: 'http://localhost:3500/remove/bankAccount',
            headers: {
                authorization: token
            }
        }).then( res => {
            if(res.data.error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.error,
                })
            }else{
                Swal.fire({
                    icon: 'success',
                    title: res.data.msg,
                })
                setEditBank(false)
            }
        }).catch( error => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
            })
        })
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
                                    <p className='datos-description'>{userData.date.split('T')[0]}</p>
                                </div>
                            </div>
                            <div className='password-configuration'>
                                <h4><MdLockOutline />&nbsp;Cambio de contraseña</h4>
                                <form onSubmit={updatePassword}>
                                    <input {...password} autoComplete='true' required type="password" placeholder='Contraseña actual'/>
                                    <input {...newPassword} autoComplete='true' required type="password" placeholder='Contraseña nueva'/>
                                    <input {...confirmNewPassword} autoComplete='true' required type="password" placeholder='Confirmar contraseña'/>
                                    <p className={newPasswordError ? 'configuration-warning' : 'dNone'}><MdInfo /> La confirmacion no coincide</p>
                                    <p className={!password_valid ? 'configuration-warning' : 'dNone'}><MdInfo />&nbsp;Debe contener mayuscula, minuscula y numero, minimo 8 caracteres</p>
                                    <button>Actualizar Contraseña</button>
                                </form>
                            </div>
                            <div className='email-configuration'>
                                <h4><MdMail />&nbsp;Cambio de Email</h4>
                                <form onSubmit={updateEmail}>
                                    <input id='changeEmail' autoComplete='true' {...email} required type="email" placeholder='Email actual'/>
                                    <input {...newEmail} autoComplete='true' required type="email" placeholder='Email nuevo'/>
                                    <input {...confirmNewEmail} autoComplete='true' required type="email" placeholder='Confirmar email'/>
                                    <p className={newEmailError ? 'configuration-warning' : 'dNone'}><MdInfo /> La confirmacion no coincide</p>
                                    <button>Actualizar email</button>
                                </form>
                            </div>
                            <div className='user-delete-configuration'>
                                <button><IoIosCloseCircle size='40px' />Eliminar usuario</button>
                            </div>
                        </div>

{/* -------------------------------------------------------------------------------------------------------------  */}

                        <div className={buttonDebito ? 'debit-configuration-container' : 'dNone'}>
                            {
                            !editBank ?    
                            <div>
                                <h4>Agregar Cuenta Bancaria</h4>
                                <form onSubmit={handleEditBank}>
                                    <input {...titular} required type="text" placeholder='Nombre y apellido del titular'/>
                                    <div className='d-flex'>
                                        <select required onClick={handleSelectType} className='select-type' name="Tipo">
                                            <option className='optiion-none'>Tipo</option>
                                            {
                                                optionTypes.map((item) => (
                                                    <option key={item.value} value={item.value}>{item.value}</option>
                                                ))
                                            }
                                        </select>
                                        <input {...dni} required type="text" placeholder='Numero de identificacion'/>
                                    </div>
                                    <p className={!tipo_valid ? 'configuration-warning' : 'dNone'}><MdInfo /> Selecciona Tipo</p>
                                    <p className={!dni_valid? 'configuration-warning' : 'dNone'}><MdInfo /> Solo Numeros</p>
                                    <select onClick={handleSelectBank} required className='select-type largo' name="Banco">
                                        <option className='optiion-none'>Seleccionar Banco</option>
                                        {
                                            optionBanks.map((item) => (
                                                <option key={item.value} value={item.value}>{item.value}</option>
                                            ))
                                        }
                                    </select>
                                    <p className={!bank_valid ? 'configuration-warning' : 'dNone'}><MdInfo /> Selecciona Banco</p>
                                    <input {...numeroCuenta} required type="text" placeholder='Numero de Cuenta' />
                                    <p className={!numeroCuenta_valid ? 'configuration-warning' : 'dNone'}><MdInfo /> Solo Numeros</p>
                                    <select onClick={handleSelectTypeCount} required className='select-type largo' name="Tipo de cuenta">
                                        <option className='optiion-none'>Tipo de Cuenta</option>
                                        {
                                            optionTypeCount.map((item) => (
                                                <option key={item.value} value={item.value}>{item.value}</option>
                                            ))
                                        }
                                    </select>
                                    <p className={!tipoCuenta_valid ? 'configuration-warning' : 'dNone'}><MdInfo /> Selecciona Tipo de cuenta</p>
                                    <button className='button-aggregate-count'><MdAddCircle />  Agregar</button>
                                </form>
                            </div> :
                            <div className='datos-configuration'>
                                <h4><MdAccountBalanceWallet />&nbsp;Cuenta Bancaria</h4>
                                <div>
                                    <div className='datos-description-container'>
                                        <p className='datos-titles'>Titular:</p>
                                        <p className='datos-description'>{userData.bank.titular}</p>
                                    </div>
                                    <div className='datos-description-container'>
                                        <p className='datos-titles'>Numero Identificacion:</p>
                                        <p className='datos-description'>{userData.bank.tipo}.&nbsp; {formatNumber(userData.bank.dni)}</p>
                                    </div>
                                    <div className='datos-description-container'>
                                        <p className='datos-titles'>Banco:</p>
                                        <p className='datos-description'>{userData.bank.banco} - {userData.bank.tipoCuenta}</p>
                                    </div>
                                    <div className='datos-description-container'>
                                        <p className='datos-titles'>Numero de cuenta:</p>
                                        <p className='datos-description'>{userData.bank.numeroCuenta}</p>
                                    </div>
                                    <div className='buttons-delete-bank'>
                                        <button onClick={handleRemoveBank}><IoIosCloseCircle />Eliminar</button>
                                        <button onClick={()=>setEditBank(false)}><MdCreate />Editar</button>
                                    </div>
                                </div>
                            </div>
                        }
                        </div>
                    </div>
                </div>
            </div>
}