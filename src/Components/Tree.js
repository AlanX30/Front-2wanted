import React, { useState } from 'react'
import { ChildModal } from './childModal'
import { InviteModal } from './inviteModal'

export const Tree = (props) => {

    const arbolData = props.arbolData

    /* ---------------------------------------------------Modales------------------------- */
    
    const [modalOpen, setModalOpen] = useState(null)
    const [modal2Open, setModal2Open] = useState(null)
    const [userModal, setUserModal] = useState(null)
    const [dataModal, setDataModal] = useState(null)
    
    function onCloseModal(){
        setModalOpen(null)
    }
    function onOpenModal(user){
        setModalOpen(true)
        setUserModal(user)
    }
    function onClose2Modal(){
        setModal2Open(null)
    }
    
    function onOpen2Modal(parent){
        const data = {
            parentUsername: parent, salaId: props.salaId, price: props.price, salaName: props.salaName
        }
        setModal2Open(true)
        setDataModal(data)
    }
    
    /* ---------------------------------------------------Modales------------------------- */
  
    if(props.loading){
        return <h1>Loading</h1>
    }
    
    return(
        <>
            <div className='arbol-container'>
                <div className='nivel'>
                    <div className='child'></div>
                </div>
                <div className='nivel'>
                    <button onClick={arbolData[0] ? ()=> onOpenModal(arbolData[0]) : ()=> onOpen2Modal(props.userName)} className={arbolData[0] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[1] ? ()=> onOpenModal(arbolData[1]) : ()=> onOpen2Modal(props.userName)} className={arbolData[1] ? 'child' : 'noChild'}>+</button>
                </div>
                <div className='nivel'>
                    <button onClick={arbolData[2] ? ()=> onOpenModal(arbolData[2]) : ()=> onOpen2Modal(arbolData[0])} className={arbolData[2] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[3] ? ()=> onOpenModal(arbolData[3]) : ()=> onOpen2Modal(arbolData[0])} className={arbolData[3] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[4] ? ()=> onOpenModal(arbolData[4]) : ()=> onOpen2Modal(arbolData[1])} className={arbolData[4] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[5] ? ()=> onOpenModal(arbolData[5]) : ()=> onOpen2Modal(arbolData[1])} className={arbolData[5] ? 'child' : 'noChild'}>+</button>
                </div>
                <div className='nivel'>
                    <button onClick={arbolData[6] ? ()=> onOpenModal(arbolData[6]) : ()=> onOpen2Modal(arbolData[2])} className={arbolData[6] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[7] ? ()=> onOpenModal(arbolData[7]) : ()=> onOpen2Modal(arbolData[2])} className={arbolData[7] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[8] ? ()=> onOpenModal(arbolData[8]) : ()=> onOpen2Modal(arbolData[3])} className={arbolData[8] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[9] ? ()=> onOpenModal(arbolData[9]) : ()=> onOpen2Modal(arbolData[3])} className={arbolData[9] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[10] ? ()=> onOpenModal(arbolData[10]) : ()=> onOpen2Modal(arbolData[4])} className={arbolData[10] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[11] ? ()=> onOpenModal(arbolData[11]) : ()=> onOpen2Modal(arbolData[4])} className={arbolData[11] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[12] ? ()=> onOpenModal(arbolData[12]) : ()=> onOpen2Modal(arbolData[5])} className={arbolData[12] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[13] ? ()=> onOpenModal(arbolData[13]) : ()=> onOpen2Modal(arbolData[5])} className={arbolData[13] ? 'child' : 'noChild'}>+</button>
                </div>
                <div className='nivel'>
                    <button onClick={arbolData[14] ? ()=> onOpenModal(arbolData[14]) : ()=> onOpen2Modal(arbolData[6])} className={arbolData[14] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[15] ? ()=> onOpenModal(arbolData[15]) : ()=> onOpen2Modal(arbolData[6])} className={arbolData[15] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[16] ? ()=> onOpenModal(arbolData[16]) : ()=> onOpen2Modal(arbolData[7])} className={arbolData[16] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[17] ? ()=> onOpenModal(arbolData[17]) : ()=> onOpen2Modal(arbolData[7])} className={arbolData[17] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[18] ? ()=> onOpenModal(arbolData[18]) : ()=> onOpen2Modal(arbolData[8])} className={arbolData[18] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[19] ? ()=> onOpenModal(arbolData[19]) : ()=> onOpen2Modal(arbolData[8])} className={arbolData[19] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[20] ? ()=> onOpenModal(arbolData[20]) : ()=> onOpen2Modal(arbolData[9])} className={arbolData[20] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[21] ? ()=> onOpenModal(arbolData[21]) : ()=> onOpen2Modal(arbolData[9])} className={arbolData[21] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[22] ? ()=> onOpenModal(arbolData[22]) : ()=> onOpen2Modal(arbolData[10])} className={arbolData[22] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[23] ? ()=> onOpenModal(arbolData[23]) : ()=> onOpen2Modal(arbolData[10])} className={arbolData[23] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[24] ? ()=> onOpenModal(arbolData[24]) : ()=> onOpen2Modal(arbolData[11])} className={arbolData[24] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[25] ? ()=> onOpenModal(arbolData[25]) : ()=> onOpen2Modal(arbolData[11])} className={arbolData[25] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[26] ? ()=> onOpenModal(arbolData[26]) : ()=> onOpen2Modal(arbolData[12])} className={arbolData[26] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[27] ? ()=> onOpenModal(arbolData[27]) : ()=> onOpen2Modal(arbolData[12])} className={arbolData[27] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[28] ? ()=> onOpenModal(arbolData[28]) : ()=> onOpen2Modal(arbolData[13])} className={arbolData[28] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[29] ? ()=> onOpenModal(arbolData[29]) : ()=> onOpen2Modal(arbolData[13])} className={arbolData[29] ? 'child' : 'noChild'}>+</button>
                </div>
                <div className='nivel'>
                    <button onClick={arbolData[30] ? ()=> onOpenModal(arbolData[30]) : ()=> onOpen2Modal(arbolData[14])} className={arbolData[30] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[31] ? ()=> onOpenModal(arbolData[31]) : ()=> onOpen2Modal(arbolData[14])} className={arbolData[31] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[32] ? ()=> onOpenModal(arbolData[32]) : ()=> onOpen2Modal(arbolData[15])} className={arbolData[32] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[33] ? ()=> onOpenModal(arbolData[33]) : ()=> onOpen2Modal(arbolData[15])} className={arbolData[33] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[34] ? ()=> onOpenModal(arbolData[34]) : ()=> onOpen2Modal(arbolData[16])} className={arbolData[34] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[35] ? ()=> onOpenModal(arbolData[35]) : ()=> onOpen2Modal(arbolData[16])} className={arbolData[35] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[36] ? ()=> onOpenModal(arbolData[36]) : ()=> onOpen2Modal(arbolData[17])} className={arbolData[36] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[37] ? ()=> onOpenModal(arbolData[37]) : ()=> onOpen2Modal(arbolData[17])} className={arbolData[37] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[38] ? ()=> onOpenModal(arbolData[38]) : ()=> onOpen2Modal(arbolData[18])} className={arbolData[38] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[39] ? ()=> onOpenModal(arbolData[39]) : ()=> onOpen2Modal(arbolData[18])} className={arbolData[39] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[40] ? ()=> onOpenModal(arbolData[40]) : ()=> onOpen2Modal(arbolData[19])} className={arbolData[40] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[41] ? ()=> onOpenModal(arbolData[41]) : ()=> onOpen2Modal(arbolData[19])} className={arbolData[41] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[42] ? ()=> onOpenModal(arbolData[42]) : ()=> onOpen2Modal(arbolData[20])} className={arbolData[42] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[43] ? ()=> onOpenModal(arbolData[43]) : ()=> onOpen2Modal(arbolData[20])} className={arbolData[43] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[44] ? ()=> onOpenModal(arbolData[44]) : ()=> onOpen2Modal(arbolData[21])} className={arbolData[44] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[45] ? ()=> onOpenModal(arbolData[45]) : ()=> onOpen2Modal(arbolData[21])} className={arbolData[45] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[46] ? ()=> onOpenModal(arbolData[46]) : ()=> onOpen2Modal(arbolData[22])} className={arbolData[46] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[47] ? ()=> onOpenModal(arbolData[47]) : ()=> onOpen2Modal(arbolData[22])} className={arbolData[47] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[48] ? ()=> onOpenModal(arbolData[48]) : ()=> onOpen2Modal(arbolData[23])} className={arbolData[48] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[49] ? ()=> onOpenModal(arbolData[49]) : ()=> onOpen2Modal(arbolData[23])} className={arbolData[49] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[50] ? ()=> onOpenModal(arbolData[50]) : ()=> onOpen2Modal(arbolData[24])} className={arbolData[50] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[51] ? ()=> onOpenModal(arbolData[51]) : ()=> onOpen2Modal(arbolData[24])} className={arbolData[51] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[52] ? ()=> onOpenModal(arbolData[52]) : ()=> onOpen2Modal(arbolData[25])} className={arbolData[52] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[53] ? ()=> onOpenModal(arbolData[53]) : ()=> onOpen2Modal(arbolData[25])} className={arbolData[53] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[54] ? ()=> onOpenModal(arbolData[54]) : ()=> onOpen2Modal(arbolData[26])} className={arbolData[54] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[55] ? ()=> onOpenModal(arbolData[55]) : ()=> onOpen2Modal(arbolData[26])} className={arbolData[55] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[56] ? ()=> onOpenModal(arbolData[56]) : ()=> onOpen2Modal(arbolData[27])} className={arbolData[56] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[57] ? ()=> onOpenModal(arbolData[57]) : ()=> onOpen2Modal(arbolData[27])} className={arbolData[57] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[58] ? ()=> onOpenModal(arbolData[58]) : ()=> onOpen2Modal(arbolData[28])} className={arbolData[58] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[59] ? ()=> onOpenModal(arbolData[59]) : ()=> onOpen2Modal(arbolData[28])} className={arbolData[59] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[60] ? ()=> onOpenModal(arbolData[60]) : ()=> onOpen2Modal(arbolData[29])} className={arbolData[60] ? 'child' : 'noChild'}>+</button>
                    <button onClick={arbolData[61] ? ()=> onOpenModal(arbolData[29]) : ()=> onOpen2Modal(arbolData[29])} className={arbolData[29] ? 'child' : 'noChild'}>+</button>
                </div>
            </div>
            <ChildModal user={userModal} isOpen={modalOpen} onClose={onCloseModal}/>
            <InviteModal token={props.token} data={dataModal} isOpen={modal2Open} onClose={onClose2Modal}/>
        </>
    )
    
}