import React, { Component } from 'react';
import FormMember from './FormMember';

class DataForm extends Component {

	render() {

		state = {
	    	members: 1,
	    	data: null
	  	};

	  	handleAddMember(e) {
	  		e.preventDefault();
	  		this.setState(prevState => ({
	  			members: prevState.members + 1
	  		}));
	    };

		handleSubmit(e) {
			e.preventDefault()
			const members = []

			e.target.childNodes.forEach(node => {
	        	if(node.classList.contains("member")) {

		        	const instruments = [], timeframes = [];
		        	const instrNodes = node.childNodes[3].childNodes[0].childNodes;
		        	const tmfrmNodes = node.childNodes[5].childNodes[0].childNodes;
		        	instrNodes.forEach(instr => {
		        	  instruments.push(instr.value)
		        	})
		        	tmfrmNodes.forEach(tmfrm => {
		        	  timeframes.push(tmfrm.value)
		        	})

		        	members.push({
		        	  name: node.childNodes[0].value,
		        	  instruments: instruments,
		        	  timeframe: timeframes
		        	})
		        }
		    })

			/*
		    this.setState({
		    	data: {
		    		bandName: e.target.childNodes[1].value,
					members: members
				}
			})
			*/

	      	this.props.updateData({
	      		bandName: e.target.childNodes[1].value,
				members: members
	      	})

    	};

		return (
			<div>
				<form action="" onSubmit={this.handleSubmit.bind(this)}>
			        <p>Band Name:</p>
			        <input type="text" name="bandname" placeholder="name"></input>
		            <div>
		            	<button style={{display: 'inline-block', margin: 'auto', marginTop: 10}} onClick={this.handleAddMember.bind(this)}>+</button>
			        	<p style={{display: 'inline-block'}}>Members:</p>
		            </div>
		            {Array(this.state.members).fill(<FormMember></FormMember>)}
					<input type="submit" value="Submit"></input>
				</form>
			</div>
		)
	}
}

export default DataForm;