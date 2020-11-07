import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { url } from '../urlServer'
import { Context } from '../context'

const MailVerification = (props) => {

    const emailHash = props.match.params.token
    const [ loading, setLoading ] = useState(false)
    const { toggleAuth } = useContext(Context)

    function mail(){
        axios({
            method: 'post',
            data: { emailHash: emailHash },
            url: url+'/api/mailverification',
        }).then(res => {
            setLoading(false)
            if(res.data.error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.error,
                })
            }else{
                toggleAuth(res.data.token, res.data.userName)
                props.history.push(`/home`)
            }
        }).catch(error => {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
            })
        })    

    }
    
    useEffect(()=>{
        mail()
    },[emailHash])

    return <div><h1>ALGOIOOO</h1></div>
}

export default MailVerification