import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Deck from './components/Deck/Deck';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import axios from 'axios';
import AppWrapper from './components/AppWrapper/AppWrapper'


class App extends React.Component {
  render() {
    // let jsx = (
    //   <>
    //     <Navbar />
    //     <div className="DeckWrapper">
    //       <Sidebar />
    //       <Deck />
    //     </div>
    //   </>
    // )
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/BITS-SRCD/" component={Login} />
            <Route path="/BITS-SRCD/deck" component={AppWrapper} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
