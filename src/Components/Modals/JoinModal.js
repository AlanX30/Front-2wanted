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
            url: url+'/api/newUserInSala'
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
                <h2>Are you sure?</h2>
                <p>Room name: <span>{salaName}</span></p>
                <p>Price: <span>${price}</span></p>

                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <input type="radio" checked={radio1} onChange={handleRadio1} />
                            <label onClick={handleRadio1}>Choose parent user</label>
                        </div>
                        <div>
                            <input type="radio" checked={radio2} onChange={handleRadio2} />
                            <label onClick={handleRadio2}>Random parent user</label>
                        </div>
                    </div>
                    <div className={parentInput ? 'form-group' : 'dNone'}>
                        <p>Put the parent user</p>
                        <div className='d-flex'>
                            <div className="pre-formS">
                                <div className="input-group-text invite-pre-form">@</div>
                            </div>
                            <input className='join-input' {...parentUser} placeholder='User' type="text"/>
                        </div>
                    </div>
                    <div className={!parentInput ? 'join-nota' : 'dNone'}>
                        <p>
                            <span>Nota:</span> "You will be added as a referral from some random user with available space in this room."
                        </p>
                    </div>
                    <button disabled={joinLoading ? true : false} className='btn btn-dark btn-block invitation-button'>
                        <div className={joinLoading ? "spinner-conf spinner-border text-danger" : 'dNone'} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <p  className={joinLoading ? 'dNone' : ''}>Confirm</p>
                    </button>
                </form>
            </div>
        </Modal>
    )
}

export default withRouter(JoinModal)