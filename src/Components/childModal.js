import React from 'react'
import MiniModal from './MiniModal'

export const ChildModal = (props) =>{
    return (
        <MiniModal isOpen={props.isOpen} onClose={props.onClose}>
            <h3>User:</h3>
            <br/>
            <h5>{props.user}</h5>
        </MiniModal>
    )
}
