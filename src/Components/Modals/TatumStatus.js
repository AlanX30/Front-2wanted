import React from 'react'
import Modal from './Modal'

export const TatumStatus = props => {

    return <Modal isOpen={props.isOpen} onClose={props.onClose}>
            
        <div>

            {
                props.myWallet ? <h1>Mi billetera tatum</h1> : <h1>Billetera Tatum de usuario {props.user}</h1>
            }

            <h6>Balance en cuenta</h6>
            <p>{props.balance.accountBalance}</p>

            <h6>Balance disponible</h6>
            <p>{props.balance.availableBalance}</p>
        </div>

    </Modal>
}