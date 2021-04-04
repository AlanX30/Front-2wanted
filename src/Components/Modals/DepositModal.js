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
    console.log(userData, address)
    return <Modal isOpen={props.isOpen} onClose={onClose}>

        {
            address ?

            <form className='depositForm'>
                <h2>Your Btc address</h2>

                <div>

                    <div className='qr-container'>
                        <QRCode value={address} size={130} />
                    </div>

                    <p>{address}</p>
                    
                    <CopyToClipboard text={address} onCopy={()=>setCopy(true)}>
                        <button type='button' className='button-copy-deposit'>
                            {
                                copy ? 
                                <div>
                                Copied <IoIosCheckmarkCircle />     
                                </div> : 
                                <div>
                                    Copy <MdContentCopy />
                                </div>
                            } 
                        </button>
                    </CopyToClipboard>

                </div>

                <button className='btn btn-dark btn-block withdraw-modal-cancelar' type='button' onClick={onClose}>Close</button>

            </form> :

            <div>Loading...</div>

        }

    </Modal>
}