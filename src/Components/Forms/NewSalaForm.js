import React, { useState, useContext } from 'react'
import { Context } from '../../context'
import PasswordVerificationNewRoom from '../Modals/PasswordVerificationNewRoom'
import '../../Pages/Styles/Home.css'
import { MdHome, MdInfo } from "react-icons/md"
import { useFormValues } from '../../hooks/useFormValues'
import { url } from '../../urlServer'

const NewSalaForm = props => {

    const [modalOpen, setModalOpen] = useState(null)

    const [roomValid, setRoomValid] = useState(true)
    const [priceValid, setPriceValid] = useState(true)
    
    const reg_whiteSpace = /^$|\s+/

    const { usdBtc } = useContext(Context)

    const name = useFormValues()
    const price = useFormValues()

    const inUsd = (price.value / usdBtc).toFixed(2)

    function onCloseModal(){
        setModalOpen(null)
    }
    
    const newSalaData = {
        name: name.value,
        price: price.value,
    }

    function newSala( e ){
        e.preventDefault()

        if( reg_whiteSpace.test(name.value) || name.value.length < 4 || name.value.length > 15){
            return setRoomValid(false)
        }else { setRoomValid(true)}
        if(parseFloat(price.value) < 0.00005 || price.value === '' ){
            return setPriceValid(false)
        }else{ setPriceValid(true) }

        setModalOpen(true)
        
    }

    return(
        <div className="create-custom">
            <div className='create-form-container'>
                <h3>Crear sala</h3>    
                <form onSubmit={newSala} >
                    <div className={roomValid ? 'mb-3' : 'mb-2'}>
                        <div className='d-flex'>
                            <div>
                                <div className="input-group-text input-guide">< MdHome /></div>
                            </div>
                            <input type='text' {...name} placeholder='Nombre de sala' />
                        </div>
                        <label className={!roomValid ? 'new-room-valid' : 'dNone'}><MdInfo />Minimo 4 caracteres, maximo 15, sin espacios.</label>
                    </div>
                    <div className={priceValid ? 'mb-3' : 'mb-2'}>
                        <div className='d-flex'>
                            <div>
                                <div className="input-group-text input-guide">$</div>
                            </div>
                            <input  placeholder='Precio en bitcoin' type='number' {...price} />
                        </div>
                        <p className={inUsd > 0 ? 'salaPriceInUsd' : 'dNone'}>={inUsd} USD</p>
                        <label className={!priceValid ? 'new-room-valid' : 'dNone'}><MdInfo />Valor minimo de 0.00005 BTC</label>
                    </div>
                    <button>
                        <p>Crear!</p>
                    </button>
                </form>   
            </div>       

            <PasswordVerificationNewRoom isOpen={modalOpen} onClose={onCloseModal} data={newSalaData} history={props.props.history} url={url+'/api/new/sala'}/>

        </div>
    )
}

export default NewSalaForm
