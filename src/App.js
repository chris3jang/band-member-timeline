import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  	state = {count: 1};

  	handleAddMember(e) {
  		e.preventDefault();
  		let oldCount = this.state.count;
  		this.setState({count: oldCount + 1});
  	}

  	

	render() {
		let formFields = [];
	  	for(let i = 0; i < this.state.count; i++) {
	  		formFields.push(
	  			<div>
					<input type="text" name="memberbame" placeholder="name"></input>
					<input type="text" name="instrument" placeholder="instrument"></input>
					<input type="text" name="time" placeholder="timeframe"></input>
				</div>
	  		);
	  	}

	    return (
	      <div className="App">
	        <form action="">
	        	<p>Band Name:</p>
	        	<input type="text" name="bandname" placeholder="name"></input>
	        	<p>Members:</p>
	        	<button onClick={this.handleAddInstrument.bind(this)}>+</button>
	        	<button onClick={this.handleAddTimeframe.bind(this)}>+</button>
	        	{formFields}
	        	<button style={{display: 'block', margin: 'auto', marginTop: 10}} onClick={this.handleAddMember.bind(this)}>Add Member</button>
	        </form>
	      </div>
	    );
  }
}

export default App;
