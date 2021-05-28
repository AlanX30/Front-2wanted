import { useState, useEffect, useContext } from 'react'
import { Context } from '../context'
import { url } from '../urlServer'
import Swal from 'sweetalert2'
import axios from 'axios'

export const useGeneralBalance = () => {

    const { csrfToken } = useContext(Context)
    
    const [general, setGeneral] = useState({}) 
    const [loading, setLoading] = useState(true) 
    const [reload, setReload] = useState(false) 
    
    useEffect(() => {

        setLoading(true)

        if(csrfToken){
            axios({
                method: 'post',
                url: url+'/api/admin/generalTotalBalance',
                headers: {
                    'X-CSRF-Token': csrfToken
                }
            })
            .then(res => {
                if(res.data.error) {
                    setLoading(false)
                    return Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: res.data.error,
                    })
                }else{
                    setGeneral(res.data)
                    setLoading(false)
                }
            }).catch( err => {
                setLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err,
                })
            })
        }
    
    
    },[reload, csrfToken])

    function refresh(){
        setReload(!reload)
    }

    return {reload: refresh, totalDeposit: general.totalDeposits, actualCuenta: general.actualEnCuenta, totalGanado: general.totalWon, moneyUsersRooms: general.userMoneyRooms, totalWallets: general.totalInWallets, actual2wanted: general.actual2wanted, withdrawUsers: general.totalEgresoUsers, withdraw2wanted: general.totalEgreso2wanted, totalRetirado: general.egresos, generalLoading: loading, verification: general.verification, verification2: general.verification2}

}
