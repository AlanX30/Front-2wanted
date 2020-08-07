import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useUserData } from '../hooks/useUserData'
import axios from 'axios'
import { RiArrowDownSLine } from "react-icons/ri"
import { MdChromeReaderMode } from "react-icons/md"
import './Styles/Balance.css'
import { url } from '../urlServer'

export const Balance = () => {

    const token = window.sessionStorage.getItem('token')

    const { userData } = useUserData()

    const [valueFecha1, setValueFecha1] = useState('') 
    const [valueFecha2, setValueFecha2] = useState('') 

    const [viewDates, setViewDates] = useState(false)

    function formatNumber(number){
        return new Intl.NumberFormat("de-DE").format(number)
    }

    const [ loading, setLoading ] = useState(false)
    
    const [ balance, setBalance ] = useState([])

    useEffect(() => { 

        setLoading(true)
            
        axios({
            method: 'post',
            url: url+'/api/userbalance',
            headers: {
                authorization: token
            }
        })
        .then(res => {
            setLoading(false)
            if(res.data.error) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.error,
                })
            }else{
                setBalance(res.data.data)
            }
        }).catch( err => {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err,
            })
        })

    }, [token])

    function handleDate(e){

        e.preventDefault()

        setLoading(true)
        
        const splitDate = valueFecha1.split('-')

        const fechaInicial = new Date(splitDate[0], splitDate[1]-1, splitDate[2])

        const splitDate2 = valueFecha2.split('-')

        const fechaFinal = new Date(splitDate2[0], splitDate2[1]-1, splitDate2[2], 24, 0, 0)

        axios({
            method: 'post',
            data: { getFechaInicial: fechaInicial, getFechaFinal: fechaFinal},
            url: url+'/api/userbalance',
            headers: {
                authorization: token
            }
        }).then(res => {
            setLoading(false)
            setBalance(res.data.data)
        })
    }

    return <div className='balance-container'>

        <div className='balance-title'>
            <h3><MdChromeReaderMode /> Historial de balance</h3>
        </div>
        <form className='date-form' onSubmit={handleDate}>
            <div className='wallet-balance'>
                <label>Billetera:</label><span>${formatNumber(userData.wallet)}</span>
            </div>
            <p onClick={()=>setViewDates(!viewDates)}>Busqueda por Fecha</p>
            <div onClick={()=>setViewDates(!viewDates)} className='flecha-busqueda-balance'>< RiArrowDownSLine /></div>
            <p className={viewDates ? '' : 'none-balance'}>Desde </p>
            <input className={viewDates ? '' : 'none-balance'} type="date" required={true} onChange={(e)=>setValueFecha1(e.target.value)}/>
            <p className={viewDates ? '' : 'none-balance'}>Hasta </p>
            <input className={viewDates ? '' : 'none-balance'} type="date" required={true} onChange={(e)=>setValueFecha2(e.target.value)}/>
            <button className={viewDates ? '' : 'none-balance'}>Buscar</button>
        </form>

        {
            loading ? <div>
                <div className="spinner-balance spinner-border text-danger" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            </div> :
            balance.length <= 0 ? <div>
                <h3 className='no-events-balance'>No hay eventos</h3>
            </div> :
            <div className='balance-list'>
            {
                balance.map((balance)=> {
                    return (
                        balance.type === 'won' ?  <li key={balance._id} >
                            <div className='balance-date-card'>{`${new Date(balance.date).getDate()}/${new Date(balance.date).getMonth() + 1}/${new Date(balance.date).getFullYear()}  -  ${new Date(balance.date).getHours()}:${new Date(balance.date).getMinutes()}`}</div>
                            <div>
                                <p className='balance-description-title'>Recibido en sala:</p>
                                <p>{balance.salaName}</p>
                                <p className='balance-description-title'>Billetera:</p>
                                <p>${formatNumber(balance.wallet)}</p>
                            </div>
                            <div className='balance-won-amount-container'>
                                <p className='balance-won-amount'>+ ${formatNumber(balance.won)}</p>
                            </div>
                        </li> :
                        balance.type === 'buy' ? <li key={balance._id} >
                            <div className='balance-date-card'>{`${new Date(balance.date).getDate()}/${new Date(balance.date).getMonth() + 1}/${new Date(balance.date).getFullYear()}  -  ${new Date(balance.date).getHours()}:${new Date(balance.date).getMinutes()}`}</div>
                            <div>
                                <p className='balance-description-title'>Pago de sala:</p>
                                <p>{balance.salaName}</p>
                                <p className='balance-description-title'>Billetera:</p>
                                <p>${formatNumber(balance.wallet)}</p>
                            </div>
                            <div className='balance-won-amount-container'>
                                <p className='balance-buy-amount'>- ${formatNumber(balance.salaPrice)}</p>
                            </div>
                        </li> :
                        balance.type === 'deposit' ? <li key={balance._id} >
                            <div className='balance-date-card'>{`${new Date(balance.date).getDate()}/${new Date(balance.date).getMonth() + 1}/${new Date(balance.date).getFullYear()}  -  ${new Date(balance.date).getHours()}:${new Date(balance.date).getMinutes()}`}</div>
                            <p>Deposito</p>
                        </li> :
                        balance.type === 'withdraw' && <li key={balance._id} >
                            <div className='balance-date-card'>{`${new Date(balance.date).getDate()}/${new Date(balance.date).getMonth() + 1}/${new Date(balance.date).getFullYear()}  -  ${new Date(balance.date).getHours()}:${new Date(balance.date).getMinutes()}`}</div>
                            <p>Retiro</p>
                        </li>
                    )   
                })
            }
            </div>
        }

    </div>
}