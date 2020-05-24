import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from './Pages/Home'
import { PagePersonas } from './Components/Personas'
import { Sala } from './Pages/Sala'
import { Signup } from './Pages/Signup'
import { Context } from './context'
import { NotFound } from './Pages/NotFound';
import { Wallet } from './Pages/Wallet';
import { SalaReal } from './Pages/SalaReal'

function App() {

  const { isAuth } = useContext(Context)

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path ='/' component={Signup}/>
        {
          isAuth && 
          <>
            <Route exact path ='/home/' component={Home}/>
            <Route exact path ='/wallet' component={Wallet}/>
            <Route exact path ='/sala/:salaId/' component={SalaReal}/>
            <Route exact path ='/sala/:salaId/:userName' component={Sala}/>
            <Route exact path ='/persona/:id' component={PagePersonas}/>
          </>
        }
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
