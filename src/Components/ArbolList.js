import React from 'react'
import ArbolImg from '../Images/arbol.svg'
import './Styles/ArbolList.css'
import {Link} from 'react-router-dom'

export const ArbolList = () => {
    return(
        <div className='arbol-list'>
            
            <h1 className='sala-descrption-title badge badge-dark'>Salas de   <span className="badge badge-secondary">$10.000</span></h1>

            <Link to='/sala/1/@AlanS' className="card arbol-card text-white bg-warning mb-3 links" >
                <img src={ArbolImg} className="card-header card-img-top" alt="..." />
                <div className="card-body">
                    <h4 className="card-text text-center">Sala de  $10.000</h4>
                </div>
            </Link>
            <Link to='/sala/1/@AlanS' className="card arbol-card text-white bg-warning mb-3 links" >
                <img src={ArbolImg} className="card-header card-img-top" alt="..." />
                <div className="card-body">
                    <h4 className="card-text text-center">Sala de  $10.000</h4>
                </div>
            </Link>
            <Link to='/sala/1/@AlanS' className="card arbol-card text-white bg-warning mb-3 links" >
                <img src={ArbolImg} className="card-header card-img-top" alt="..." />
                <div className="card-body">
                    <h4 className="card-text text-center">Sala de  $10.000</h4>
                </div>
            </Link>

            <h1 className='sala-descrption-title badge badge-dark'>Salas de   <span className="badge badge-secondary">$50.000</span></h1>



            <Link to='/sala/1/@AlanS' className="card arbol-card text-white bg-warning mb-3 links" >
                <img src={ArbolImg} className="card-header card-img-top" alt="..." />
                <div className="card-body">
                    <h4 className="card-text text-center">Sala de  $50.000</h4>
                </div>
            </Link>

            

            <Link to='/sala/1/@AlanS' className="card arbol-card text-white bg-warning mb-3 links" >
                <img src={ArbolImg} className="card-header card-img-top" alt="..." />
                <div className="card-body">
                    <h4 className="card-text text-center">Sala de  $50.000</h4>
                </div>
            </Link>
            <Link to='/sala/1/@AlanS' className="card arbol-card text-white bg-warning mb-3 links" >
                <img src={ArbolImg} className="card-header card-img-top" alt="..." />
                <div className="card-body">
                    <h4 className="card-text text-center">Sala de  $50.000</h4>
                </div>
            </Link>
        </div>
    )
}