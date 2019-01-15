import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <form action="">
        	<p>Band Name:</p>
        	<input type="text" name="bandname" placeholder="name"></input>
        	<p>Member:</p>
        	<input type="text" name="bandname" placeholder="name"></input>
        	<input type="text" name="bandname" placeholder="instrument"></input>
        	<button>+</button>
        </form>
      </div>
    );
  }
}

export default App;
