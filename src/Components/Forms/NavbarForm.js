import React, { useState, useEffect } from 'react'
import '../Styles/Navbar.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import JoinModal from '../Modals/JoinModal'
import { MdInfo, MdSearch, MdKeyboardReturn } from "react-icons/md";
import { useFormValues } from '../../hooks/useFormValues'

const NavbarForm = ({ ArbolImg, url, token, iconSet, useComponentVisible }) => {

    const room1 = useFormValues()
    const dropdownFilter = useComponentVisible(false)

    const [iconNone, setIconNone] = useState(false)
    const [modal2Open, setModal2Open] = useState(null)
    const [searchLoading, setSearchLoading] = useState(false)
    const [filterSala, setFilterSala] = useState(false)

    useEffect(()=>{
        if(iconNone){iconSet(true)}else{iconSet(false)}
    },[iconNone, iconSet])

    function formatNumber(number){
        return new Intl.NumberFormat("de-DE").format(number)
    }

    function onOpen2Modal(){
        setModal2Open(true)
    }
    function onClose2Modal(){
        setModal2Open(null)
    }

    async function searchRoom1( e ){
        e.preventDefault()
        
        setSearchLoading(true)

        dropdownFilter.setIsComponentVisible(true)

        try{
            const response = await axios({
                data: { name: room1.value },
                method: 'post',
                url: url+'/api/search/sala',
                headers: {
                    authorization: token
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

    return <>

        {/* ------------------------------------Section-Searcher hidden---------------------------------------------------------------------- */}      

        <div className="section-searcher-hidden">
            <button onClick={()=> setIconNone(true)} className={!iconNone ? 'icon-navbar' : 'dNone'}><MdSearch size='23' /></button>
                
            <div className={iconNone  ? 'searcher-hidden' : 'dNone'}>
                <form onSubmit={searchRoom1} >
                    <button onClick={()=> setIconNone(false)} type='button' className='icon-navbar'><MdKeyboardReturn size='23' /></button>
                    <input {...room1} type='text' placeholder='Nombre de sala' />
                    <button type='submit' className='icon-navbar'><MdSearch size='23' /></button>
                </form>
            </div>
                
        </div>

{/* ------------------------------------/Section-Searcher hidden---------------------------------------------------------------------- */}

        <div className="section-searcher">

            <form onSubmit={searchRoom1} >
                <div>
                    <input {...room1} type='text' placeholder='Nombre de sala'/>
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
                                    <p> Nombre de sala:  <span> {filterSala.data.name}</span>  </p>
                                    <p> Creador:  <span> {filterSala.data.creator}</span>  </p>
                                    <p> Valor:  <span> ${formatNumber(filterSala.data.price)}</span>  </p>
                                </div>
                            </div>
                        <button onClick={onOpen2Modal} className=''>Unirse</button>
                    </div> 
                    <p className='aviso-filtro'><MdInfo />  Recuerda respetar mayusculas y minusculas</p>
                    </div> : <div className='no-spaces'>{filterSala.error}! <p className='aviso-filtro'><MdInfo />   Recuerda respetar mayusculas y minusculas</p></div>
                } 
            </div>

        </div>
        <JoinModal token={token} data={filterSala.data} isOpen={modal2Open} onClose={onClose2Modal}/>
    </>
}

export default React.memo(NavbarForm)