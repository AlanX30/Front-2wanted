import React from 'react'
import './Styles/Sala.css'
import Db from '../Db/Db.json'
import {Arbol} from '../Components/Arbol'
import {Posiciones} from '../Container/Posiciones'

export const Sala = (props) => {

    const user = props.match.params.userName
    const userList = Db.users
    

    /* -----Una funcion que consiga el ID del usuario en esta sala por medio de una api que conecta a la base
    -------- De Datos para ponerlo en la raiz del arbol si ya esta agregado a esta sala. En este caso lo hare con un ciclo For ----- */

    let idRoot

    for(let i = 0; i<userList.length; i++){
       if (userList[i].name === user){
           idRoot = userList[i].id
       }
    }

    /* ----------------------------------------------------------------------------------------------------- */

    const {totalWin ,childsId1, childsId2, childsId3, childsName3, childsName1, childsName2, childsId4, childsName4} = Posiciones(idRoot, userList)

    return(
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="arbol-container col-md-7 ml-4 mr-4">
                    <Arbol childsId4={childsId4} childsName4={childsName4} idRoot={idRoot} user={user} childsId1={childsId1} childsId2={childsId2} childsId3={childsId3} childsName1={childsName1} childsName2={childsName2} childsName3={childsName3} />
                </div>
                <div className="estado-sala col">
                    <h1 className='text-center'>Estado Actual</h1>
                    <p>Total Invertido</p>
                    <span>$10000</span>
                    <p>Total Ganado</p>
                        <span>${totalWin}</span>
                    <p>Numero de hijos en primera linea:</p>
                    <span>{childsId1.length}</span>
                </div>
            </div>
        </div>
        </>
    )
}