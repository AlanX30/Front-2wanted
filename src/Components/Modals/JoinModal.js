import React ,{ useState } from 'react'
import Swal from 'sweetalert2'
import '../Styles/JoinModal.css'
import { withRouter } from 'react-router-dom'
import Modal from './Modal'
import axios from 'axios'
import { useFormValues } from '../../hooks/useFormValues'
import { url } from '../../urlServer'

const JoinModal = (props) => {

    const [joinLoading, setJoinLoading] = useState(false)
    const [radio1, setRadio1] = useState(true)
    const [radio2, setRadio2] = useState(false)
    const [parentInput, setParentInput] = useState(true)

    function formatNumber(number){
        return new Intl.NumberFormat("de-DE").format(number)
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

    /* ----------------------------------------------------API---------------------------------------------------- */

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
 
    async function handleSubmit( e ){
        e.preventDefault()

        setJoinLoading(true)

        await axios({
            data: joinData,
            method: 'post',
            url: url+'/api/newUserInSala',
            headers: {
                authorization: props.token
            }
        }).then(res => {
            setJoinLoading(false)
            if(res.data.error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.error,
                })
            }else{
                props.history.push(`/sala/${res.data.id}`)
                props.onClose()
            }
        }).catch(err => {
            setJoinLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err,
            })
        })
    }

     /* ----------------------------------------------------API---------------------------------------------------- */

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <div className='join-modal'>
                <h2>Estas Seguro?</h2>
                <p>Nombre de sala: <span>{salaName}</span></p>
                <p>Valor: <span>${formatNumber(price)}</span></p>

                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <input type="radio" checked={radio1} onChange={handleRadio1} />
                            <label onClick={handleRadio1}>Elegir usuario padre</label>
                        </div>
                        <div>
                            <input type="radio" checked={radio2} onChange={handleRadio2} />
                            <label onClick={handleRadio2}>Usuario padre aleatorio</label>
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
                            <span>Nota:</span> "Sera agregado como referido de algun usuario aleatorio con espacio disponible en esta sala."
                        </p>
                    </div>
                    <button disabled={joinLoading ? true : false} className='btn btn-dark btn-block invitation-button'>
                        <div className={joinLoading ? "spinner-conf spinner-border text-danger" : 'dNone'} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <p  className={joinLoading ? 'dNone' : ''}>Confirmar</p>
                    </button>
                </form>
            </div>
        </Modal>
    )
}

export default withRouter(JoinModal)