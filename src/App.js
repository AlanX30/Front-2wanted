import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {Home} from './Pages/Home'
import {PagePersonas} from './Components/Personas'
import {Navbar} from './Components/Navbar'
import {Sala} from './Pages/Sala'

function App() {
  return (
    <BrowserRouter>
     <Navbar />
      <Switch>
        <Route exact path ='/' component={Home}/>
        <Route exact path ='/sala/:salaID/:userName' component={Sala}/>
        <Route exact path ='/persona/:id' component={PagePersonas}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
