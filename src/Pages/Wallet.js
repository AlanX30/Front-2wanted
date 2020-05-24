import React from 'react'
import './Styles/Wallet.css'
import axios from 'axios'
import Navbar from '../Components/Navbar'
import { useFormValues } from '../hooks/useFormValues'

export const Wallet = (props) => {

    const deposit = useFormValues()
    const withdraw = useFormValues()

    const token = window.sessionStorage.getItem('token')

    function handleDeposit(){
        axios({
            data: { deposit: deposit.value },
            method: 'put',
            url: 'http://localhost:3500/wallet/deposit',
            headers: {
                authorization: token
                }
        })
        .then(() => {
            props.history.push('/home')
        } )  
    }
    function handleWithdraw(){
        axios({
            data: { withdraw: withdraw.value },
            method: 'put',
            url: 'http://localhost:3500/wallet/withdraw',
            headers: {
                authorization: token
                }
        })
        .then(() => {
            props.history.push('/home')
        } )  
    }

    return(
        <>

        <Navbar />

        <div className="row">
            <div className="col deposit">

                <h1 className='deposit-title'>Deposit</h1>
                
                <div className='deposit-charge'>
                    <p>Deposite monto a recargar.</p>
                    <div className="deposit-bearer input-group mb-2">
                        <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
                        </div>
                        <input {...deposit} type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
                    </div>
                    <button onClick={handleDeposit} className='btn btn-dark'>Deposit</button>
                </div>

            </div>
            <div className="col withdraw">
                
                <h1 className='deposit-title'>Withdraw</h1>

                <div className='deposit-charge'>
                    <p>Deposite monto a retirar.</p>
                    <div className="deposit-bearer input-group mb-2">
                        <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
                        </div>
                        <input {...withdraw} type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
                    </div>
                    <button onClick={ handleWithdraw } className='btn btn-dark'>WithDraw</button>
                </div>

            </div>
        </div>
        </>
    )
}