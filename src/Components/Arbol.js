import React from 'react'
import {Link} from 'react-router-dom'
import './Styles/Arbol.css'
import circuloLleno from '../Images/circuloLleno.svg'
import circulo from '../Images/circulo.svg'
import Db from '../Db/Db.json'
import {Posiciones} from '../Container/Posiciones'

export const Arbol = (props) => {

    const userList = Db.users
    const user = props.user

    /* -----Una funcion que consiga el ID del usuario en esta sala por medio de una api que conecta a la base
    -------- De Datos para ponerlo en la raiz del arbol si ya esta agregado a esta sala. En este caso lo hare con un ciclo For ----- */

    let idRoot

    for(let i = 0; i<userList.length; i++){
       if (userList[i].name === user){
           idRoot = userList[i].id
       }
    }

    /* ----------------------------------------------------------------------------------------------------- */

    const {childsId1, childsId2, childsId3, childsName3, childsName1, childsName2} = Posiciones(idRoot, userList)

    /* ------------------------------Circulos Dinamicos------------------------------------------- */

    const circulo1 = []

    for (let i = 0; i<childsName1.length; i++) {
        if (childsName1[i] === 'Posicion Vacia'){
            circulo1.push(circulo)
        } else { circulo1.push(circuloLleno) }
    }
    const circulo2 = []

    for (let i = 0; i<childsName2.length; i++) {
        if (childsName2[i] === 'Posicion Vacia'){
            circulo2.push(circulo)
        } else { circulo2.push(circuloLleno) }
    }
    const circulo3 = []

    for (let i = 0; i<childsName3.length; i++) {
        if (childsName3[i] === 'Posicion Vacia'){
            circulo3.push(circulo)
        } else { circulo3.push(circuloLleno) }
    }

    /* ------------------------------/Circulos Dinamicos------------------------------------------- */

    return(
        <>
        <div className='arbol'>
            <div className='root'>
                <Link className='link links' to={`/persona/${idRoot}`} ><img src={circuloLleno} alt="circle"/></Link>
            </div>
            <div className='labelRoot-arbol'>
                <span className='badge badge-primary'>Yo = {user}</span>
            </div>
            <div className='leaves'>
                <Link className='link' to={`/persona/${childsId1[0]}`} ><img src={circulo1[0]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId1[1]}`}><img src={circulo1[1]} alt="circle"/> </Link>
            </div>
            <div className='leaves'>
                <Link className='link' to={`/persona/${childsId2[0]}`}><img src={circulo2[0]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId2[1]}`}><img src={circulo2[1]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId2[2]}`}><img src={circulo2[2]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId2[3]}`}><img src={circulo2[3]} alt="circle"/> </Link>
            </div>
            <div className='labels-arbol'>
            </div>
            <div className='leaves'>
                <Link className='link' to={`/persona/${childsId3[1]}`}><img src={circulo3[0]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId3[0]}`}><img src={circulo3[1]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId3[2]}`} ><img src={circulo3[2]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId3[3]}`} ><img src={circulo3[3]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId3[4]}`} ><img src={circulo3[4]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId3[5]}`} ><img src={circulo3[5]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId3[6]}`} ><img src={circulo3[6]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId3[7]}`} ><img src={circulo3[7]} alt="circle"/> </Link>
            </div>
        </div>
        </>
    )
}