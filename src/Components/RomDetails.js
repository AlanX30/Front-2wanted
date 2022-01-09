import React, { useState, useContext } from 'react'
import Decimal from 'decimal.js-light'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Context } from '../context'
import { IoIosCheckmarkCircle } from "react-icons/io"
import { MdAccountBalanceWallet, MdContentCopy } from "react-icons/md"
import { CopyToClipboard } from 'react-copy-to-clipboard'

const RomDetails = ({loading, usdBtc, count, url, salaId, arbolData, dataRoom, inBalance, parent}) => {

    const [ copy, setCopy ] = useState(false)
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
            data: {toBalance: 'true'},
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
    let tAcum = 0   
    let newCash = 0

    if(arbolData && dataRoom && loading === false) {

        for(let i = 6; i<=13; i++) {
            let divide = new Decimal(price).div(2).toNumber()   
            if(arbolData[i]){
                acum3 = new Decimal(acum3).add(divide).toNumber()
            }
        }
        for(let i = 14; i<=29; i++){
            let divide = new Decimal(price).div(4).toNumber()
            if(arbolData[i]){
                acum4 = new Decimal(acum4).add(divide).toNumber()
            }
        }
    
        tAcum = new Decimal(acum3).add(acum4).toNumber()
        newCash= new Decimal(tAcum).sub(inBalance).toNumber()

    }

    function onCopy(){
        setCopy(true)
        setTimeout(() => {
            setCopy(false)
        }, 5000)
    }

    if(loading){ return <div className='room-details'>Cargando...</div>}

    return(
        <div className='room-details'>
            <CopyToClipboard text={`https://2wanted.com?add=${dataRoom.name}`} onCopy={onCopy}>
                    <div className='copyLinkInvitation' type='button'>
                        {
                            copy ? 
                            <div>
                                Copiado <IoIosCheckmarkCircle />     
                            </div> : 
                            <div>
                                Copiar link de sala <MdContentCopy />
                            </div>
                        } 
                    </div>
            </CopyToClipboard>
            <p>Nombre de sala:</p>
            <span>{dataRoom.name}</span>
            <p>Precio:</p>
            <span>{`${dataRoom.price.toString().slice(0,9)} BTC  (${formatNumber(dataRoom.price / usdBtc)} USD)`}</span>
            <p>Usuario padre:</p>
            <span>{parent}</span>
            <p>Creador:</p>
            <span>{`${dataRoom.creator}`}</span>
            <p>Acomulado en nivel 3:</p>
            <span>{`${acum3 > 0 ? acum3.toString().slice(0,9) : 0} BTC  (${formatNumber(acum3 / usdBtc)} USD)`}</span>
            <p>Acomulado en nivel 4:</p>
            <span>{`${acum4 > 0 ? acum4.toString().slice(0,9) : 0} BTC  (${formatNumber(acum4 / usdBtc)} USD)`}</span>
            <p>Total acomulado:</p>
            <span>{`${tAcum > 0 ? tAcum.toString().slice(0,9) : 0} BTC  (${formatNumber(tAcum / usdBtc)} USD)`}</span>                   
            <p>Acomulado pago:</p>
            <span>{`${inBalance > 0 ? inBalance.toString().slice(0,9) : 0} BTC  (${formatNumber(inBalance / usdBtc)} USD)`}</span>
            <button disabled={tAcum > inBalance ? false : true} onClick={handleToBalance}>
                <div className={!loadingToBalance ? '' : 'dNone'}>
                    <p>Retirar a billetera</p>
                    <label>{tAcum > inBalance ? newCash.toString().slice(0,9) : 0} BTC ➜ <MdAccountBalanceWallet /></label>
                </div>
                <div className={loadingToBalance ? "spinner-toBalance spinner-border text-danger" : 'dNone'} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </button>
        </div>
    )
}

export default React.memo(RomDetails)

