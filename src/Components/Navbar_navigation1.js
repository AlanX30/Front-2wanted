import React, { useEffect, useState, useContext } from 'react'
import './Styles/Navbar.css'
import io from 'socket.io-client'
import { Context } from '../context'
import Swal from 'sweetalert2'
import axios from 'axios'
import  InvitationModal  from './Modals/InvitationModal'
import { MdNotificationsNone } from "react-icons/md";

const Navbar_navigation1 = ({ArbolImg, useComponentVisible, url, username}) => {

    const toggle1 = useComponentVisible(false);
    const [invitations, setInvitations] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [modalOpen, setModalOpen] = useState(null)
    const [invitationData, setInvitationData] = useState(null)
    let [countPages, setCountPages] = useState(1)
    let [count, setCount] = useState(0) 
    let [notifications, setNotifications] = useState(0)
    const { csrfToken } = useContext(Context)

    function onOpenModal(invitationData){
        setModalOpen(true)
        setInvitationData(invitationData)
    }

    function onCloseModal(){
        setModalOpen(null)
    }

    useEffect(()=>{

        if(csrfToken){

            const socket = io('/')

            socket.emit('user_online', username)
            
            socket.on('new_message', () => {
                setCount(count => count + 1) 
            })

            if(count > 0){
                setCountPages(1)
            }
            
            axios({
                method: 'post',
                data: {page: countPages},
                url: url+'/api/invitations',
                headers: { 
                    'X-CSRF-Token': csrfToken
                }
            }).then(res => {
                if(res.data.error){
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: res.data.error,
                    })
                }else{
                    if(countPages === 1 || count > 0){
                        setNotifications(res.data.countNotification)
                        setTotalPages(res.data.totalPages)
                        setInvitations(res.data.invitations)
                        setCount(0)
                    }else{
                        setInvitations( invitations => invitations.concat(res.data.invitations))
                        setNotifications(res.data.countNotification)
                        setTotalPages(res.data.totalPages)
                    }
                }
            }).catch( error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error,
                })
            })
        }    
    },[countPages, count, username, url, csrfToken])

    function notificationButton() {
        
        toggle1.setIsComponentVisible(true)

        if(notifications > 0) {
            axios({
                method: 'post',
                url: url+'/api/invitations-reset',
                headers: { 
                    'X-CSRF-Token': csrfToken
                }
            })
    
            setNotifications(0)
        }
    }   

    return (
        <div className='button-nav-1'>
            <button className='icon-navbar' onClick={notificationButton}>
                <div className={notifications > 0 ? 'notification' : 'dNone'}>{notifications}</div>
                <MdNotificationsNone size='23' />
            </button>
            <div ref={toggle1.ref} className={toggle1.isComponentVisible ? 'dropdown-menu-navbar1 isActive' : 'dropdown-menu-navbar1'}>
                {
                    invitations.length === 0 && <p className='no-spaces'>No hay notificaciones</p>
                }
                {
                    invitations.map(invitation => {
                        return (
                            <li className={toggle1.isComponentVisible ? 'invitations-li isActive' : 'invitations-li'} key={invitation._id}>
                                <button className='' onClick={()=> onOpenModal(invitation)}>
                                    <img src={ArbolImg} alt="ArbolImg"/>
                                    <div className='invitation-description'>
                                        <p>Invitado por: <span> {invitation.host}</span></p>
                                        <p>Nombre de sala: <span> {invitation.salaName}</span></p>
                                        <p>Precio: <span> {invitation.price.toString().slice(0,9)} BTC</span></p>
                                    </div>
                                </button>
                            </li>
                        )
                    })
                }
                <button className={totalPages > countPages ? 'button-more-notifications' : 'dNone'} onClick={()=>{setCountPages(countPages + 1)}}>Mas ▼</button>
            </div>
            <InvitationModal invitationData={invitationData} isOpen={modalOpen} onClose={onCloseModal} />
        </div>
    )    
}

export default React.memo(Navbar_navigation1)
