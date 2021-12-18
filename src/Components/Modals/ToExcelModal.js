import React, { useState, useContext } from 'react'
import { Context } from '../../context'
import Modal from './Modal'
import Swal from 'sweetalert2'
import axios from 'axios'
import { url } from '../../urlServer'

export const ToExcelModal = props => {

    const [loading, setLoading] = useState(false)

    const { csrfToken } = useContext(Context)

    function handleBalanceExcel(){

        setLoading(true)

        axios({
            method: 'post',
            url: url+'/api/admin/balanceToExcel',
            responseType: 'blob',
            headers: {
                'X-CSRF-Token': csrfToken
            }
        })
        .then(res => {
            setLoading(false)
            const filename = res.headers['x-processed-filename']
            const url = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', filename)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            Swal.fire({
                icon: 'success',
                title: 'Succes',
                text: res.data.msg,
            })
            props.onClose()
            
        }).catch( err => {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err,
            })
        })

    }

    return <Modal isOpen={props.isOpen} onClose={props.onClose}>

        <h1>Estas seguro?</h1>
        <br/>
        <h2>Se descargara un balance el formato excel</h2>

        <div className='withdraw2wanted-modal-buttons'>
            <button onClick={props.onClose}>Cancelar</button>
            <button onClick={handleBalanceExcel}>{loading ? 'CARGANDO......' : 'Confirmar'}</button>
        </div>

    </Modal>
}