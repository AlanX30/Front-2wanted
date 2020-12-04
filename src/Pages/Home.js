import React, { useState } from 'react'
import {MdHome, MdList, MdInfo} from "react-icons/md"
import { url } from '../urlServer'
import NewSalaForm from '../Components/Forms/NewSalaForm'
import ListRooms from '../Components/ListRooms'
import Swal from 'sweetalert2'
import './Styles/Home.css'
import axios from 'axios'
import Cookies from 'js-cookie'

export const Home = (props) => {

    const token = Cookies.get('token')
    const [actives_560, setActives_560] = useState(false)
    
    return(
        <div className='home-container'>

            <div className={actives_560 ? 'home-left' : 'home-left home-left-560'}>

                <ListRooms Swal={Swal} token={token} axios={axios} url={url} />
                
            </div>

            <div className={!actives_560 ? 'home-right' : 'home-right home-right-560'}>

                <NewSalaForm props={props} axios={axios} token={token} url={url} MdHome={MdHome} MdInfo={MdInfo}/>

                <div className='section-video'>
                    <div className='youtube-container'>
                        <h3>instructions</h3>
                        <div className='youtube-wrap'>
                            <iframe className='youtube-video' width="560" height="315" title='Instrucciones' src="https://www.youtube.com/embed/-XOuu1vd_fk" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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