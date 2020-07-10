import React from 'react'
import Swal from 'sweetalert2'
import './Styles/JoinModal.css'
import { withRouter } from 'react-router-dom'
import Modal from './Modal'
import axios from 'axios'
import { useFormValues } from '../hooks/useFormValues'
import { useState } from 'react'

const JoinModal = (props) => {

    const [radio1, setRadio1] = useState(true)
    const [radio2, setRadio2] = useState(false)
    const [parentInput, setParentInput] = useState(true)

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

    if(props.data){
        joinData = {
            salaId: props.data._id,
            parentUser: `@${parentUser.value}`,
            random: random
        }
        price = props.data.price
    }
 
    async function handleSubmit( e ){

        e.preventDefault()
        await axios({
            data: joinData,
            method: 'post',
            url: 'https://example2wanted.herokuapp.com/api/newUserInSala',
            headers: {
                authorization: props.token
            }
        }).then(res => {
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
                <p>Valor: <span>${price}</span></p>

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
                    <button className='btn btn-dark btn-block invitation-button'>Confirmar</button>
                </form>
            </div>
        </Modal>
    )
}

export default withRouter(JoinModal)