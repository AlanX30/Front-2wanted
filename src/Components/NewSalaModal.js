import React from "react"
import Modal from "./Modal"
import axios from "axios"
import { useFormValues } from "../hooks/useFormValues"

function NewSalaModal(props){
 
    const name = useFormValues()
    const password = useFormValues()

    const newSalaData = {
        users: [
            {
                user: props.userData._id,
                parentId: undefined,
                childsId: {
                    childId1: undefined,
                    childId2: undefined
                }
            }
        ],
        name: name.value,
        password: password.value,
        price: props.price,
        creator: props.userData.userName
    }

    async function newSala( e ){
        e.preventDefault()
        if(props.userData.wallet >= parseFloat(props.price.value)){
            if(props.oneString(name.value)){
                await axios({
                    data: newSalaData,
                    method: 'post',
                    url: 'http://localhost:3500/new/sala',
                    headers: {
                        authorization: props.token
                        }
                })
                props.onClose() 
            }
        }
    }

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <h1 className='font-weight-light'>Create ${props.price} Room</h1>

            <form className='w-100 ' onSubmit={newSala} >
                <div className="w-100 form-group mr-2 mb-2 mt-2">
                    <label className='mb-0'>Room Name:</label>
                    <input className=" form-control" type='text' {...name} />
                </div>
                <div className="w-100 form-group mr-2 mb-2 mt-2">
                    <label className='mb-0'>Password:</label>
                    <input className=" form-control" placeholder='Optional' type='password' {...password} />
                </div>
                <button className='mt-2 btn btn-dark'>Create</button>
            </form>
            
        </Modal>
    )
}

export default NewSalaModal 