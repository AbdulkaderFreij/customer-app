import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Customers from "./Components/Customers/customers.js";

class App extends Component {
  render(){
  return (
    <div className="App">
      <Customers />
    </div>
  );
}
}

export default App;
