import React from 'react';
import Header from './components/Header';
import Main from './pages/main';
import Routes from './routes';
import './estilo.css';

const App = () => (
  <div className="App">
    <Header />
    <Routes />
  </div>
)

export default App;