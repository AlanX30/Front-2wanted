import React from 'react'
import {Link} from 'react-router-dom'
import './Styles/Arbol.css'
import circuloLleno from '../Images/circuloLleno.svg'
import circulo from '../Images/circulo.svg'

export const Arbol = ({idRoot, user, childsId1, childsId2, childsId3, childsName3, childsName1, childsName2, childsId4, childsName4}) => {

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
    const circulo4 = []

    for (let i = 0; i<childsName4.length; i++) {
        if (childsName4[i] === 'Posicion Vacia'){
            circulo4.push(circulo)
        } else { circulo4.push(circuloLleno) }
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
            <div className='leaves'>
                <Link className='link' to={`/persona/${childsId3[0]}`}><img src={circulo3[0]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId3[1]}`}><img src={circulo3[1]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId3[2]}`} ><img src={circulo3[2]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId3[3]}`} ><img src={circulo3[3]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId3[4]}`} ><img src={circulo3[4]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId3[5]}`} ><img src={circulo3[5]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId3[6]}`} ><img src={circulo3[6]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId3[7]}`} ><img src={circulo3[7]} alt="circle"/> </Link>
            </div>
            <div className='leaves'>
                <Link className='link' to={`/persona/${childsId4[0]}`}><img src={circulo4[0]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId4[1]}`}><img src={circulo4[1]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId4[2]}`} ><img src={circulo4[2]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId4[3]}`} ><img src={circulo4[3]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId4[4]}`} ><img src={circulo4[4]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId4[5]}`} ><img src={circulo4[5]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId4[6]}`} ><img src={circulo4[6]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId4[7]}`} ><img src={circulo4[7]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId4[8]}`}><img src={circulo4[8]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId4[9]}`}><img src={circulo4[9]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId4[10]}`} ><img src={circulo4[10]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId4[11]}`} ><img src={circulo4[11]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId4[12]}`} ><img src={circulo4[12]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId4[13]}`} ><img src={circulo4[13]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId4[14]}`} ><img src={circulo4[14]} alt="circle"/> </Link>
                <Link className='link' to={`/persona/${childsId4[15]}`} ><img src={circulo4[15]} alt="circle"/> </Link>
            </div>
        </div>
        </>
    )
}