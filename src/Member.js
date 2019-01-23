import React, { Component } from 'react';


class Member extends Component {

	shouldComponenentUpdate(nextProps, nextState) {
		return true;
	}

	state = {
		instrInputs: 0,
		tmfrmInputs: 0
	}

	handleAddInstrument(e) {
		e.preventDefault();
		this.setState(prevState => ({
  			instrInputs: prevState.instrInputs + 1
  		}));
	}

	handleAddTimeFrame(e) {
		e.preventDefault();
		this.setState(prevState => ({
  			tmfrmInputs: prevState.tmfrmInputs + 1
  		}));
	}

	render() {

		return (
			<div>
				<input type="text" name="memberbame" placeholder="name" style={{verticalAlign: 'top'}}></input>
				<div style={{display: 'inline-block', width: 20}}></div>

				<div style={{display: 'inline-block', verticalAlign: 'top'}}>
					<input type="text" name="instrument" placeholder="instrument" style={{display: 'inline-block'}}></input>
					<button onClick={this.handleAddInstrument.bind(this)} style={{display: 'inline-block'}}>+</button>
					<div>{Array(this.state.instrInputs).fill(<input type="text" name="instrument" placeholder="instrument" style={{display: 'block', marginRight: 0}}></input>)}</div>
	          	</div>

				<div style={{display: 'inline-block', width: 20}}></div>
	        	<div style={{display: 'inline-block', verticalAlign: 'top'}}>
				    <input type="text" name="time" placeholder="timeframe"></input>
				    <button onClick={this.handleAddTimeFrame.bind(this)} style={{display: 'inline-block'}}>+</button>
				    <div>{Array(this.state.tmfrmInputs).fill(<input type="text" name="timeframe" placeholder="timeframe" style={{display: 'block', marginRight: 0}}></input>)}</div>
	      		</div>
			</div>
		)
	}
}

export default Member;