import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { Context } from '../context'
import { RiArrowDownSLine } from "react-icons/ri"
import { MdChromeReaderMode } from "react-icons/md"
import { AiOutlineCaretRight, AiOutlineCaretLeft } from 'react-icons/ai'
import './Styles/Balance.css'
import { url } from '../urlServer'

export const Balance = () => {

    const { userData, csrfToken } = useContext(Context)

    const [valueFecha1, setValueFecha1] = useState('') 
    const [valueFecha2, setValueFecha2] = useState('') 

    const [viewDates, setViewDates] = useState(false)

    const [ loading, setLoading ] = useState(false)
    
    const [ balance, setBalance ] = useState([])

    const [countPages, setCountPages] = useState(1)
    
    const [totalPages, setTotalPages] = useState(1)
    
    const [countLastestPages, setCountLastestPages] = useState(1)

    useEffect(() => { 
        
        if(csrfToken){

            setLoading(true)
                
            axios({
                method: 'post',
                data: {page: countPages},
                url: url+'/api/userbalance',
                headers: { 
                    'X-CSRF-Token': csrfToken
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
                    setTotalPages(res.data.totalPages)
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countLastestPages, csrfToken])

    const [activeDate, setActiveDate] = useState(false)

    function handleDate(e){

        if(e){
            e.preventDefault()
        }

        setLoading(true)
        
        const splitDate = valueFecha1.split('-')

        const fechaInicial = new Date(splitDate[0], splitDate[1]-1, splitDate[2])

        const splitDate2 = valueFecha2.split('-')

        const fechaFinal = new Date(splitDate2[0], splitDate2[1]-1, splitDate2[2], 24, 0, 0)

        if(!activeDate) {
            setCountPages(1)
        }

        axios({
            method: 'post',
            data: { getFechaInicial: fechaInicial, getFechaFinal: fechaFinal, page: countPages},
            url: url+'/api/userbalance',
            headers: { 
                'X-CSRF-Token': csrfToken
            }
        }).then(res => {
            setActiveDate(true)
            setBalance(res.data.data)
            setTotalPages(res.data.totalPages)
            setLoading(false)
        })
    }

    const wallet = userData.wallet ? userData.wallet.toFixed(7) : 0

    return <div className='balance-container'>

        <div className='balance-title'>
            <h3><MdChromeReaderMode />Balance History</h3>
        </div>
        <form className='date-form' onSubmit={handleDate}>
            <div className='wallet-balance'>
                <label>Wallet:</label><span>{wallet} BTC</span>
            </div>
            <p onClick={()=>setViewDates(!viewDates)}>Search by date</p>
            <div onClick={()=>setViewDates(!viewDates)} className='flecha-busqueda-balance'>< RiArrowDownSLine /></div>
            <p className={viewDates ? '' : 'none-balance'}>From </p>
            <input className={viewDates ? '' : 'none-balance'} type="date" required={true} onChange={(e)=>setValueFecha1(e.target.value)}/>
            <p className={viewDates ? '' : 'none-balance'}>To </p>
            <input className={viewDates ? '' : 'none-balance'} type="date" required={true} onChange={(e)=>setValueFecha2(e.target.value)}/>
            <button className={viewDates ? '' : 'none-balance'}>Search</button>
        </form>
        <div className={totalPages === 1 ? 'dNone' : 'pagination pages-balance'}>
            <button disabled={countPages === 1 ? true : false} className='pagination-button' onClick={()=> {
                setCountPages(countPages - 1)
                if(activeDate){
                    handleDate()
                }else{setCountLastestPages(countLastestPages + 1)}
                }} ><AiOutlineCaretLeft size='30'/>
            </button> 
                <p><span>{countPages}</span> - {totalPages}</p> 
            <button disabled={countPages === totalPages ? true : false} className='pagination-button' onClick={()=> {
                setCountPages(countPages + 1)
                if(activeDate){
                    handleDate()
                }else{setCountLastestPages(countLastestPages + 1)}
            }}><AiOutlineCaretRight size='30' />
            </button>
        </div>
        {
            loading ? <div>
                <div className="spinner-balance spinner-border text-danger" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            </div> :
            balance.length <= 0 ? <div>
                <h3 className='no-events-balance'>Empty</h3>
            </div> :
            <div className='balance-list'>       
            {
                balance.map((balance)=> {
                    return (
                        balance.type === 'won' ?  <li key={balance._id} >
                            <div className='balance-date-card'>{`${new Date(balance.date).getDate()}/${new Date(balance.date).getMonth() + 1}/${new Date(balance.date).getFullYear()}  -  ${new Date(balance.date).getHours()}:${new Date(balance.date).getMinutes()}`}</div>
                            <div>
                                <p className='balance-description-title'>Won in room:</p>
                                <p>{balance.salaName}</p>
                                <p className='balance-description-title'>Wallet:</p>
                                <p>${balance.wallet.toFixed(7)}</p>
                            </div>
                            <div className='balance-won-amount-container'>
                                <p className='balance-won-amount'>+ ${balance.won.toFixed(7)}</p>
                            </div>
                        </li> :
                        balance.type === 'buy' ? <li key={balance._id} >
                            <div className='balance-date-card'>{`${new Date(balance.date).getDate()}/${new Date(balance.date).getMonth() + 1}/${new Date(balance.date).getFullYear()}  -  ${new Date(balance.date).getHours()}:${new Date(balance.date).getMinutes()}`}</div>
                            <div>
                                <p className='balance-description-title'>Room payment:</p>
                                <p>{balance.salaName}</p>
                                <p className='balance-description-title'>Wallet:</p>
                                <p>${balance.wallet.toFixed(7)}</p>
                            </div>
                            <div className='balance-won-amount-container'>
                                <p className='balance-buy-amount'>- ${balance.salaPrice}</p>
                            </div>
                        </li> :
                        balance.type === 'deposit' ? <li key={balance._id} >
                            <div className='balance-date-card'>{`${new Date(balance.date).getDate()}/${new Date(balance.date).getMonth() + 1}/${new Date(balance.date).getFullYear()}  -  ${new Date(balance.date).getHours()}:${new Date(balance.date).getMinutes()}`}</div>
                            <div>
                                <p className='balance-description-title'>Deposit:</p>
                                <p>${balance.depositAmount.toFixed(7)}</p>
                                <p className='balance-description-title'>Wallet:</p>
                                <p>${balance.wallet.toFixed(7)}</p>
                            </div>
                            <div className='balance-won-amount-container'>
                                <p className='balance-won-amount'>+ ${balance.depositAmount.toFixed(7)}</p>
                            </div>
                        </li> :
                        balance.type === 'withdrawToUser' ? <li key={balance._id} >
                            <div className='balance-date-card'>{`${new Date(balance.date).getDate()}/${new Date(balance.date).getMonth() + 1}/${new Date(balance.date).getFullYear()}  -  ${new Date(balance.date).getHours()}:${new Date(balance.date).getMinutes()}`}</div>
                            <div>
                                <p className='balance-description-title'>Withdraw:</p>
                                <p>${balance.withdrawAmount.toFixed(7)}</p>
                                <p className='balance-description-title'>To user:</p>
                                <p>{balance.toUser}</p>
                                <p className='balance-description-title'>Wallet:</p>
                                <p>${balance.wallet.toFixed(7)}</p>
                            </div>
                            <div className='balance-won-amount-container'>
                                <p className='balance-buy-amount'>- ${balance.withdrawAmount.toFixed(7)}</p>
                            </div>
                        </li> :
                        balance.type === 'withdrawBtc' && <li key={balance._id} >
                            <div className='balance-date-card'>{`${new Date(balance.date).getDate()}/${new Date(balance.date).getMonth() + 1}/${new Date(balance.date).getFullYear()}  -  ${new Date(balance.date).getHours()}:${new Date(balance.date).getMinutes()}`}</div>
                            <div>
                                <p className='balance-description-title'>Withdraw:</p>
                                <p>${balance.withdrawAmount.toFixed(7)}</p>
                                <p className='balance-description-title'>To Address:</p>
                                <p>{balance.toAddress}</p>
                                <p className='balance-description-title'>TxId:</p>
                                <p>{balance.txId}</p>
                                <p className='balance-description-title'>Wallet:</p>
                                <p>${balance.wallet.toFixed(7)}</p>
                            </div>
                            <div className='balance-won-amount-container'>
                                <p className='balance-buy-amount'>- ${balance.withdrawAmount.toFixed(7)}</p>
                            </div>
                        </li>
                    )   
                })
            }
            </div>
        }
        <div className={totalPages === 1 ? 'dNone' : 'pagination pages-balance-down'}>
            <button disabled={countPages === 1 ? true : false} className='pagination-button' onClick={()=> {
                setCountPages(countPages - 1)
                if(activeDate){
                    handleDate()
                }else{setCountLastestPages(countLastestPages + 1)}
                }} ><AiOutlineCaretLeft size='30'/>
            </button> 
                <p><span>{countPages}</span> - {totalPages}</p> 
            <button disabled={countPages === totalPages ? true : false} className='pagination-button' onClick={()=> {
                setCountPages(countPages + 1)
                if(activeDate){
                    handleDate()
                }else{setCountLastestPages(countLastestPages + 1)}
            }}><AiOutlineCaretRight size='30' />
            </button>
        </div>
    </div>
}