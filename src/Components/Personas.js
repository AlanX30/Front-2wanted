import React from 'react'
import Db from '../Db/Db.json'
import {Posiciones} from '../Container/Posiciones'

export const PagePersonas = (props) => {

    const id = parseInt(props.match.params.id)
    const userList = Db.users
    const ingresado = 10000

    const {myName, acum1, childsName1, acum2, childsName2} = Posiciones(id, userList)
    
    return(
        <>
        <h2>{`Persona ${myName}`}</h2>
        <h2>{`Total Ingresado = ${ingresado} Pesos`}</h2>
        <h1>Primera Linea</h1>
        <h2>Acomulado primera linea {`${acum1}`} Pesos</h2>
        <h2>{`Hijos Primera Linea: ${childsName1[0]} y ${childsName1[1]}`}</h2>
        <h1>Segunda linea</h1>
        <h2>Acomulado segunda linea {`${acum2}`} Pesos</h2>
        <h2>{`Hijos segunda Linea: ${childsName2[0]}, ${childsName2[1]}, ${childsName2[2]}, ${childsName2[3]}`}</h2>
        </>
    )
}

