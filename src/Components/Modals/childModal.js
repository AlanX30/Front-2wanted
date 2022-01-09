import React from 'react'
import MiniModal from './MiniModal'

export const ChildModal = (props) =>{

    let user = ''

    if(props.user){
        user = props.user.split(" ")[0]
    }

    return (
        <MiniModal isOpen={props.isOpen} onClose={props.onClose}>
            <h3>Usuario:</h3>
            <br/>
            <h4>{user}</h4>
        </MiniModal>
    )
}
