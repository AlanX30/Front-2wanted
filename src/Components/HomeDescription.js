import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import ArbolImg from '../Images/arbol.svg'
import { useUserData } from '../hooks/useUserData'
import { AiOutlineCaretRight, AiOutlineCaretLeft } from 'react-icons/ai'
import {MdHome, MdList} from "react-icons/md"
import useMediaQuery from '../hooks/useMediaQuery'
import NewSalaModal from './NewSalaModal'
import './Styles/HomeDescription.css'
import { useFormValues } from '../hooks/useFormValues'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const HomeDescription = (props) => {

    const token = window.sessionStorage.getItem('token')
    const  {userData}  = useUserData()
   
    const [listRooms, setListRooms] = useState([])
    const [activeDropdown, setActiveDropdown] = useState(false)
    let [countActives, setCountActives] = useState(1) 
    const [activesData, setActivesData] = useState({})
    const [activesLoaing, setActivesLoading] = useState(false)

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
        }
        if(parseFloat(price.value) < 5000 ){
            return setPriceValid(false)
        }
        setCreateLoading(true)
            await axios({
                data: newSalaData,
                method: 'post',
                url: 'http://localhost:3500/api/new/sala',
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

    const [modalOpen, setModalOpen] = useState(null)
    const [priceModal, setPriceModal] = useState(null)
    

    function onCloseModal(){
        setModalOpen(null)
    }

    function onOpenModal(price){
        setModalOpen(true)
        setPriceModal(price)
    }

    const dropDown = useMediaQuery("(min-width: 640px)")

    return(
        <>
            <div className='sections'>

{/*------------------------------------------------ACTIVES ROOMS-----------------------------------------------------------*/}

                { dropDown ? activesLoaing ? 
                
                    <div className='section-activeRooms text-center'>
                        <p className='actives-title'>Your Rooms</p>
                        <div className="spinner-border mt-4 text-danger" role="status">
                                <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                :
                        <div className='section-activeRooms'>
                            <p className='actives-title'>Your Rooms</p>
                            <div>
                                {
                                    listRooms.length === 0 && <p className='no-rooms'>No hay salas creadas!</p>  
                                }
                            </div>
                            <div className={activesData.total === 1 ? 'dNone' : 'pagination'}>
                                <button disabled={countActives === 1 ? true : false} className='pagination-button' onClick={()=> setCountActives(countActives -= 1) } ><AiOutlineCaretLeft size='30'/></button> 
                                <p><span>{countActives}</span> - {activesData.total}</p> 
                                <button disabled={countActives === activesData.total ? true : false} className='pagination-button' onClick={()=> setCountActives(countActives += 1) }><AiOutlineCaretRight size='30' /></button>
                            </div>
                                <ul className=''>
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
                : activesLoaing ? 
                
                <div className={activeDropdown ? 'actives-dropdown text-center' : 'dNone'}>
                    <p className='actives-title'>Your Rooms</p>
                    <div className="spinner-border mt-4 mb-4 text-danger" role="status">
                            <span class="sr-only">Loading...</span>
                    </div>
                </div>
            :
                <div className='home-description-500'>
                
                <div className={activeDropdown ? 'actives-dropdown' : 'actives-dropdown-none'}>  
                    <p className='actives-title text-center'>Your Rooms</p>   
                    <div>
                        {
                            listRooms.length === 0 && <p className='no-rooms'>No hay salas creadas!</p>  
                        }
                    </div>  
                    <div className={activesData.total === 1 ? 'dNone' : 'pagination'}>
                        <button disabled={countActives === 1 ? true : false} className='pagination-button' onClick={()=> setCountActives(countActives -= 1) } ><AiOutlineCaretLeft size='30'/></button> 
                        <p><span>{countActives}</span> - {activesData.total}</p> 
                        <button disabled={countActives === activesData.total ? true : false} className='pagination-button' onClick={()=> setCountActives(countActives += 1) }><AiOutlineCaretRight size='30' /></button>
                    </div>          
                    <ul >
                        {
                            listRooms.map((data) => {
                                return (
                                    <li className='actives-li' key={data._id}>
                                        <Link to={`/sala/${data._id}`} className='actives-links btn btn-warning'>
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
                </div>
                } 

 
{/*------------------------------------------------ACTIVES ROOMS-----------------------------------------------------------*/}
{/*------------------------------------------------CREATE ROOMS-----------------------------------------------------------*/}

<div className={activeDropdown ? 'actives-dropdown-none' : 'section-create'}>
    <div className="create-default">
        <div className='text-center'>
             <h1>Create Default Room</h1>
        </div>
        <div className='default-par-container'>
            <div className='default-par'>
                <div className='create-default-button'>
                    <div onClick={() => onOpenModal(5000)} className="default-button-figure">$5.000</div>       
                </div>    
                <div className='create-default-button'>
                     <div onClick={() => onOpenModal(10000)} className="default-button-figure">$10.000</div>   
                </div>       
            </div>
            <div className='default-par'>
                <div className='create-default-button'>
                    <div onClick={() => onOpenModal(20000)} className="default-button-figure">$20.000</div>         
                </div>    
                <div className='create-default-button'>
                    <div onClick={() => onOpenModal(50000)} className="default-button-figure">$50.000</div>  
                </div>       
            </div>
            <div className='default-par'>
                <div className='create-default-button'>
                    <div onClick={() => onOpenModal(80000)} className="default-button-figure">$80.000</div>  
                </div>    
                <div className='create-default-button'>
                    <div onClick={() => onOpenModal(100000)} className="default-button-figure">$100.000</div>  
                </div> 
            </div>
            
        </div>   
    </div>
    <div className="create-custom">
                        <div className='create-form-container'>
                            <h1 className='mb-2'>Create Custom Room</h1>    
                            <form className='' onSubmit={newSala} >
                                <div className='form-group'>
                                    <label className=''>Room Name:</label>
                                    <input className="form-control" type='text' {...name} />
                                </div>
                                <div className='form-group'>
                                    <label className='mb-0'>Price:</label>
                                    <input className="form-control" type='text' {...price} />
                                </div>
                                <div className='form-group'>
                                    <label className=''>Password:</label>
                                    <input className="form-control" placeholder='Optional' type='password' {...password} />
                                </div>
                                <button className='btn btn-warning'>Create</button>
                             </form>   
                </div>       
    </div>
</div>

</div>                      
            {/* <NewSalaModal userData={userData} token={token} oneString={oneString} password={password} price={priceModal} isOpen={modalOpen} onClose={onCloseModal} /> */}
            {!dropDown && <div className='navigation'>
                <button onClick={()=> setActiveDropdown(false) } className='navigation-button'><MdHome size='30' /></button>  
                <button onClick={()=> setActiveDropdown(true) } className='navigation-button'><MdList size='30' /></button>  
            </div>}
        </>
    )
}