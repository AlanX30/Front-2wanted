import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import ArbolImg from '../Images/arbol.svg'
import { useUserData } from '../hooks/useUserData'
import { AiOutlineCaretRight, AiOutlineCaretLeft } from 'react-icons/ai'
import {MdHome, MdList, MdInfo} from "react-icons/md"
import './Styles/HomeDescription.css'
import { useFormValues } from '../hooks/useFormValues'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { url } from '../urlServer'

export const HomeDescription = (props) => {

    const reg_whiteSpace = /^$|\s+/
    const token = window.sessionStorage.getItem('token')
    const  {userData}  = useUserData()
    const [actives_560, setActives_560] = useState(false)
    const [listRooms, setListRooms] = useState([])
    let [countActives, setCountActives] = useState(1) 
    const [activesData, setActivesData] = useState({})
    const [activesLoading, setActivesLoading] = useState(false)

    function formatNumber(number){
        return new Intl.NumberFormat("de-DE").format(number)
    }

        useEffect(() => { 
            if(token){
                setActivesLoading(true)
                axios({
                    method: 'post',
                    data: {page: countActives},
                    url: url+'/api/search/listSalas',
                    headers: {
                        authorization: token
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
        }, [token, countActives])

    const name = useFormValues()
    const price = useFormValues()
    
    const newSalaData = {
        users: [
            {
                user: userData.userName,
                parentId: undefined,
                space: 'true',
                childsId: {
                    childId1: '',
                    childId2: '',
                }
            }
        ],
        name: name.value,
        price: price.value,
        creator: userData.userName
    }
  
    const [roomValid, setRoomValid] = useState(true)
    const [priceValid, setPriceValid] = useState(true)
    const [createLoading, setCreateLoading] = useState(false)

    async function newSala( e ){
        e.preventDefault()

        if( reg_whiteSpace.test(name.value) || name.value.length < 4 || name.value.length > 15){
            return setRoomValid(false)
        }else { setRoomValid(true)}
        if(parseFloat(price.value) < 5000 || price.value ===  '' ){
            return setPriceValid(false)
        }else{ setPriceValid(true) }

        setCreateLoading(true)

            await axios({
                data: newSalaData,
                method: 'post',
                url: url+'/api/new/sala',
                headers: {
                    authorization: token
                }
            }).then(res => {
                setCreateLoading(false)
                if (res.data.error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: res.data.error,
                    })
                }else{
                    props.props.history.push(`/sala/${res.data.id}`)}
            }).catch(err => {
                setCreateLoading(false)
                console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err,
                })
            })
    }
    
    return(
        <div className='home-container'>

            <div className={actives_560 ? 'home-left' : 'home-left home-left-560'}>


                <div className='actives-rooms'>
                    <h3>Tus Salas</h3>
                    <div className={activesData.total === 1 ? 'dNone' : 'pagination'}>
                        <button disabled={countActives === 1 ? true : false} className='pagination-button' onClick={()=> setCountActives(countActives -= 1) } ><AiOutlineCaretLeft size='30'/></button> 
                            <p><span>{countActives}</span> - {activesData.total}</p> 
                        <button disabled={countActives === activesData.total ? true : false} className='pagination-button' onClick={()=> setCountActives(countActives += 1) }><AiOutlineCaretRight size='30' /></button>
                    </div>
                    {
                    activesLoading ? 
                        <div className=' text-center'>
                            <div className="spinner-border spiner-actives text-danger" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div> : 
                        <div>
                            {
                                listRooms.length === 0 ? <p className='no-salas-actives'>No hay salas creadas!</p>  :

                                <div>
                                    
                                    <ul>
                                        {
                                            listRooms.map((data) => {
                                                return (
                                                    <li className='actives-li' key={data._id}>
                                                        <Link to={`/sala/${data._id}`} className='actives-links Link'>
                                                            <img src={ArbolImg} alt="ArbolImg"/>
                                                            <div className='actives-description'>
                                                                <p>Nombre de sala: <span>{data.name}</span></p>
                                                                <p>Valor: <span>${formatNumber(data.price)}</span></p>
                                                                <p>Creador: <span>{data.creator}</span></p>
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
            </div>

            <div className={!actives_560 ? 'home-right' : 'home-right home-right-560'}>

                <div className="create-custom">
                    <div className='create-form-container'>
                        <h3>Crear Sala</h3>    
                        <form onSubmit={newSala} >
                            <div className={roomValid ? 'mb-3' : 'mb-2'}>
                                <div className='d-flex'>
                                    <div>
                                        <div className="input-group-text input-guide">< MdHome /></div>
                                    </div>
                                    <input type='text' {...name} placeholder='Nombre de sala' />
                                </div>
                                <label className={!roomValid ? 'new-room-valid' : 'dNone'}><MdInfo />Minimo 4 caracteres, maximo 15, no debe haber espacios</label>
                            </div>
                            <div className={priceValid ? 'mb-3' : 'mb-2'}>
                                <div className='d-flex'>
                                    <div>
                                        <div className="input-group-text input-guide">$</div>
                                    </div>
                                    <input  placeholder='Valor' type='text' {...price} />
                                </div>
                                <label className={!priceValid ? 'new-room-valid' : 'dNone'}><MdInfo />Valor Minimo de Sala $5.000 COP</label>
                            </div>
                            <button disabled={createLoading ? true : false}>
                                <div className={createLoading ? "spinner-border loading-login text-danger" : 'dNone'} role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <p className={createLoading ? 'dNone' : ''}>Crear</p>
                            </button>
                        </form>   
                    </div>       
                </div>
                <div className='section-video'>
                    <div className='youtube-container'>
                        <h3>Instrucciones</h3>
                        <div className='youtube-wrap'>
                            <iframe className='youtube-video' width="560" height="315" title='Instrucciones' src="https://www.youtube.com/embed/kIBaxpNuGBs" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <div className='navigation-container'>
                <button onClick={()=> setActives_560(false) } className={!actives_560 ? 'navigation-button navigation-left' : 'navigation-button left-button' }><MdHome size='35' /></button>  
                <button onClick={()=> setActives_560(true) } className={actives_560 ? 'navigation-button navigation-right' : 'navigation-button' }><MdList size='35' /></button>  
            </div>
        </div>
    )
}