import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.scss';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import AlbumPage from './containers/AlbumPage/AlbumPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Route exact path='/' component={Home} />
        <Route path='/:album_id' component={AlbumPage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
