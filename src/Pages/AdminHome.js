import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../context'
import { useGeneralBalance } from '../hooks/useGeneralBalance'
import { useFormValues } from '../hooks/useFormValues'
import { url } from '../urlServer'
import { Withdraw2wantedModal } from '../Components/Modals/Withdraw2wantedModal'
import { ToExcelModal } from '../Components/Modals/ToExcelModal'
import { MailModal } from '../Components/Modals/MailModal'
import Swal from 'sweetalert2'
import axios from 'axios'
import './Styles/AdminHome.css'

export const AdminHome = (props) => {

    const { csrfToken } = useContext(Context)

    const [viewButton, setViewButton] = useState(false)
    const [viewList, setViewList] = useState(false)
    const [list, setList] = useState([])

    const { reload, totalDeposit, actualCuenta, totalGanado, moneyUsersRooms, totalWallets, actual2wanted, withdrawUsers, withdraw2wanted, totalRetirado, generalLoading, verification } = useGeneralBalance()

    const retiradoTotalTotal = totalRetirado ? totalRetirado : 0

    const user = useFormValues()

    const [ modal1Open, setModal1Open ] = useState(false)
    const [ modal2Open, setModal2Open ] = useState(false)
    const [ modal4Open, setModal4Open ] = useState(false)
    const [ available, setAvailable ] = useState(0)
    const [ used, setUsed ] = useState(0)

    function onCloseModal1(){
        setModal1Open(false)
    }
    function onCloseModal2(){
        setModal2Open(false)
    }
    function onCloseModal4(){
        setModal4Open(false)
    }

    function refresh(){
        reload()
    }

    function handleWithdraw(e){
        e.preventDefault()

        axios({
            method: 'post',
            data: {user: user.value, verification: true},
            url: url+'/api/admin/user2wanted_withdraw',
            headers: {
                'X-CSRF-Token': csrfToken
            }
        })
        .then(res => {
            if(res.data.error) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.error,
                })
            }else{
                setAvailable(res.data.available)
                setUsed(res.data.used)
                setModal1Open(true)
            }
        }).catch( err => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err,
            })
        })
    }

    const [ totalPages2wantedwithdraws, setTotalPages2wantedwithdraws ] = useState(1)
    const [ page2wantedwithdraws, setPage2wantedwithdraws ] = useState(1)
    
    const [ withdraw2wantedLoading, setWithdraw2wantedLoading ] = useState(false)
    const [refresh2wanted, setRefresh2wanted] = useState(false)

    useEffect(()=>{

        setWithdraw2wantedLoading(true)
        
        if(csrfToken){
    
            axios({
                method: 'post',
                data: {page: page2wantedwithdraws},
                url: url+'/api/admin/withdraw2wantedlist',
                headers: {
                    'X-CSRF-Token': csrfToken
                }
            })
            .then(res => {
                if(res.data.error) {
                    setWithdraw2wantedLoading(false)
                    return Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: res.data.error,
                    })
                }else{
                    setList(res.data.list)
                    setTotalPages2wantedwithdraws(res.data.totalPages)
                    setWithdraw2wantedLoading(false)
                }
            }).catch( err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err,
                })
                setWithdraw2wantedLoading(false)
            })
        }

    },[page2wantedwithdraws, refresh2wanted, csrfToken])

    const [inicialDate, setInicialDate] = useState('')
    const [finalDate, setFinalDate] = useState('')

    const userHistory = useFormValues()

    function handleHistoryUsers(e){

        e.preventDefault()

        if(inicialDate && finalDate){
            props.history.push(`/historyUsers/${inicialDate}/${finalDate}/@${userHistory.value}`)
        }else{ props.history.push(`/historyUsers/@${userHistory.value}`)}

    }

    const salaName = useFormValues()

    function handleUsersInSala(e){

        e.preventDefault()

        props.history.push(`/historyUsers/@${userHistory.value}/${salaName.value}`)
        
    }

    const emailPersonalized = useFormValues()
    const asunto = useFormValues()
    const userEmailPersonalized = useFormValues()

    function handleEmailPersonalized(e){
        e.preventDefault()
        setModal4Open(true)
    }

    if(generalLoading){
        return <div>LOADING...</div>
    }

    return <div className='balance-container'>
        <div className='section-title'>
            <h1>Administracion</h1>
        </div>
        <div className='balance-section-buttons'>
            <div onClick={()=>setViewButton(false)} className={viewButton ? 'balance-button-top' : 'balance-button-top balance-button-top-active'}>General</div>
            <div onClick={()=>setViewButton(true)} className={!viewButton ? 'balance-button-top' : 'balance-button-top balance-button-top-active'}>Usuarios</div>
        </div>
        <div className={viewButton ? 'dNone' : 'section-general-container'}>
            <div className={!viewList ? '' : 'dNone'}>
                <h1 className={generalLoading ? '' : 'dNone'}>Cargando...</h1>
                <p>Total Depositado: <span>  {totalDeposit.toFixed(7)}</span> </p>
                <p>Actual en cuenta: <span> {actualCuenta.toFixed(7)} </span> </p>
                <p>Total obtenido por 2wanted: <span>{totalGanado.toFixed(7)}</span></p>
                <p>dinero de Usuarios en salas: <span> {moneyUsersRooms.toFixed(7)} </span> </p>
                <p>dinero actual en wallet de Usuarios: <span> {totalWallets.toFixed(7)} </span> </p>
                <p>dinero actual de 2wanted: <span> {actual2wanted.toFixed(7)} </span> </p>
                <p>dinero retirado de usuarios: <span> {withdrawUsers.toFixed(7)} </span></p>
                <p>dinero retirado de 2wanted: <span> {withdraw2wanted.toFixed(7)} </span> </p>
                <p>Total dinero retirado: <span> ${`${parseFloat(retiradoTotalTotal).toFixed(7)}`} </span></p>
                <p>Verificacion: <span>--{verification}--</span></p>
                <div>
                    <form className='withdrawform' onSubmit={handleWithdraw}>
                        <h2>Regitrar Retiro 2wanted</h2>
                        <input required {...user} type="text" placeholder='Usuario'/>
                        <button>Registrar</button>
                    </form>
                </div>
                <h2>Ir a lista de Retiros</h2>
                <button className='general-inferiorButtons' onClick={()=>{
                    setViewList(true)
                    setRefresh2wanted(!refresh2wanted)
                }}>Lista de retiros por 2wanted</button>
                <h2>Descargar Balance en Excel</h2>
                <button className='general-inferiorButtons' onClick={()=>setModal2Open(true)}>Balance a excel</button>
            </div>
            <div className={viewList ? 'listCards-withdraw2wanted' : 'dNone'}>
            <button className='navigation-back-button' onClick={()=>setViewList(false)}>🢀  Atras</button>  
            <div className='container-paginations-buttons'>
                <button onClick={()=>setPage2wantedwithdraws(page2wantedwithdraws - 1)} disabled={page2wantedwithdraws === 1 ? true : false}>🢀</button>
                    <p>{page2wantedwithdraws} </p><p>&nbsp;&nbsp;-&nbsp;&nbsp;</p><p> {totalPages2wantedwithdraws}</p>
                <button onClick={()=>setPage2wantedwithdraws(page2wantedwithdraws + 1)} disabled={page2wantedwithdraws === totalPages2wantedwithdraws ? true : false}>🢂</button>
                <p className={withdraw2wantedLoading ? 'CARGANDO_P' : 'dNone'}> CARGANDO..... </p>
            </div>           
                {
                    list.map( data => {
                        return (
                            <li key={data._id}>
                                <p className='balance-description-title'>Retirado por: <span>{data.user}</span></p> 
                                <p className='balance-description-title'>Monto: <span>${data.amount}</span></p>  
                                <p className='balance-description-title'>A direccion: <span>${data.toAddress}</span></p>  
                                <p className='balance-description-title'>txId: <span>${data.txId}</span></p>  
                                <p className='balance-description-title'>Fecha: <span>{new Date(data.date).getDate()}</span>/<span>{new Date(data.date).getMonth() + 1}</span>/<span>{new Date(data.date).getFullYear()}</span>&nbsp;&nbsp;<span>{new Date(data.date).getHours()}</span>:<span>{new Date(data.date).getMinutes()}</span></p>    
                            </li>
                        )
                    })
                }
            </div>
        </div>
        <div className={!viewButton ? 'dNone' : 'section-usuarios-container'}>
            <div className='container-info-users'>
                <form onSubmit={handleHistoryUsers} className='container-historial-users'>
                    <h2>Busqueda de historial de Usuarios</h2>
                    <div className='historial-fechas'>
                        <p>Desde</p>&nbsp;&nbsp;
                        <input onChange={(e)=>setInicialDate(e.target.value)} type="date"/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p>Hasta</p>&nbsp;&nbsp;
                        <input onChange={(e)=>setFinalDate(e.target.value)} type="date"/>
                    </div>
                        <input required {...userHistory} type="text" placeholder='Usuario'/>
                    <button>Buscar</button>
                </form>
                <form onSubmit={handleUsersInSala}>
                    <h2>Busqueda de historial de usuarios en salas especificas</h2>
                    <input required {...userHistory} type="text" placeholder='Usuario'/>
                    <input required {...salaName} type="text" placeholder='Sala'/>
                    <button>Buscar</button>
                </form>
                <form onSubmit={handleEmailPersonalized}>
                    <h2> Enviar correo personalizado a usuario</h2>
                    <input required {...userEmailPersonalized} type="text" placeholder='Usuario'/>
                    <input required {...asunto} type="text" placeholder='Asunto'/>
                    <textarea required {...emailPersonalized} placeholder='Mensaje'/>
                    <button>Enviar</button>
                </form>
            </div>
        </div>
        <Withdraw2wantedModal available={available} used={used} refresh={refresh} user={user.value} isOpen={modal1Open} onClose={onCloseModal1} />    
        <ToExcelModal isOpen={modal2Open} onClose={onCloseModal2} />      
        <MailModal msg={emailPersonalized.value} asunto={asunto.value} user={userEmailPersonalized.value} isOpen={modal4Open} onClose={onCloseModal4} />    
    </div>
}