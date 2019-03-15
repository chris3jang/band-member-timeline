import React, { Component } from 'react';
import Member from './Member';
//import FormErrors from './FormErrors';

class DataForm extends Component {

	state = {
    	members: 1,
    	valid: false,
    	data: null
  	}

  	handleAddMember(e) {
  		e.preventDefault();
  		this.setState(prevState => ({
  			members: prevState.members + 1
  		}))
    }

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

	    //validation
	    if(!e.target.childNodes[1].value) {
	    	//band name cannot be empty
	    }

	    const data = {
	    	bandName: e.target.childNodes[1].value,
			members: members
	    }

	    console.log('ERRORS', data)

	    if(!data.bandName) {
	    	console.log("EMPTY BAND NAME")
	    }

	    const emptyMemberNameIndexes = [];
	    const emptyInstrumentIndexes = [];
	    const emptyTimeFrameIndexes = [];
	    const invalidTimeFrameIndexes = [];
	    data.members.forEach((member, i) => {
	    	console.log(member, 'member')
	    	if(!member.name) {
	    		emptyMemberNameIndexes.push(i);
	    	}
	    	member.instruments.forEach((instr, j) => {
	    		if(!instr) {
	    			emptyInstrumentIndexes.push([i, j]);
	    		}
	    	})
	    	member.timeframe.forEach((tf, j) => {
	    		if(!tf) {
	    			emptyTimeFrameIndexes.push([i, j]);
	    		}
	    		console.log('tf.substring(0, 2)', tf.substring(0, 2), !isNaN(parseFloat(tf.substring(0, 2))) && isFinite(tf.substring(0, 2)))
	    		console.log('tf.substring(3, 5)', tf.substring(3, 5), !isNaN(parseFloat(tf.substring(3, 5))) && isFinite(tf.substring(3, 5)))
	    		console.log('tf.substring(2, 3)', tf.substring(2, 3))
	    		if((!(!isNaN(parseFloat(tf.substring(0, 2))) && isFinite(tf.substring(0, 2)))) || (!(!isNaN(parseFloat(tf.substring(3, 5))) && isFinite(tf.substring(3, 5)))) || tf.substring(2, 3) !== '-' || tf.length !== 5) {
	    			invalidTimeFrameIndexes.push([i, j]);
	    		}
	    	})
	    })

	    console.log("EMPTY NAME ERROR INDEXES:", emptyMemberNameIndexes);
	    console.log("EMPTY INSTR ERROR INDEXES:", emptyInstrumentIndexes);
	    console.log("EMPTY TIMEFRAME ERROR INDEXES:", emptyTimeFrameIndexes);
	    console.log("INVALID TIMEFRAME ERROR INDEXES:", invalidTimeFrameIndexes);


      	this.props.updateData({
      		bandName: e.target.childNodes[1].value,
			members: members
      	})
    }


    render() {

		return (
			<div>
				<form action="" onSubmit={this.handleSubmit.bind(this)}>
			        <p>Band Name:</p>
			        <input type="text" name="bandname" placeholder="name"></input>
		            <div>
		            	<button style={{display: 'inline-block', margin: 'auto', marginTop: 10}} onClick={this.handleAddMember.bind(this)}>+</button>
			        	<p style={{display: 'inline-block'}}>Members:</p>
		            </div>
		            {Array(this.state.members).fill(<Member></Member>)}
					<input type="submit" value="Submit"></input>
				</form>
			</div>
		)
	}
}

export default DataForm;