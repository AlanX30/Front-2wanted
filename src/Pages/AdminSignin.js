import React, { useContext, useState } from 'react'
import { Context } from '../context'
import { url } from '../urlServer'
import { useFormValues } from '../hooks/useFormValues'
import Swal from 'sweetalert2'
import axios from 'axios'
import './Styles/Signin.css'

export const Signin = (props) => {

    const { toggleAdminAuth, csrfToken } = useContext(Context)

    const [loginLoading, setLoginLoading] = useState(false)

    const id = useFormValues()
    const password = useFormValues()

    const form = {
        id: id.value,
        password: password.value
    }

    function handleSubmit( e ){

        e.preventDefault()

        setLoginLoading(true)

        axios({
            method: 'post',
            data: form,
            url: url+'/api/admin/signin',
            headers: { 
                'X-CSRF-Token': csrfToken
            }
        }).then(res => {
            if(res.data.error){
                setLoginLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.error,
                })
            }else{
                setLoginLoading(false)
                toggleAdminAuth()
                props.history.push(`/adminHome`)
            }
        })
        .catch( err => {
            setLoginLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err,
            })
        })
    }

    return <div className='signin'>
        <form onSubmit={handleSubmit}>
            <input { ...id } type="text" placeholder='ID'/>
            <input { ...password } type="password" placeholder='PASSWORD'/>
            <button>{loginLoading ? 'CARGANDO......' : 'Entrar'}</button>
        </form>
    </div>
}