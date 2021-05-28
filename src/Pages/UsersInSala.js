import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../context'
import { url } from '../urlServer'
import Swal from 'sweetalert2'
import axios from 'axios'

export const UsersInSalas = (props) => {

    const { csrfToken } = useContext(Context)

    const user = props.match.params.user
    const sala = props.match.params.sala

    const [ loading, setLoading ] = useState(false)
    const [ totalPages, setTotalPages ] = useState(1)
    const [ actualPage, setActualPage ] = useState(1)
    const [list, setList] = useState([])

    useEffect(()=>{
        
        setList([])
        setLoading(true)

        axios({
            method: 'post',
            data: { user, sala, page: actualPage },
            url: url+'/api/admin/BalanceUserInSala',
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
                setList(res.data.list)
                setTotalPages(res.data.totalPages)
            }
        }).catch( err => {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err,
            })
        })

    }, [ user, sala, actualPage, csrfToken])

    return <div className='balance-container'>
        <div className='section-title'>
            <h1>Historial de Usuario</h1>
        </div>
        <div className='container-paginations-buttons'>
            <button onClick={()=>setActualPage(actualPage - 1)} disabled={actualPage === 1 ? true : false}>🢀</button>
                <p>{actualPage} </p><p>&nbsp;&nbsp;-&nbsp;&nbsp;</p><p> {totalPages}</p>
            <button onClick={()=>setActualPage(actualPage + 1)} disabled={actualPage === totalPages ? true : false}>🢂</button>
            <div className={loading ? 'CARGANDO_P' : 'dNone'}>CARGANDO.......</div>
        </div>
        <div className='historyCards-container'>
            {
                list.map( balance => {
                    return (
                        balance.type === 'won' ?  <li key={balance._id} >
                            <div className='balance-date-card-admin'>{`${new Date(balance.date).getDate()}/${new Date(balance.date).getMonth() + 1}/${new Date(balance.date).getFullYear()}  -  ${new Date(balance.date).getHours()}:${new Date(balance.date).getMinutes()}`}</div>
                            <div>
                                <div className='historyCards-group'>
                                    <p className='balance-description-title'>Recibido en sala:</p>
                                    <p>{balance.salaName}</p>
                                </div>
                                <div className='historyCards-group'>
                                    <p className='balance-description-title'>Billetera:</p>
                                    <p>${balance.wallet.toString().slice(0,9)}</p>
                                </div>
                            </div>
                            <div>
                                <p className='balance-won-amount'>+ ${balance.won.toString().slice(0,9)}</p>
                            </div>
                        </li> :
                        balance.type === 'buy' && <li key={balance._id} >
                            <div className='balance-date-card-admin'>{`${new Date(balance.date).getDate()}/${new Date(balance.date).getMonth() + 1}/${new Date(balance.date).getFullYear()}  -  ${new Date(balance.date).getHours()}:${new Date(balance.date).getMinutes()}`}</div>
                            <div>
                                <div className="historyCards-group">
                                    <p className='balance-description-title'>Compra de sala:</p>
                                    <p>{balance.salaName}</p>
                                </div>
                                <div className="historyCards-group">
                                    <p className='balance-description-title'>Billetera:</p>
                                    <p>${balance.wallet.toString().slice(0,9)}</p>
                                </div>
                            </div>
                            <div className='balance-won-amount-container'>
                                <p className='balance-won-amount'>- ${balance.salaPrice.toString().slice(0,9)}</p>
                            </div>
                        </li>
                    )
                })
            }
        </div>
    </div>
}