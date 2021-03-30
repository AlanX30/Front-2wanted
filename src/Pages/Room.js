import React, { useState, useEffect, useContext } from 'react'
import './Styles/Room.css'
import Tree  from '../Components/Tree'
import RomDetails from '../Components/RomDetails'
import { useChildsData }  from '../hooks/useChildsData'
import { Context } from '../context'
import { url } from '../urlServer'
import axios from 'axios'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { useCallback } from 'react'

export const Room = (props) => {

    const { usdBtc, csrfToken } = useContext(Context)
    const userName = Cookies.get('username')
    
    const salaId = props.match.params.salaId
    const [parent, setParent] = useState('')
    const [inBalance, setInBalance] = useState(0)
    const [dataRoom, setDataRoom] = useState({})

    const [loadingDetails, setLoadingDetails] = useState(false)
     
    const [countUserData, setCountUserData] = useState(0)
    const { arbolData, loadingChildsData } = useChildsData(salaId, userName)

    
    const count = useCallback((data) => {
        if(count){
            setCountUserData(data)
        }
    },[])

    useEffect(()=>{
        async function searchRoom(){
            try {
                setLoadingDetails(true)
                const response = await axios({
                    data: { salaId: salaId },
                    method: 'post',
                    url: url+'/api/search/sala',
                    headers: { 
                        'X-CSRF-Token': csrfToken
                    }
                })
                if(response.data.error){
                    setLoadingDetails(false)
                    props.history.push('/home')
                }else{
                    setInBalance(response.data.inBalance)
                    setParent(response.data.parentId)
                    setDataRoom(response.data.data)  
                    setLoadingDetails(false)
                }
            
            }catch(error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error,
                })
            }
        }

        if(csrfToken){
            searchRoom()
        }

    },[userName, salaId, countUserData, props.history, csrfToken])

    
    if(!dataRoom || loadingChildsData){
        return <div className='loading-room'>
            <div className="spinner-border spiner-room text-danger" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    }
    
    return (
        <div className='room'>
            <div>
                <div className='arbol-container'>
                    <Tree loading={loadingChildsData} userName={userName} salaName={dataRoom.name} price={dataRoom.price} salaId={dataRoom._id} arbolData={arbolData} />
                </div>
            </div>    
            <div>
                <RomDetails loading={loadingDetails} usdBtc={usdBtc} count={count} url={url} parent={parent} inBalance={inBalance} dataRoom={dataRoom} arbolData={arbolData} userName={userName} salaId={salaId}  />
            </div>    
        </div>
    )
}