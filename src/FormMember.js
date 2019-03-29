import React, { Component } from 'react';
import './form.css';


class FormMember extends Component {

	state = {
		instrInputs: 1,
		tmfrmInputs: 1,
		inputs: 1
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

	handleAddInstrumentTimeFrame(e) {
		e.preventDefault();
		this.setState(prevState => ({
  			inputs: prevState.inputs + 1
  		}));
	}

	render() {

		return (
			<div className={"member"}>
				<input className="textInput" type="text" name="memberbame" placeholder="name" style={{verticalAlign: 'top'}}></input>
				<div style={{display: 'inline-block', width: 20}}></div>
				<button className="addButton" onClick={this.handleAddInstrumentTimeFrame.bind(this)}>+</button>
				<div style={{display: 'inline-block', verticalAlign: 'top'}}>
					<div>{Array(this.state.inputs).fill(<input className="textInput" type="text" name="instrument" placeholder="instrument" style={{display: 'block', marginRight: 0}}></input>)}</div>
	          	</div>

				<div style={{display: 'inline-block', width: 20}}></div>
	        	<div style={{display: 'inline-block', verticalAlign: 'top'}}>
				    <div>{Array(this.state.inputs).fill(<input className="textInput" type="text" name="timeframe" placeholder="timeframe (yy-yy)" style={{display: 'block', marginRight: 0}}></input>)}</div>
	      		</div>
			</div>
		)
	}
}

export default FormMember;