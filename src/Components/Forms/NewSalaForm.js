import React, { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import '../../Pages/Styles/Home.css'
import { MdHome, MdInfo } from "react-icons/md"
import { useFormValues } from '../../hooks/useFormValues'

const NewSalaForm = props => {

    const [roomValid, setRoomValid] = useState(true)
    const [priceValid, setPriceValid] = useState(true)
    const [createLoading, setCreateLoading] = useState(false)

    const reg_whiteSpace = /^$|\s+/

    const name = useFormValues()
    const price = useFormValues()
    
    const newSalaData = {
        name: name.value,
        price: price.value,
    }

    async function newSala( e ){
        e.preventDefault()

        if( reg_whiteSpace.test(name.value) || name.value.length < 4 || name.value.length > 15){
            return setRoomValid(false)
        }else { setRoomValid(true)}
        if(parseFloat(price.value) < 0.00005 || price.value === '' ){
            return setPriceValid(false)
        }else{ setPriceValid(true) }

        setCreateLoading(true)

        await axios({
            data: newSalaData,
            method: 'post',
            url: props.url+'/api/new/sala',
            headers: {
                authorization: props.token
            }
        }).then(res => {
            setCreateLoading(false)
            if (res.data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.error,
                })
            }else{ props.props.history.push(`/sala/${res.data.id}`)}
        }).catch(err => {
            setCreateLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err,
            })
        })
    }

    return(
        <div className="create-custom">
            <div className='create-form-container'>
                <h3>Create Room</h3>    
                <form onSubmit={newSala} >
                    <div className={roomValid ? 'mb-3' : 'mb-2'}>
                        <div className='d-flex'>
                            <div>
                                <div className="input-group-text input-guide">< MdHome /></div>
                            </div>
                            <input type='text' {...name} placeholder='Room Name' />
                        </div>
                        <label className={!roomValid ? 'new-room-valid' : 'dNone'}><MdInfo />Minimum 4 characters, maximum 15, must not contain spaces</label>
                    </div>
                    <div className={priceValid ? 'mb-3' : 'mb-2'}>
                        <div className='d-flex'>
                            <div>
                                <div className="input-group-text input-guide">$</div>
                            </div>
                            <input  placeholder='Price' type='text' {...price} />
                        </div>
                        <label className={!priceValid ? 'new-room-valid' : 'dNone'}><MdInfo />Minimum room value $5.000 COP</label>
                    </div>
                    <button disabled={createLoading ? true : false}>
                        <div className={createLoading ? "spinner-border loading-login text-danger" : 'dNone'} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <p className={createLoading ? 'dNone' : ''}>Create!</p>
                    </button>
                </form>   
            </div>       
        </div>
    )
}

export default NewSalaForm
