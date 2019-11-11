import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import AlbumPage from './containers/AlbumPage/AlbumPage';

function App() {
  return (
    <HashRouter basename='/'>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/:album_id' component={AlbumPage} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
