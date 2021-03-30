import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from './Components/Layout'
import { Blank } from './Components/Blank'
import { Home } from './Pages/Home'
import { AdminHome } from './Pages/AdminHome'
import { Room } from './Pages/Room'
import { Signup } from './Pages/Signup'
import { Signin } from './Pages/AdminSignin'
import { Balance } from './Pages/Balance'
import { UsersInSalas } from './Pages/UsersInSala'
import { Help } from './Pages/Help'
import { Contact_us } from './Pages/Contact_us'
import { HistoryUsers } from './Pages/HistoryUsers'
import { ChangePassword } from './Pages/ChangePassword'
import { Context } from './context'
import { Profile } from './Pages/Profile';

function App() {

  const { isAuth, isAdminAuth } = useContext(Context)
  
  return (
    <BrowserRouter>
      <Switch>
        <Route path ='/changepasswordemail/:token/' component={ChangePassword}/>
        <Route exact path ='/' component={Signup}/>
        <Route path ='/K9N1820/to/access' component={Signin}/>
        <Route exact path ='/pending/' component={Blank}/>
        <Route exact path ='/failure/' component={Blank}/>
        {
          isAuth ? <Layout>
            <Route exact path ='/help/' component={Help}/>
            <Route exact path ='/home/' component={Home}/>
            <Route exact path ='/profile/' component={Profile}/>
            <Route exact path ='/contact_us/' component={Contact_us}/>
            <Route exact path ='/balance/' component={Balance}/>
            <Route exact path ='/sala/:salaId/' component={Room}/>
          </Layout> :
          isAdminAuth && <>
            <Route exact path ='/adminHome/' component={AdminHome}/>
            <Route exact path ='/historyUsers/:fecha1/:fecha2/:user' component={HistoryUsers}/>
            <Route exact path ='/historyUsers/:user' component={HistoryUsers}/>
            <Route exact path ='/historyUsers/:user/:sala' component={UsersInSalas}/>
          </>
        }
        <Route component={Blank}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
