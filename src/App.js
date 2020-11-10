import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from './Components/Layout'
import { Blank } from './Components/Blank'
import { Home } from './Pages/Home'
import { Room } from './Pages/Room'
import { Signup } from './Pages/Signup'
import MailVerification from './Pages/MailVerification'
import { Balance } from './Pages/Balance'
import { ChangePassword } from './Pages/ChangePassword'
import { Context } from './context'
import { Profile } from './Pages/Profile';

function App() {

  const { isAuth } = useContext(Context)
  
  return (
    <BrowserRouter>
      <Switch>
        <Route path ='/mailverification/:token/' component={MailVerification}/>
        <Route path ='/changepasswordemail/:token/' component={ChangePassword}/>
        <Route exact path ='/' component={Signup}/>
        <Route exact path ='/pending/' component={Blank}/>
        <Route exact path ='/failure/' component={Blank}/>
        {
          isAuth && 
          <Layout>
            <Route exact path ='/profile/' component={Profile}/>
            <Route exact path ='/balance/' component={Balance}/>
            <Route exact path ='/home/' component={Home}/>
            <Route exact path ='/sala/:salaId/' component={Room}/>
          </Layout>
        }
        <Route component={Blank}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
