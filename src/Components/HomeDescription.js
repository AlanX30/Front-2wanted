import React, { useState, useEffect } from 'react'
import ArbolImg from '../Images/arbol.svg'
import { useUserData } from '../hooks/useUserData'
import {MdHome, MdList} from "react-icons/md"
import useMediaQuery from '../hooks/useMediaQuery'
import NewSalaModal from './NewSalaModal'
import './Styles/HomeDescription.css'
import { useFormValues } from '../hooks/useFormValues'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const HomeDescription = () => {

    const token = window.sessionStorage.getItem('token')

    const [listRooms, setListRooms] = useState([])
    const [activeDropdown, setActiveDropdown] = useState(false)

    useEffect(() => { 

        if(token){
            axios({
                method: 'get',
                url: 'http://localhost:3500/search/listSalas',
                headers: {
                    authorization: token
                    }
            })
            .then(res => setListRooms(res.data)) 
        } 
    }, [token])

    

    const { userData } = useUserData()  
    const name = useFormValues()
    const price = useFormValues()
    const password = useFormValues()

    const newSalaData = {
        users: [
            {
                user: userData._id,
                parentId: undefined,
                childsId: {
                    childId1: undefined,
                    childId2: undefined
                }
            }
        ],
        name: name.value,
        password: password.value,
        price: price.value,
        creator: userData.userName
    }

    async function newSala( e ){
        e.preventDefault()

        if(userData.wallet >= parseFloat(price.value)) {
            if(oneString(name.value)){
                await axios({
                    data: newSalaData,
                    method: 'post',
                    url: 'http://localhost:3500/new/sala',
                    headers: {
                        authorization: token
                    }
                })
            }
        }
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

    function oneString(string) {
        if(string.split(" ").length === 1 ){
            return true
        }
        return false
    }

    const dropDown = useMediaQuery("(min-width: 600px)")

    return(
        <>
            <div className='sections'>

{/*------------------------------------------------ACTIVES ROOMS-----------------------------------------------------------*/}

                { dropDown ?
                        <div className='section-activeRooms'>
                            <p className='actives-title'>Active Rooms</p>    
                                <ul className=''>
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
                : <div className='home-description-500'>
                <div className='navigation'>
                    <button onClick={()=> setActiveDropdown(false) } className='navigation-button'><MdHome size='30' /></button>  
                    <button onClick={()=> setActiveDropdown(true) } className='navigation-button'><MdList size='30' /></button>  
                </div>
                
                <div className={activeDropdown ? 'actives-dropdown' : 'actives-dropdown-none'}>  
                    <p className='actives-title'>Active Rooms</p>                
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
      
</div>                      

            <NewSalaModal userData={userData} token={token} oneString={oneString} password={password} price={priceModal} isOpen={modalOpen} onClose={onCloseModal} />
        </>
    )
}