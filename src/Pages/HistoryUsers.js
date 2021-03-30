import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../context'
import { url } from '../urlServer'
import Swal from 'sweetalert2'
import axios from 'axios'
import './Styles/HistoryUsers.css'

export const HistoryUsers = (props) => {
    
    const user = props.match.params.user

    const { csrfToken } = useContext(Context)
    
    const [ modeList, setModeList ] = useState('normal')

    const [ responseList, setResponseList ] = useState([])
    const [ totalPages, setTotalPages ] = useState(1)
    const [ actualPage, setActualPage ] = useState(1)
    const [ listLoading, setListLoading ] = useState(false)
    
    useEffect(()=>{

        setResponseList([])
        setListLoading(true)

        if(modeList === 'normal'){
            if(props.match.params.fecha1 && props.match.params.fecha2){
    
                const inicialDate = props.match.params.fecha1
                const finalDate = props.match.params.fecha2
                
                const splitDate = inicialDate.split('-')
            
                const fechaInicio = new Date(splitDate[0], splitDate[1]-1, splitDate[2])
                    
                const splitDate2 = finalDate.split('-')
                
                const fechaFinal = new Date(splitDate2[0], splitDate2[1]-1, splitDate2[2], 24, 0, 0)
    
                axios({
                    method: 'post',
                    data: { getFechaInicial: fechaInicio, getFechaFinal: fechaFinal, user: user, page: actualPage },
                    url: url+'/api/admin/userhistorialbalance',
                    headers: {
                        'X-CSRF-Token': csrfToken
                    }
                })
                .then(res => {
                    if(res.data.error) {
                        setListLoading(false)
                        return Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: res.data.error,
                        })
                    }else{
                        setResponseList(res.data.data)
                        setTotalPages(res.data.totalPages)
                        setListLoading(false)
                    }
                }).catch( err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: err,
                    })
                    setListLoading(false)
                })
                
            }else if(modeList === 'normal'){
    
                axios({
                    method: 'post',
                    data: { user: user, page: actualPage },
                    url: url+'/api/admin/userhistorialbalance',
                    headers: {
                        'X-CSRF-Token': csrfToken
                    }
                })
                .then(res => {
                    if(res.data.error) {
                        setListLoading(false)
                        return Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: res.data.error,
                        })
                    }else{
                        setResponseList(res.data.data)
                        setTotalPages(res.data.totalPages)
                        setListLoading(false)
                    }
                }).catch( err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: err,
                    })
                    setListLoading(false)
                })
            }
        }else if(modeList === 'deposit'){
            axios({
                method: 'post',
                data: { user: user, page: actualPage },
                url: url+'/api/admin/depositUsersList',
                headers: {
                    'X-CSRF-Token': csrfToken
                }
            })
            .then(res => {
                setResponseList(res.data.list)
                setListLoading(false)
            }).catch( err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err,
                })
                setListLoading(false)
            })
        }else if(modeList === 'withdraw'){
            axios({
                method: 'post',
                data: { user: user, page: actualPage },
                url: url+'/api/admin/withdrawUsersList',
                headers: {
                    'X-CSRF-Token': csrfToken
                }
            })
            .then(res => {
                setResponseList(res.data.list)
                setListLoading(false)
            }).catch( err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err,
                })
                setListLoading(false)
            })
        }

    },[user, props.match.params.fecha1, props.match.params.fecha2, actualPage, modeList, csrfToken])

    function handleDeposits(){
        setActualPage(1)
        setModeList('deposit')
    }

    function handleWithdraws(){
        setActualPage(1)
        setModeList('withdraw')
    }
    
    return <div className='balance-container'>
        <div className='section-title'>
            <h1>Historial de Usuario</h1>
        </div>
        <div className={props.match.params.fecha1 ? 'section-title' : 'dNone'}>
            {
                <h2>Desde {props.match.params.fecha1} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hasta {props.match.params.fecha2}</h2>
            }
        </div>
        <div className='historyUsers-buttonsTop'>
            <button onClick={handleDeposits} className='historyUsers-buttonTop'>Buscar Depositos</button>
            <button onClick={handleWithdraws} className='historyUsers-buttonTop'>Buscar Retiros</button>
        </div>
        <div className='container-paginations-buttons'>
            <button onClick={()=>setActualPage(actualPage - 1)} disabled={actualPage === 1 ? true : false}>🢀</button>
                <p>{actualPage} </p><p>&nbsp;&nbsp;-&nbsp;&nbsp;</p><p> {totalPages}</p>
            <button onClick={()=>setActualPage(actualPage + 1)} disabled={actualPage === totalPages ? true : false}>🢂</button>
            <div className={listLoading ? 'CARGANDO_P' : 'dNone'}>CARGANDO.........</div>    
        </div>
        <div className='historyCards-container'>
            {
                responseList.map( balance => {
                    return (
                        balance.type === 'won' ?  <li key={balance._id} >
                            <div className='balance-date-card'>{`${new Date(balance.date).getDate()}/${new Date(balance.date).getMonth() + 1}/${new Date(balance.date).getFullYear()}  -  ${new Date(balance.date).getHours()}:${new Date(balance.date).getMinutes()}`}</div>
                            <div>
                                <div className='historyCards-group'>
                                    <p className='balance-description-title'>Recibido en sala:</p>
                                    <p>{balance.salaName}</p>
                                </div>
                                <div className='historyCards-group'>
                                    <p className='balance-description-title'>Billetera:</p>
                                    <p>${balance.wallet.toFixed(7)}</p>
                                </div>
                            </div>
                            <div>
                                <p className='balance-won-amount'>+ ${balance.won.toFixed(7)}</p>
                            </div>
                        </li> :
                        balance.type === 'buy' ? <li key={balance._id} >
                            <div className='balance-date-card'>{`${new Date(balance.date).getDate()}/${new Date(balance.date).getMonth() + 1}/${new Date(balance.date).getFullYear()}  -  ${new Date(balance.date).getHours()}:${new Date(balance.date).getMinutes()}`}</div>
                            <div>
                                <div className="historyCards-group">
                                    <p className='balance-description-title'>Compra de sala:</p>
                                    <p>{balance.salaName}</p>
                                </div>
                                <div className="historyCards-group">
                                    <p className='balance-description-title'>Billetera:</p>
                                    <p>${balance.wallet.toFixed(7)}</p>
                                </div>
                            </div>
                            <div className='balance-won-amount-container'>
                                <p className='balance-won-amount'>- ${balance.salaPrice.toFixed(7)}</p>
                            </div>
                        </li> :
                        balance.type === 'deposit' ? <li key={balance._id} >
                            <div className='balance-date-card'>{`${new Date(balance.date).getDate()}/${new Date(balance.date).getMonth() + 1}/${new Date(balance.date).getFullYear()}  -  ${new Date(balance.date).getHours()}:${new Date(balance.date).getMinutes()}`}</div>
                            <p className='balance-description-title'>Deposito</p>
                            <div className='balance-won-amount-container'>
                                <p className='balance-won-amount'>+${balance.depositAmount.toFixed(7)}</p>
                            </div>
                        </li> :
                        balance.type === 'withdrawBtc' ? <li key={balance._id} >
                            <div className='balance-date-card'>{`${new Date(balance.date).getDate()}/${new Date(balance.date).getMonth() + 1}/${new Date(balance.date).getFullYear()}  -  ${new Date(balance.date).getHours()}:${new Date(balance.date).getMinutes()}`}</div>
                            <div>
                                <div className="historyCards-group">
                                    <p className='balance-description-title'>Retiro a direccion:</p>
                                    <p>{balance.toAddress}</p>
                                </div>
                                <div className="historyCards-group">
                                    <p className='balance-description-title'>txId:</p>
                                    <p>{balance.txId}</p>
                                </div>
                                <div className="historyCards-group">
                                    <p className='balance-description-title'>Billetera:</p>
                                    <p>{balance.wallet}</p>
                                </div>
                            </div>
                            <div className='balance-won-amount-container'>
                                <p className='balance-won-amount'>+${balance.withdrawAmount.toFixed(7)}</p>
                            </div>
                        </li> :
                        balance.type === 'withdrawToUser' && <li key={balance._id}>
                            <div className='balance-date-card'>{`${new Date(balance.date).getDate()}/${new Date(balance.date).getMonth() + 1}/${new Date(balance.date).getFullYear()}  -  ${new Date(balance.date).getHours()}:${new Date(balance.date).getMinutes()}`}</div>
                            <div>
                                <div className="historyCards-group">
                                    <p className='balance-description-title'>Retiro a usuario:</p>
                                    <p>{balance.toUser}</p>
                                </div>
                                <div className="historyCards-group">
                                    <p className='balance-description-title'>Reference:</p>
                                    <p>{balance.reference}</p>
                                </div>
                                <div className="historyCards-group">
                                    <p className='balance-description-title'>Billetera:</p>
                                    <p>{balance.wallet}</p>
                                </div>
                            </div>
                            <div className='balance-won-amount-container'>
                                <p className='balance-won-amount'>-${balance.withdrawAmount}</p>
                            </div>
                        </li>
                    )
                })
            }
        </div>
    </div>
}