import React, { useState, useCallback } from 'react'
import TreeData from './TreeData'
import './Styles/Tree.css'
import { ChildModal } from './Modals/childModal'
import { InviteModal } from './Modals/inviteModal'

const Tree = (props) => {

    const arbolData =  props.arbolData
    
    /* ---------------------------------------------------Modales------------------------- */
    
    const [modalOpen, setModalOpen] = useState(null)
    const [modal2Open, setModal2Open] = useState(null)
    const [userModal, setUserModal] = useState(null)
    const [dataModal, setDataModal] = useState(null)
    
    function onCloseModal(){
        setModalOpen(null)
    }
    const onOpenModal = useCallback( user => {
        setModalOpen(true)
        setUserModal(user)
    },[])
    function onClose2Modal(){
        setModal2Open(null)
    }
    
    const onOpen2Modal = useCallback( parent => {
        const data = {
            parentUsername: parent, salaId: props.salaId, price: props.price, salaName: props.salaName
        }
        setModal2Open(true)
        setDataModal(data)
    },[props.price, props.salaId, props.salaName])
  
    if(props.loading){
        return <div className="spinner-border tree-spinner text-danger" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    }

    return(
        <>
            <TreeData price={props.price} username={props.userName} arbolData={arbolData} onOpen2Modal={onOpen2Modal} onOpenModal={onOpenModal} />
            
            <ChildModal user={userModal} isOpen={modalOpen} onClose={onCloseModal}/>
            <InviteModal data={dataModal} isOpen={modal2Open} onClose={onClose2Modal}/>
        </>
    )
}

export default Tree