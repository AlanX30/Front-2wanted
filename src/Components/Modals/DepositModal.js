import React, { useState } from 'react'
import Modal from './Modal'
import QRCode from 'react-qr-code'
import '../Styles/DepositModal.css'
import { MdContentCopy } from "react-icons/md"
import { IoIosCheckmarkCircle } from "react-icons/io"
import { CopyToClipboard } from 'react-copy-to-clipboard'

export const DepositModal = props => {

    const [ copy, setCopy ] = useState(false)

    const userData  = props.userData

    const address = userData.addressWallet

    function onClose(){
        setCopy(false)
        props.onClose()
    }

    function onCopy(){
        setCopy(true)
        setTimeout(() => {
            setCopy(false)
        }, 5000)
    }

    return <Modal isOpen={props.isOpen} onClose={onClose}>

        {
            address ?

            <form className='depositForm'>
                <h2>Tu direccion Btc</h2>

                <div>

                    <div className='qr-container'>
                        <QRCode value={address} size={130} />
                    </div>

                    <p>{address}</p>
                    
                    <CopyToClipboard text={address} onCopy={onCopy}>
                        <button type='button' className='button-copy-deposit'>
                            {
                                copy ? 
                                <div>
                                    Copiado <IoIosCheckmarkCircle />     
                                </div> : 
                                <div>
                                    Copiar <MdContentCopy />
                                </div>
                            } 
                        </button>
                    </CopyToClipboard>

                    <p className='mb-4'>El primer deposito tiene un fee de 0.00002 btc.</p>

                </div>

                <button className='btn btn-dark btn-block withdraw-modal-cancelar' type='button' onClick={onClose}>Cerrar</button>

            </form> :

            <div>Loading...</div>

        }

    </Modal>
}