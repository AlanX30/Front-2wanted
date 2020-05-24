import React, { useContext } from 'react'
import { useFormValues } from '../hooks/useFormValues'
import NavbarLogin from '../Components/NavbarLogin'
import { Context } from '../context'
import axios from 'axios'
import IMG from '../Images/esfinge.svg'
import './Styles/Signup.css'

export const Signup = (props) => {

    const { toggleAuth } = useContext(Context)

    const userName = useFormValues()
    const email = useFormValues()
    const password = useFormValues()
    const confirm_password = useFormValues()

    const form = {
        userName: `@${userName.value}`,
        email: email.value,
        password: password.value,
        confirm_password: confirm_password.value
    }

    function handleSubmit( e ){
        e.preventDefault()
        axios.post('http://localhost:3500/users/signup', form)
        .then(res => {
            if(!res.data.error){
                toggleAuth(res.data.token)
                props.history.push(`/home`)
            }
        })
        .catch( err => console.error(err)) 
    }
        
    return(
        <>   

        <NavbarLogin toggleAuth={toggleAuth} />

             <div className="row row-signup">
                <div className="img-signup col-7">
                    <img src={IMG} alt="IMG"/>
                </div>
                <div className="col-register col">
                    <div className='card-signup'>
                        <h3 className="card-header pl-4">
                            Account Register
                        </h3>
                        <div className="card-body form-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group form-inputs">
                                    <input type="text" className='form-control' {...userName} placeholder='UserName'/>
                                </div>
                                <div className="form-group form-inputs">
                                    <input type="email" className='form-control' {...email} placeholder='Email'/>
                                </div>
                                <div className="form-group form-inputs">
                                    <input type="password"  className='form-control' {...password} placeholder='Password'/>
                                </div>
                                <div className="form-group form-inputs">
                                    <input type="password" suggested="new-password" className='form-control' {...confirm_password} placeholder='Confirm Password'/>
                                </div>
                                <button type='submit' className='form-btn btn btn-dark btn-block'>
                                    Signup
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}