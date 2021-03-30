import React, { useState, useContext } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Context } from '../context'
import { MdAccountBalanceWallet } from "react-icons/md";

const RomDetails = ({loading, usdBtc, count, url, salaId, userName, arbolData, dataRoom, inBalance, parent}) => {

    const [loadingToBalance, setLoadingToBalance] = useState(false)
    const [countUserData, setCountUserData] = useState(0)
    const { csrfToken } = useContext(Context)
    const price = dataRoom ? dataRoom.price : 0

    function formatNumber(number){
        return new Intl.NumberFormat('en-US').format(number)
    }

    async function handleToBalance(){
        setLoadingToBalance(true)
        await axios({
            method: 'post',
            data: {user: userName, toBalance: 'true'},
            url: `${url}/api/in-sala?id=${salaId}`,
            headers: { 
                'X-CSRF-Token': csrfToken
            }
        }).then(res => {
            setLoadingToBalance(false)
            if(res.data.error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.error,
                })
            }else{
                setCountUserData(countUserData + 1)
                count(countUserData + 1)
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res.data.msg,
                })
            }
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

    if(loading){ return <div className='room-details'>Loading...</div>}

    return(
        <div className='room-details'>
            <p>Room Name:</p>
            <span>{dataRoom.name}</span>
            <p>Room Price:</p>
            <span>{`${dataRoom.price.toFixed(7)} BTC  (${formatNumber(dataRoom.price / usdBtc)} USD)`}</span>
            <p>Parent User:</p>
            <span>{parent}</span>
            <p>Creator:</p>
            <span>{`${dataRoom.creator}`}</span>
            <p>accumulated level 3:</p>
            <span>{`${acum3 > 0 ? acum3.toFixed(7) : 0}  (${formatNumber(acum3 / usdBtc)} USD)`}</span>
            <p>accumulated level 4:</p>
            <span>{`${acum4 > 0 ? acum4.toFixed(7) : 0}  (${formatNumber(acum4 / usdBtc)} USD)`}</span>
            <p>Total accumulated:</p>
            <span>{`${tAcum > 0 ? tAcum.toFixed(7) : 0}  (${formatNumber(tAcum / usdBtc)} USD)`}</span>                   
            <p>accumulated paid:</p>
            <span>{`${inBalance > 0 ? inBalance.toFixed(7) : 0}  (${formatNumber(inBalance / usdBtc)} USD)`}</span>
            <button disabled={tAcum > inBalance ? false : true} onClick={handleToBalance}>
                <div className={!loadingToBalance ? '' : 'dNone'}>
                    <p>Withdraw to wallet</p>
                    <label>{tAcum > inBalance ? (tAcum - inBalance).toFixed(7) : 0} BTC ➜ <MdAccountBalanceWallet /></label>
                </div>
                <div className={loadingToBalance ? "spinner-toBalance spinner-border text-danger" : 'dNone'} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </button>
        </div>
    )
}

export default React.memo(RomDetails)

