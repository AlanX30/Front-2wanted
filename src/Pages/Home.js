import React, { useState } from 'react'
import {MdHome, MdList, MdInfo} from "react-icons/md"
import { url } from '../urlServer'
import NewSalaForm from '../Components/Forms/NewSalaForm'
import ListRooms from '../Components/ListRooms'
import Swal from 'sweetalert2'
import './Styles/Home.css'
import axios from 'axios'

export const Home = (props) => {

    const [actives_560, setActives_560] = useState(false)
    
    return(
        <div className='home-container'>
            <div className='wrap-1100'>
                <div className={actives_560 ? 'home-left' : 'home-left home-left-560'}>

                    <ListRooms Swal={Swal} axios={axios} url={url} />
                    
                </div>

                <div className={!actives_560 ? 'home-right' : 'home-right home-right-560'}>

                    <NewSalaForm props={props} axios={axios} url={url} MdHome={MdHome} MdInfo={MdInfo}/>

                    <div className='section-video'>
                        <div className='youtube-container'>
                            <button className='instruction_home' onClick={()=>props.history.push('/help')}>Instrucciones</button>
                        </div>
                    </div>

                </div>
                
                <div className='navigation-container'>
                    <button onClick={()=> setActives_560(false) } className={!actives_560 ? 'navigation-button navigation-left' : 'navigation-button left-button' }><MdHome size='35' /></button>  
                    <button onClick={()=> setActives_560(true) } className={actives_560 ? 'navigation-button navigation-right' : 'navigation-button' }><MdList size='35' /></button>  
                </div>
            </div>
        </div>
    )
}