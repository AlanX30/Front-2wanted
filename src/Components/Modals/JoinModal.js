import React ,{ useState } from 'react'
import '../Styles/JoinModal.css'
import { withRouter } from 'react-router-dom'
import Modal from './Modal'
import { useFormValues } from '../../hooks/useFormValues'
import { url } from '../../urlServer'
import PasswordVerificationNewRoom from './PasswordVerificationNewRoom'

const JoinModal = props => {

    const [modalOpen, setModalOpen] = useState(null)
    const [radio1, setRadio1] = useState(false)
    const [radio2, setRadio2] = useState(true)
    const [parentInput, setParentInput] = useState(false)

    function onCloseModal(){
        setModalOpen(null)
    }

    function handleRadio1(){
        setRadio1(true)
        setRadio2(false)
        setParentInput(true)
    }
    function handleRadio2(){
        setRadio1(false)
        setRadio2(true)
        setParentInput(false)
    }

    const parentUser = useFormValues()

    let joinData
    let price = 0
    let random = radio2 ? true : false
    let salaName = ''

    if(props.data){
        joinData = {
            salaId: props.data._id,
            parentUser: `@${parentUser.value}`,
            random: random
        }
        price = props.data.price
        salaName = props.data.name
    }
 
    async function handleSubmit(e){
        e.preventDefault()
        setModalOpen(true)
    }

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <div className='join-modal'>
                <h2>Estas seguro?</h2>
                <p>Nombre de sala: <span>{salaName}</span></p>
                <p>Precio: <span>{price.toString().slice(0,9)} BTC</span></p>

                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <input type="radio" checked={radio2} onChange={handleRadio2} />
                            <label onClick={handleRadio2}>Usuario padre Aleatorio</label>
                        </div>
                        <div>
                            <input type="radio" checked={radio1} onChange={handleRadio1} />
                            <label onClick={handleRadio1}>Elegir usuario padre</label>
                        </div>
                    </div>
                    <div className={parentInput ? 'form-group' : 'dNone'}>
                        <p>Ingrese el usuario padre</p>
                        <div className='d-flex'>
                            <div className="pre-formS">
                                <div className="input-group-text invite-pre-form">@</div>
                            </div>
                            <input className='join-input' {...parentUser} placeholder='Usuario' type="text"/>
                        </div>
                    </div>
                    <div className={!parentInput ? 'join-nota' : 'dNone'}>
                        <p>
                            <span>Nota:</span> "Seras añadido como referido de un usuario aleatorio con espacio disponible en esta sala."
                        </p>
                    </div>
                    <button className='btn btn-dark btn-block invitation-button'>
                        <p>Confirmar</p>
                    </button>
                </form>
            </div>

            <PasswordVerificationNewRoom isOpen={modalOpen} onClose={onCloseModal} onClose2={props.onClose} data={joinData} history={props.history} url={url+'/api/newUserInSala'}/>

        </Modal>
    )
}

export default withRouter(JoinModal)