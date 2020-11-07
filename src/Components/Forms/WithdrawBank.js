import React, {useState, useEffect} from 'react'
import '../../Pages/Styles/Profile.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { MdInfo, MdAddCircle, MdAccountBalanceWallet, MdCreate } from "react-icons/md"
import { IoIosCloseCircle } from 'react-icons/io'

const WithdrawBank = ({token, url, useFormValues, counter, userData}) => {
    
    const reg_numbers = /^([0-9])*$/
    const [editBank, setEditBank] = useState(false)
    const [editBankLoading, setEditBankLoading] = useState(false)
    const [dni_valid, setDni_valid] = useState(true)
    const [numeroCuenta_valid, setNumeroCuenta_valid] = useState(true)
    const [tipo_valid, setTipo_valid] = useState(true)
    const [bank_valid, setBank_valid] = useState(true)
    const [tipoCuenta_valid, setTipoCuenta_valid] = useState(true)
    const [typeCount, setTypeCount] = useState('')
    const [count, setCount] = useState(0)
    const [type, setType] = useState('')

    function formatNumber(number){
        return new Intl.NumberFormat("de-DE").format(number)
    }
    
    const titular = useFormValues()
    const dni = useFormValues()
    const numeroCuenta = useFormValues()

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

        setEditBankLoading(true)

        await axios({
            method: 'post',
            data: editBankValues,
            url: url+'/edit/bankAccount',
            headers: {
                authorization: token
            }
        }).then( res => {
            setEditBankLoading(false)
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
                counter(count + 1)
            }
        }).catch( error => {
            setEditBankLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
            })
        })
    }

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
            url: url+'/remove/bankAccount',
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

    const [cancelEditBank, setCancelEditBank] = useState(false)

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

    const optionTypeCount = [
        { value: 'Cuenta Nequi' },
        { value: 'Cuenta de Ahorro' },
        { value: 'Cuenta Corriente'}
    ]

    const handleSelectTypeCount = (e) => {
        const TypeCount = e.target.value
        setTypeCount(TypeCount)
    }
    
    const editBankValues = {
        titular: titular.value, tipo: type, dni: dni.value, banco: Bank, numeroCuenta: numeroCuenta.value, tipoCuenta: typeCount
    }

    return(
        <>
            {
                !editBank ?    
                <div className='debit-configuration-wrap'>
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
                        <p className='configuration-warning'><MdInfo />En caso de Nequi colocar numero telefonico</p>
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
                        <button disabled={editBankLoading ? true : false} className='button-aggregate-count'>
                            <div className={editBankLoading ? "spinner-conf spinner-border text-danger" : 'dNone'} role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <p className={editBankLoading ? 'dNone' : '' }><MdAddCircle />Agregar</p>
                        </button>
                        <button disabled={editBankLoading ? true : false} className={cancelEditBank ? 'cancelEditBank' : 'dNone' } onClick={()=>{setEditBank(true); setCancelEditBank(false)}} type='button'><IoIosCloseCircle />Cancelar</button>
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
                            <button onClick={()=>{setEditBank(false); setCancelEditBank(true) }}><MdCreate />Editar</button>
                        </div>
                    </div>
                </div>
            }
        </> 
    )
}

export default React.memo(WithdrawBank)
