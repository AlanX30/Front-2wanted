import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { MdAccountBalanceWallet } from "react-icons/md";

const RomDetails = ({count, url, salaId, userName, token, arbolData, dataRoom, inBalance, parent}) => {

    const [loadingToBalance, setLoadingToBalance] = useState(false)
    const [countUserData, setCountUserData] = useState(0)

    const price = dataRoom ? dataRoom.price : 0

    function formatNumber(number){
        return new Intl.NumberFormat("de-DE").format(number)
    }

    async function handleToBalance(){
        setLoadingToBalance(true)
        await axios({
            method: 'post',
            data: {user: userName, toBalance: 'true'},
            url: `${url}/api/in-sala?id=${salaId}`,
            headers: {
                 authorization: token
            }
        }).then(res => {
            setCountUserData(countUserData + 1)
            count(countUserData + 1)
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.data.msg,
            })
            setLoadingToBalance(false)
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
            })
            setLoadingToBalance(false)
        })
    }

    let acum3 = 0
    let acum4 = 0   

    for(let i = 6; i<=13; i++) {
        let divide = price/2   
        if(arbolData[i]){
            acum3 = acum3 + divide
        }
    }
    for(let i = 14; i<=29; i++){
        let divide = price/4  
        if(arbolData[i]){
            acum4 = acum4 + divide
        }
    }

    const tAcum = acum3 + acum4

    return(
        <div className='room-details'>
            <p>Nombre de sala:</p>
            <span>{dataRoom.name}</span>
            <p>Valor de sala:</p>
            <span>${formatNumber(dataRoom.price)}</span>
            <p>Tu usuario padre:</p>
            <span>{parent}</span>
            <p>Creador:</p>
            <span>{dataRoom.creator}</span>
            <p>Acumulado en nivel 3:</p>
            <span>${formatNumber(acum3)}</span>
            <p>Acumulado en nivel 4:</p>
            <span>${formatNumber(acum4)}</span>
            <p>Total acumulado:</p>
            <span>${formatNumber(tAcum)}</span>                   
            <p>Acumulado retirado:</p>
            <span>${formatNumber(inBalance)}</span>
            <button disabled={tAcum > inBalance ? false : true} onClick={handleToBalance}>
                <div className={!loadingToBalance ? '' : 'dNone'}>
                    <p>Retirar a billetera</p>
                    <label>${tAcum > inBalance ? formatNumber(tAcum - inBalance) : 0} ➜ <MdAccountBalanceWallet /></label>
                </div>
                <div className={loadingToBalance ? "spinner-toBalance spinner-border text-danger" : 'dNone'} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </button>
        </div>
    )
}

export default React.memo(RomDetails)

