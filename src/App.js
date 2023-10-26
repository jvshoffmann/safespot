/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import React from "react"
import Login from './components/Login.js';
import MapContainer from './components/Map.js';
import Register from './components/Register.js'


// Agora use o 'client' para fazer suas queries


class App extends React.Component {
  state = {
    name: ""
  }

  // componentDidMount() {
  //   fetch("http://localhost:3000")
  //     .then(res => res.json())
  //     .then(data => this.setState({ name: data.name }))
  // }

  render() {
    return (
    <Router>
      <Routes>
      <Route path="/map" element={<MapContainer />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
    /*return (
      <h1>Hello {this.state.name}!</h1>
    )*/
  }
}

export default App
