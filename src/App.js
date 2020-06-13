import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from './Components/Layout'
import { Home } from './Pages/Home'
import { Room } from './Pages/Room'
import { Signup } from './Pages/Signup'
import { Context } from './context'
import { NotFound } from './Pages/NotFound';
import { Wallet } from './Pages/Wallet';

function App() {

  const { isAuth } = useContext(Context)

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path ='/' component={Signup}/>
        {
          isAuth && 
          <Layout>
            <Route exact path ='/home/' component={Home}/>
            <Route exact path ='/wallet' component={Wallet}/>
            <Route exact path ='/sala/:salaId/' component={Room}/>
          </Layout>
        }
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
