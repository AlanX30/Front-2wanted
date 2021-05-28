import React, { useContext, useState, useEffect } from 'react'
import '../Styles/Navbar.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import JoinModal from '../Modals/JoinModal'
import { Context } from '../../context'
import { MdInfo, MdSearch, MdKeyboardReturn } from "react-icons/md";
import { useFormValues } from '../../hooks/useFormValues'

const NavbarForm = ({ ArbolImg, url, iconSet, useComponentVisible }) => {

    const room1 = useFormValues()
    const dropdownFilter = useComponentVisible(false)

    const { csrfToken } = useContext(Context)

    const [iconNone, setIconNone] = useState(false)
    const [modal2Open, setModal2Open] = useState(null)
    const [searchLoading, setSearchLoading] = useState(false)
    const [filterSala, setFilterSala] = useState(false)

    useEffect(()=>{
        if(iconNone){iconSet(true)}else{iconSet(false)}
    },[iconNone, iconSet])

    function onOpen2Modal(){
        setModal2Open(true)
    }
    function onClose2Modal(){
        setModal2Open(null)
    }

    async function searchRoom1( e ){
        if(e){
            e.preventDefault()
        }

        setSearchLoading(true)

        dropdownFilter.setIsComponentVisible(true)

        try{
            const response = await axios({
                data: { name: room1.value },
                method: 'post',
                url: url+'/api/search/sala',
                headers:{ 
                    'X-CSRF-Token': csrfToken
                }
            })

            setSearchLoading(false)
            setFilterSala(response.data)

        }catch(error){
            setSearchLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
            })
        }
    }

    const params = new URLSearchParams(window.location.search)
    const salaParams = params.get('add')

    useEffect(() => {
        if(salaParams && csrfToken){
            setSearchLoading(true)
            axios({
                data: { name: salaParams },
                method: 'post',
                url: url+'/api/search/sala',
                headers:{ 
                    'X-CSRF-Token': csrfToken
                }
            }).then(res => {
                setSearchLoading(false)
                if(res.data.error){
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: res.data.error,
                    })
                }else{
                    setFilterSala(res.data)
                    onOpen2Modal(true)
                }
            })
            .catch( err => {
                setSearchLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err,
                })
            })
        }
    },[salaParams, csrfToken, url])

    return <>

        {/* ------------------------------------Section-Searcher hidden---------------------------------------------------------------------- */}      

        <div className="section-searcher-hidden">
            <button onClick={()=> setIconNone(true)} className={!iconNone ? 'icon-navbar' : 'dNone'}><MdSearch size='23' /></button>
                
            <div className={iconNone  ? 'searcher-hidden' : 'dNone'}>
                <form onSubmit={searchRoom1} >
                    <button onClick={()=> setIconNone(false)} type='button' className='icon-navbar'><MdKeyboardReturn size='23' /></button>
                    <input {...room1} type='text' placeholder='Room Name' />
                    <button type='submit' className='icon-navbar'><MdSearch size='23' /></button>
                </form>
            </div>
                
        </div>

{/* ------------------------------------/Section-Searcher hidden---------------------------------------------------------------------- */}

        <div className="section-searcher">

            <form onSubmit={searchRoom1} >
                <div>
                    <input {...room1} type='text' placeholder='Room Name'/>
                </div>
                <button type='submit' className='icon-navbar'><MdSearch size='23' /></button>
            </form>
            
            <div ref={dropdownFilter.ref} className={dropdownFilter.isComponentVisible ? 'dropdown-menu-navbar-filter isActive' : 'dNone'}>
                { 

                    searchLoading ? <div className= "spinner-border text-danger" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> : 
                        
                    filterSala.data ?

                    <div>
                        
                    <div className={dropdownFilter.isComponentVisible ? 'filter-sala' : 'dNone'}>            
                            <div onClick={onOpen2Modal} className=' filter-sala-wrap'>
                                <img src={ArbolImg} className='' alt="..." />
                                <div className='filter-sala-description'>
                                    <p> Room Name:  <span> {filterSala.data.name}</span>  </p>
                                    <p> Creator:  <span> {filterSala.data.creator}</span>  </p>
                                    <p> Price:  <span> {filterSala.data.price.toString().slice(0,9)} BTC</span>  </p>
                                </div>
                            </div>
                        <button onClick={onOpen2Modal} className=''>Join</button>
                    </div> 
                    <p className='aviso-filtro'><MdInfo />Remember to respect uppercase and lowercase letters</p>
                    </div> : <div className='no-spaces'>{filterSala.error}! <p className='aviso-filtro'><MdInfo />Remember to respect uppercase and lowercase letters</p></div>
                } 
            </div>

        </div>
        <JoinModal data={filterSala.data} isOpen={modal2Open} onClose={onClose2Modal}/>
    </>
}

export default React.memo(NavbarForm)