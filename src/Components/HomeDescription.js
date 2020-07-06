import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import ArbolImg from '../Images/arbol.svg'
import { useUserData } from '../hooks/useUserData'
import { AiOutlineCaretRight, AiOutlineCaretLeft } from 'react-icons/ai'
import {MdHome, MdList,  MdLockOutline, MdInfo} from "react-icons/md"
import './Styles/HomeDescription.css'
import { useFormValues } from '../hooks/useFormValues'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const HomeDescription = (props) => {

    const token = window.sessionStorage.getItem('token')
    const  {userData}  = useUserData()
    const [actives_560, setActives_560] = useState(false)
    const [listRooms, setListRooms] = useState([])
    let [countActives, setCountActives] = useState(1) 
    const [activesData, setActivesData] = useState({})
    const [activesLoading, setActivesLoading] = useState(false)

        useEffect(() => { 
            if(token){
                setActivesLoading(true)
                axios({
                    method: 'post',
                    data: {page: countActives},
                    url: 'https://example2wanted.herokuapp.com/api/search/listSalas',
                    headers: {
                        authorization: token
                    }
                })
                .then(res => {
                    setActivesLoading(false)
                    if(res.data.error) {
                        return Swal.fire({
                            background: '#18191',
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
    const password = useFormValues()
    
    const newSalaData = {
        users: [
            {
                user: userData.userName,
                parentId: undefined,
                childsId: {
                    childId1: '',
                    childId2: ''
                }
            }
        ],
        name: name.value,
        password: password.value,
        price: price.value,
        creator: userData.userName
    }
  
    const [roomValid, setRoomValid] = useState(true)
    const [priceValid, setPriceValid] = useState(true)
    const [createLoading, setCreateLoading] = useState(false)

    async function newSala( e ){
        e.preventDefault()

        if(name.value.split(" ").length > 1 || name.value.length < 4){
            return setRoomValid(false)
        }else { setRoomValid(true)}
        if(parseFloat(price.value) < 5000 || price.value ===  '' ){
            return setPriceValid(false)
        }else{ setPriceValid(true) }

        setCreateLoading(true)

            await axios({
                data: newSalaData,
                method: 'post',
                url: 'https://example2wanted.herokuapp.com/api/new/sala',
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
                    <h3>Your Rooms</h3>
                    <div className={activesData.total === 1 ? 'dNone' : 'pagination'}>
                        <button disabled={countActives === 1 ? true : false} className='pagination-button' onClick={()=> setCountActives(countActives -= 1) } ><AiOutlineCaretLeft size='30'/></button> 
                            <p><span>{countActives}</span> - {activesData.total}</p> 
                        <button disabled={countActives === activesData.total ? true : false} className='pagination-button' onClick={()=> setCountActives(countActives += 1) }><AiOutlineCaretRight size='30' /></button>
                    </div>
                    {
                    activesLoading ? 
                        <div className=' text-center'>
                            <div className="spinner-border spiner-actives text-danger" role="status">
                                <span class="sr-only">Loading...</span>
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
                                                                <p>Room Name: <span>{data.name}</span></p>
                                                                <p>Price: <span>${data.price}</span></p>
                                                                <p>Creator: <span>{data.creator}</span></p>
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
                        <h3>Create Custom Room</h3>    
                        <form onSubmit={newSala} >
                            <div className={roomValid ? 'mb-3' : 'mb-2'}>
                                <div className='d-flex'>
                                    <div>
                                        <div class="input-group-text input-guide">< MdHome /></div>
                                    </div>
                                    <input type='text' {...name} placeholder='Room Name' />
                                </div>
                                <label className={!roomValid ? 'new-room-valid' : 'dNone'}><MdInfo />Minimo 4 caracteres, no debe haber espacios</label>
                            </div>
                            <div className={priceValid ? 'mb-3' : 'mb-2'}>
                                <div className='d-flex'>
                                    <div>
                                        <div class="input-group-text input-guide">$</div>
                                    </div>
                                    <input  placeholder='Minimo $5.000' type='text' {...price} />
                                </div>
                                <label className={!priceValid ? 'new-room-valid' : 'dNone'}><MdInfo />precio Minimo de Sala $5.000 COP</label>
                            </div>
                            <div className='form-group d-flex'>
                                <div>
                                    <div class="input-group-text input-guide">< MdLockOutline /></div>
                                </div>
                                <input placeholder='Optional Password' type='password' {...password} />
                            </div>
                            <button>
                                <div className={createLoading ? "spinner-border loading-login text-danger" : 'dNone'} role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <p className={createLoading ? 'dNone' : ''}>Create!</p>
                            </button>
                        </form>   
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