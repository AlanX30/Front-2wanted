import React, { useState, useEffect, useContext } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import ArbolImg from '../Images/arbol.svg'
import { Context } from '../context'
import { AiOutlineCaretRight, AiOutlineCaretLeft } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const ListRooms = ({ url }) => {

    const [listRooms, setListRooms] = useState([])
    const [activesData, setActivesData] = useState({})
    const [activesLoading, setActivesLoading] = useState(false)
    let [countActives, setCountActives] = useState(1) 
    const { csrfToken } = useContext(Context)

    useEffect(() => { 
        if(csrfToken){
            setActivesLoading(true)
            axios({
                method: 'post',
                data: {page: countActives},
                url: url+'/api/search/listSalas',
                headers: { 
                    'X-CSRF-Token': csrfToken
                }
            })
            .then(res => {
                setActivesLoading(false)
                if(res.data.error) {
                    return Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: res.data.error,
                    })
                }else{
                    setActivesLoading(false)
                    setListRooms(res.data.data)
                    const data = {total: res.data.total} 
                    setActivesData(data)
                }
            }).catch( err => {
                setActivesLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err,
                })
            })
        }    
    }, [countActives, url, csrfToken])

    return(
        <div className='actives-rooms'>
            <h3>Tus salas</h3>
            <div className={activesData.total === 1 ? 'dNone' : 'pagination'}>
                <button disabled={countActives === 1 ? true : false} className='pagination-button' onClick={()=> setCountActives(countActives -= 1) } ><AiOutlineCaretLeft size='30'/></button> 
                    <p><span>{countActives}</span> - {activesData.total}</p> 
                <button disabled={countActives === activesData.total ? true : false} className='pagination-button' onClick={()=> setCountActives(countActives += 1) }><AiOutlineCaretRight size='30' /></button>
            </div>
            {
                activesLoading ? <div className=' text-center'>
                    <div className="spinner-border spiner-actives text-danger" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div> : 
                <div>
                    {
                        listRooms.length === 0 ? <p className='no-salas-actives'>No hay salas activas!</p>  :
                        <div> 
                            <ul>
                                {
                                    listRooms.map((data) => {
                                        return (
                                            <li className='actives-li' key={data.salaId}>
                                                <Link to={`/sala/${data.salaId}`} className='actives-links Link'>
                                                    <img src={ArbolImg} alt="ArbolImg"/>
                                                    <div className='actives-description'>
                                                        <p>Nombre de sala: <span>{data.salaName}</span></p>
                                                        <p>Precio: <span>{data.salaPrice.toString().slice(0,9)} BTC</span></p>
                                                        <p>Creador: <span>{data.salaCreator}</span></p>
                                                    </div>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>        
                        </div>
                    }
                </div> 
            }    
        </div>
    )
}

export default ListRooms