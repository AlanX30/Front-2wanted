import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from './Components/Layout'
import { Blank } from './Components/Blank'
import { Home } from './Pages/Home'
import { Room } from './Pages/Room'
import { Signup } from './Pages/Signup'
import { Balance } from './Pages/Balance'
import { Context } from './context'
import {Profile } from './Pages/Profile';

function App() {

  const { isAuth } = useContext(Context)

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path ='/' component={Signup}/>
        <Route exact path ='/pending/' component={Blank}/>
        <Route exact path ='/failure/' component={Blank}/>
        {
          isAuth && 
          <Layout>
            <Route exact path ='/profile/' component={Profile}/>
            <Route exact path ='/balance/' component={Balance}/>
            <Route exact path ='/Blank/' component={Blank}/>
            <Route exact path ='/home/' component={Home}/>
            <Route exact path ='/sala/:salaId/' component={Room}/>
          </Layout>
        }
        <Route component={Signup} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
