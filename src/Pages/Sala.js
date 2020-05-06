import React from 'react'
import './Styles/Sala.css'
import {Arbol} from '../Components/Arbol'

export const Sala = (props) => {

    const user = props.match.params.userName

    return(
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="arbol-container col-md-7 ml-4">
                    <Arbol user=  {user} />
                </div>
                <div className="col">
                    <h1 className='text-center'>Estado Actual</h1>
                    <h5>Numero de hijos en primera linea: <span>8</span></h5>
                </div>
            </div>
        </div>
        </>
    )
}