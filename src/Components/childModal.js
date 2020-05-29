import React from 'react'
import MiniModal from './MiniModal'

export const ChildModal = (props) =>{
    return (
        <MiniModal isOpen={props.isOpen} onClose={props.onClose}>
            <h3>User:</h3>
            <h5>{props.user}</h5>
        </MiniModal>
    )
}
