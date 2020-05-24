import React from 'react'
import Db from '../Db/Db.json'
import {Posiciones} from '../Container/Posiciones'
import {Arbol} from './Arbol'

export const PagePersonas = (props) => {

    const idRoot = parseInt(props.match.params.id)
    const userList = Db.users

    const {myName ,tAcum5 ,tAcum4 ,tAcum3,totalAcum ,childsId1, childsId2, childsId3, childsName3, childsName1, childsName2, childsId4, childsName4, childsId5, childsName5} = Posiciones(idRoot, userList)
    
    return(
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="arbol-container col-md-7 ml-4 mr-4">
                    <Arbol childsId5={childsId5} childsName5={childsName5} childsId4={childsId4} childsName4={childsName4} idRoot={idRoot} user={myName} childsId1={childsId1} childsId2={childsId2} childsId3={childsId3} childsName1={childsName1} childsName2={childsName2} childsName3={childsName3} />
                </div>
                <div className="estado-sala col">
                    <h1 className='text-center'>Estado Actual</h1>
                    <p>Total Invertido</p>
                    <span>$10000</span>
                    <p>Ganado en Tercer Nivel:</p>
                    <span>${tAcum3}</span>
                    <p>Ganado en Cuarto Nivel:</p>
                    <span>${tAcum4}</span>
                    <p>Ganado en ultimo Nivel:</p>
                    <span>${tAcum5}</span>
                    <p>Total Ganado</p>
                    <span>${totalAcum}</span>
                </div>
            </div>
        </div>
        </>
    )
}

