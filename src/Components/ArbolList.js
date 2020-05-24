import React, { useState, useEffect } from 'react'
import ArbolImg from '../Images/arbol.svg'
import { JoinModal } from './JoinModal'
import { useUserData } from '../hooks/useUserData'
import NewSalaModal from './NewSalaModal'
import './Styles/ArbolList.css'
import { useFormValues } from '../hooks/useFormValues'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const ArbolList = () => {

    const token = window.sessionStorage.getItem('token')

    const [listRooms, setListRooms] = useState([])

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

    const room1 = useFormValues()

    const [modalOpen, setModalOpen] = useState(null)
    const [modal2Open, setModal2Open] = useState(null)
    const [filterSala, setFilterSala] = useState(false)
    const [priceModal, setPriceModal] = useState(null)
    

    function onCloseModal(){
        setModalOpen(null)
    }

    function onOpenModal(price){
        setModalOpen(true)
        setPriceModal(price)
    }

    function onClose2Modal(){
        setModal2Open(null)
    }

    function onOpen2Modal(price){
        setModal2Open(true)
    }

    function oneString(string) {
        if(string.split(" ").length === 1 ){
            return true
        }
        return false
    }

    async function searchRoom1( e ){
        e.preventDefault()

        if(oneString(room1.value)){
            const response = await axios({
                data: { name: room1.value },
                method: 'post',
                url: 'http://localhost:3500/search/sala',
                headers: {
                    authorization: token
                    }
            })
            setFilterSala(response.data)
        }
    }
    
    return(
        <>
            <div className='search-card row '>

                <div className="col-6">

                    <div className='card-list-container'>
                        <h1 className='sala-descrption-title badge badge-dark'>Room Search </h1>

                        <form className='m-4 w-100 d-flex' onSubmit={searchRoom1} >

                            <div className="w-100 form-group mr-2 mb-2 mt-2">
                                <input {...room1} className=" form-control" type='text' placeholder='Room Name'/>
                            </div>
                            <button type='submit' className='search-button btn btn-dark'>Search</button>
                        </form>

                        { 
                            !oneString(room1.value) &&  <div className='alert-space'>Must not contain spaces</div>
                        } 

                        {
                            filterSala && 
                                <>                               
                                    <div className="bg-warning row rom-filter">
                                        <div className="col-4 d-flex align-items-center">
                                            <img src={ArbolImg} className="p-2 card-img-top" alt="..." />
                                        </div>
                                        <div className="col">
                                            <p> Room Name: <span>{filterSala.name}</span>  </p>
                                            <p> Password: <span>{filterSala.protected ? 'Yes' : 'No'}</span>  </p>
                                            <p> Creator: <span>{filterSala.creator}</span>  </p>
                                            <p> Price: <span>${filterSala.price}</span>  </p>
                                            <button onClick={onOpen2Modal} className='mt-2 btn btn-dark'>Join</button>
                                        </div>
                                    </div>
                                </>     
                        }
                    </div>
                      
                </div>
                <div className="col pr-3 p-0 mr-4">
                    <div className='card-list-container'>
                        <h1 className='sala-descrption-title badge badge-dark'>Active Rooms</h1>    
                        <ul className='myrooms-ul'>
                            {
                                listRooms.map((data) => {
                                    return (
                                        <li className='myrooms-li' key={data._id}>
                                             <Link to={`/sala/${data._id}`} className='btn btn-warning myrooms-list Link'>
                                                 <div>
                                                    <img className='mr-4' src={ArbolImg} alt="ArbolImg"/>
                                                 </div>
                                                 <div className='myrooms-description'>
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
            </div>


            <div className='row arbol-list'>

                <div className="pl-3 p-0 col-6">

                    <div className='card-list-container'>
                        <h1 className='sala-descrption-title badge badge-dark'> <span className="badge badge-secondary">Create Rooms</span></h1>

                        <div className="row card-row">

                            <div className="card-item col-3 d-flex justify-content-center">
                                <button onClick={() => onOpenModal(1)} className="card arbol-card text-white bg-warning mb-4 mt-4 links" >
                                    <img src={ArbolImg} className="p-2 card-img-top" alt="..." />
                                    <div className='w-100 create-button btn-dark'>
                                        <p className="card-text text-center">Create  $1</p>
                                    </div>
                                </button>
                            </div>
                            <div className="card-item col-3 d-flex justify-content-center">
                                <button onClick={() => onOpenModal(3)} className="card arbol-card text-white bg-warning mb-4 mt-4 links" >
                                    <img src={ArbolImg} className="p-2 card-img-top" alt="..." />
                                    <div className='w-100 create-button btn-dark'>
                                        <p className="card-text text-center">Create  $3</p>
                                    </div>
                                </button>
                            </div>
                            <div className="card-item col-3 d-flex justify-content-center">
                                <button onClick={() => onOpenModal(10)} className="card arbol-card text-white bg-warning mb-4 mt-4 links" >
                                    <img src={ArbolImg} className="p-2 card-img-top" alt="..." />
                                    <div className='w-100 create-button btn-dark'>
                                        <p className="card-text text-center">Create  $10</p>
                                    </div>
                                </button>
                            </div>
                            <div className="card-item col-3 d-flex justify-content-center">
                                <button onClick={() => onOpenModal(20)} className="card arbol-card text-white bg-warning mb-4 mt-4 links" >
                                    <img src={ArbolImg} className="p-2 card-img-top" alt="..." />
                                    <div className='w-100 create-button btn-dark'>
                                        <p className="card-text text-center">Create  $20</p>
                                    </div>
                                </button>
                            </div>
                            <div className="card-item col-3 d-flex justify-content-center">
                                <button onClick={() => onOpenModal(40)} className="card arbol-card text-white bg-warning mb-4 mt-4 links" >
                                    <img src={ArbolImg} className="p-2 card-img-top" alt="..." />
                                    <div className='w-100 create-button btn-dark'>
                                        <p className="card-text text-center">Create  $40</p>
                                    </div>
                                </button>
                            </div>
                            <div className="card-item col-3 d-flex justify-content-center">
                                <button onClick={() => onOpenModal(60)} className="card arbol-card text-white bg-warning mb-4 mt-4 links" >
                                    <img src={ArbolImg} className="p-2 card-img-top" alt="..." />
                                    <div className='w-100 create-button btn-dark'>
                                        <p className="card-text text-center">Create  $60</p>
                                    </div>
                                </button>
                            </div>
                            <div className="card-item col-3 d-flex justify-content-center">
                                <button onClick={() => onOpenModal(100)} className="card arbol-card text-white bg-warning mb-4 mt-4 links" >
                                    <img src={ArbolImg} className="p-2 card-img-top" alt="..." />
                                    <div className='w-100 create-button btn-dark'>
                                        <p className="card-text text-center">Create  $100</p>
                                    </div>
                                </button>
                            </div>
                            <div className="card-item col-3 d-flex justify-content-center">
                                <button onClick={() => onOpenModal(200)} className="card arbol-card text-white bg-warning mb-4 mt-4 links" >
                                    <img src={ArbolImg} className="p-2 card-img-top" alt="..." />
                                    <div className='w-100 create-button btn-dark'>
                                        <p className="card-text text-center">Create  $200</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col">
                        <div className='card-list-container'>
                            <h1 className='sala-descrption-title badge badge-dark'>Create Custom Room</h1>    
                            <form className='m-4 w-100 ' onSubmit={newSala} >
                                <div className="w-100 form-group mr-2 mb-2 mt-2">
                                    <label className='mb-0'>Room Name:</label>
                                    <input className=" form-control" type='text' {...name} />
                                </div>
                                <div className="w-100 form-group mr-2 mb-2 mt-2">
                                    <label className='mb-0'>Price:</label>
                                    <input className=" form-control" type='text' {...price} />
                                </div>
                                <div className="w-100 form-group mr-2 mb-2 mt-2">
                                    <label className='mb-0'>Password:</label>
                                    <input className=" form-control" placeholder='Optional' type='password' {...password} />
                                </div>
                                <button className='mt-2 btn btn-dark'>Create</button>
                             </form>
                        </div>             
                </div>        

            </div>
            <JoinModal token={token} price={filterSala.price} salaId={filterSala._id} isOpen={modal2Open} onClose={onClose2Modal}/>
            <NewSalaModal userData={userData} token={token} oneString={oneString} password={password} price={priceModal} isOpen={modalOpen} onClose={onCloseModal} />
        </>
    )
}