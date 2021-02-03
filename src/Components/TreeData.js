import React, { useState } from 'react'
import abajo from '../Images/abajo.svg'
import './Styles/Tree.css'

const TreeData = ({price, username, arbolData, onOpenModal, onOpen2Modal}) => {

    const [lineDropDown, setLineDropdown] = useState(false)

    return(
        <div className='tree-wrap'>
            <div className='nivel'>
                <div className='child'></div>
            </div>
            <p className='level-text'>Level 1</p>
            <div className='nivel'>
                <button onClick={arbolData[0] ? ()=> onOpenModal(arbolData[0]) : ()=> onOpen2Modal(username)} className={arbolData[0] ? 'child' : 'noChild'}>+</button>
                <button onClick={arbolData[1] ? ()=> onOpenModal(arbolData[1]) : ()=> onOpen2Modal(username)} className={arbolData[1] ? 'child' : 'noChild'}>+</button>
            </div>
            <p className='level-text'>Level 2</p>
            <div className='nivel'>
                <button onClick={arbolData[2] ? ()=> onOpenModal(arbolData[2]) : ()=> onOpen2Modal(arbolData[0])} className={arbolData[2] ? 'child' : 'noChild'}>+</button>
                <button onClick={arbolData[3] ? ()=> onOpenModal(arbolData[3]) : ()=> onOpen2Modal(arbolData[0])} className={arbolData[3] ? 'child' : 'noChild'}>+</button>
                <button onClick={arbolData[4] ? ()=> onOpenModal(arbolData[4]) : ()=> onOpen2Modal(arbolData[1])} className={arbolData[4] ? 'child' : 'noChild'}>+</button>
                <button onClick={arbolData[5] ? ()=> onOpenModal(arbolData[5]) : ()=> onOpen2Modal(arbolData[1])} className={arbolData[5] ? 'child' : 'noChild'}>+</button>
            </div>
            <p className='level-text'>Level 3 &nbsp; <span>{price / 2} BTC c/u</span></p>
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
            <p className='level-text'>Level 4 &nbsp; <span>{price / 4} BTC c/u</span></p>
            <div className='nivel displayNone1'>
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
            <button className='btn-lineDropDown' onClick={()=> setLineDropdown(!lineDropDown)}> <img src={abajo} alt="abajo"/> </button>
            <div className={lineDropDown ? 'nivel2' : 'vNone'}>
                <div className='lineDropDown-separator'>
                    <div className="linePar-container">
                        <p>1</p>
                        <div className="linePar">
                            <button onClick={arbolData[14] ? ()=> onOpenModal(arbolData[14]) : ()=> onOpen2Modal(arbolData[6])} className={arbolData[14] ? 'child' : 'noChild'}>+</button>
                            <button onClick={arbolData[15] ? ()=> onOpenModal(arbolData[15]) : ()=> onOpen2Modal(arbolData[6])} className={arbolData[15] ? 'child' : 'noChild'}>+</button>
                        </div>
                    </div>
                    <div className="linePar-container">
                        <p>2</p>
                        <div className="linePar">
                            <button onClick={arbolData[16] ? ()=> onOpenModal(arbolData[16]) : ()=> onOpen2Modal(arbolData[7])} className={arbolData[16] ? 'child' : 'noChild'}>+</button>
                            <button onClick={arbolData[17] ? ()=> onOpenModal(arbolData[17]) : ()=> onOpen2Modal(arbolData[7])} className={arbolData[17] ? 'child' : 'noChild'}>+</button>
                        </div>
                    </div>
                    <div className="linePar-container">
                        <p>3</p>
                        <div className="linePar">
                            <button onClick={arbolData[18] ? ()=> onOpenModal(arbolData[18]) : ()=> onOpen2Modal(arbolData[8])} className={arbolData[18] ? 'child' : 'noChild'}>+</button>
                            <button onClick={arbolData[19] ? ()=> onOpenModal(arbolData[19]) : ()=> onOpen2Modal(arbolData[8])} className={arbolData[19] ? 'child' : 'noChild'}>+</button>
                        </div>
                    </div>
                    <div className="linePar-container">
                        <p>4</p>
                        <div className="linePar">
                            <button onClick={arbolData[20] ? ()=> onOpenModal(arbolData[20]) : ()=> onOpen2Modal(arbolData[9])} className={arbolData[20] ? 'child' : 'noChild'}>+</button>
                            <button onClick={arbolData[21] ? ()=> onOpenModal(arbolData[21]) : ()=> onOpen2Modal(arbolData[9])} className={arbolData[21] ? 'child' : 'noChild'}>+</button>
                        </div>
                    </div>           
                </div>
                <div className='lineDropDown-separator'>
                    <div className="linePar-container">
                        <p>5</p>
                        <div className="linePar">
                            <button onClick={arbolData[22] ? ()=> onOpenModal(arbolData[22]) : ()=> onOpen2Modal(arbolData[10])} className={arbolData[22] ? 'child' : 'noChild'}>+</button>
                            <button onClick={arbolData[23] ? ()=> onOpenModal(arbolData[23]) : ()=> onOpen2Modal(arbolData[10])} className={arbolData[23] ? 'child' : 'noChild'}>+</button>
                        </div>
                    </div>
                    <div className="linePar-container">
                        <p>6</p>
                        <div className="linePar">
                            <button onClick={arbolData[24] ? ()=> onOpenModal(arbolData[24]) : ()=> onOpen2Modal(arbolData[11])} className={arbolData[24] ? 'child' : 'noChild'}>+</button>
                            <button onClick={arbolData[25] ? ()=> onOpenModal(arbolData[25]) : ()=> onOpen2Modal(arbolData[11])} className={arbolData[25] ? 'child' : 'noChild'}>+</button>
                        </div>
                    </div>
                    <div className="linePar-container">
                        <p>7</p>
                        <div className="linePar">
                            <button onClick={arbolData[26] ? ()=> onOpenModal(arbolData[26]) : ()=> onOpen2Modal(arbolData[12])} className={arbolData[26] ? 'child' : 'noChild'}>+</button>
                            <button onClick={arbolData[27] ? ()=> onOpenModal(arbolData[27]) : ()=> onOpen2Modal(arbolData[12])} className={arbolData[27] ? 'child' : 'noChild'}>+</button>
                        </div>
                    </div>
                    <div className="linePar-container">
                        <p>8</p>
                        <div className="linePar">
                            <button onClick={arbolData[28] ? ()=> onOpenModal(arbolData[28]) : ()=> onOpen2Modal(arbolData[13])} className={arbolData[28] ? 'child' : 'noChild'}>+</button>
                            <button onClick={arbolData[29] ? ()=> onOpenModal(arbolData[29]) : ()=> onOpen2Modal(arbolData[13])} className={arbolData[29] ? 'child' : 'noChild'}>+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(TreeData)
