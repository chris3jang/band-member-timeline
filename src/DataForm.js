import React, { Component } from 'react';
import FormMember from './FormMember';
import './form.css';

class DataForm extends Component {

	state = {
    	members: 1,
    	errors: [],
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

	    const data = {
	    	bandName: e.target.childNodes[1].value,
			members: members
	    }

	    console.log('ERRORS', data)

	    let isValid = true;

	    if(!data.bandName) {
	    	isValid = false;
	    	console.log("EMPTY BAND NAME")
	    	e.target.childNodes[1].style["boxShadow"] = '0 0 3px #CC0000';
	    }

	    const emptyMemberNameIndexes = [];
	    const emptyInstrumentIndexes = [];
	    const emptyTimeFrameIndexes = [];
	    const invalidTimeFrameIndexes = [];
	    data.members.forEach((member, i) => {
	    	console.log(member, 'member')
	    	if(!member.name) {
	    		emptyMemberNameIndexes.push(i);
	    		isValid = false;
	    	}
	    	member.instruments.forEach((instr, j) => {
	    		if(!instr) {
	    			emptyInstrumentIndexes.push([i, j]);
	    			isValid = false;
	    		}
	    	})
	    	member.timeframe.forEach((tf, j) => {
	    		if(!tf) {
	    			emptyTimeFrameIndexes.push([i, j]);
	    			isValid = false;
	    		}
	    		console.log('tf.substring(0, 2)', tf.substring(0, 2), !isNaN(parseFloat(tf.substring(0, 2))) && isFinite(tf.substring(0, 2)))
	    		console.log('tf.substring(3, 5)', tf.substring(3, 5), !isNaN(parseFloat(tf.substring(3, 5))) && isFinite(tf.substring(3, 5)))
	    		console.log('tf.substring(2, 3)', tf.substring(2, 3))
	    		if((!(!isNaN(parseFloat(tf.substring(0, 2))) && isFinite(tf.substring(0, 2)))) || (!(!isNaN(parseFloat(tf.substring(3, 5))) && isFinite(tf.substring(3, 5)))) || tf.substring(2, 3) !== '-' || tf.length !== 5) {
	    			invalidTimeFrameIndexes.push([i, j]);
	    			isValid = false;
	    		}
	    	})
	    })

	    console.log("EMPTY NAME ERROR INDEXES:", emptyMemberNameIndexes);
	    console.log("EMPTY INSTR ERROR INDEXES:", emptyInstrumentIndexes);
	    console.log("EMPTY TIMEFRAME ERROR INDEXES:", emptyTimeFrameIndexes);
	    console.log("INVALID TIMEFRAME ERROR INDEXES:", invalidTimeFrameIndexes);


	    const memberEls = e.target.getElementsByClassName('member');
	    let instrInputEls = [], tfInputEls = [];

	    for(let i = 0; i < members.length; i++) {

	    	if(emptyMemberNameIndexes.includes(i)) {
	    		memberEls[i].childNodes[0].style["boxShadow"] = '0 0 3px #CC0000';
	    	}

	    	instrInputEls = memberEls[i].childNodes[3].childNodes[0].childNodes;
	    	for(let j = 0; j < instrInputEls.length; j++) {
	    		for(let k = 0; k < emptyInstrumentIndexes.length; k++) {
					if (emptyInstrumentIndexes[k][0] === i && emptyInstrumentIndexes[k][1] === j) {
						instrInputEls[j].style["boxShadow"] = '0 0 3px #CC0000';
					}
				}
	    	}

			tfInputEls = memberEls[i].childNodes[5].childNodes[0].childNodes;
	    	for(let j = 0; j < tfInputEls.length; j++) {
	    		for(let k = 0; k < emptyTimeFrameIndexes.length; k++) {
					if(emptyTimeFrameIndexes[k][0] === i && emptyTimeFrameIndexes[k][1] === j) {
						tfInputEls[j].style["boxShadow"] = '0 0 3px #CC0000';
					}
				}
				for(let k = 0; k < invalidTimeFrameIndexes.length; k++) {
					if(invalidTimeFrameIndexes[k][0] === i && invalidTimeFrameIndexes[k][1] === j) {
						tfInputEls[j].style["boxShadow"] = '0 0 3px #CC0000';
					}
				}
	    	}
	    }


	    if(isValid) {
	      	this.props.updateData({
	      		bandName: e.target.childNodes[1].value,
				members: members,
	      	})
	    }
	    else {
	    	let errors = [];
	    	errors.push(<p style={{color: 'red'}}>Form Errors:</p>)
	    	if(!data.bandName) errors.push(<p style={{color: 'red'}}>Band name cannot be empty.</p>);
	    	if(emptyMemberNameIndexes.length > 0) {
	    		errors.push(<p style={{color: 'red'}}>Member name cannot be empty.</p>);
	    	}
	    	if(emptyInstrumentIndexes.length > 0) {
	    		errors.push(<p style={{color: 'red'}}>Instrument cannot be empty.</p>);
	    	}
	    	if(emptyTimeFrameIndexes.length > 0) {
	    		errors.push(<p style={{color: 'red'}}>Timeframe cannot be empty.</p>);
	    	}
	    	if(invalidTimeFrameIndexes.length > 0) {
	    		errors.push(<p style={{color: 'red'}}>Timeframe format incorrect.  Use last 2 digits of start year, followed by a single hyphen, followed by last 2 digits of end year, without spaces.</p>);
	    	}
	    	this.setState({errors: errors})
	    }


    }


    render() {

		return (
			<div>
				<form className="form" action="" onSubmit={this.handleSubmit.bind(this)}>
			        <p className={"BandName"}>Band Name:</p>
			        <input className="textInput" type="text" name="bandname" placeholder="name"></input>
		            <div>
            			<button className="addButton" onClick={this.handleAddMember.bind(this)}>+</button>
			        	<p style={{display: 'inline-block'}}>Members:</p>
		            </div>
		            {Array(this.state.members).fill(<FormMember></FormMember>)}
		            {this.state.errors.length > 0 
					? 
					<p style={{color: 'red'}}>{this.state.errors}</p>
					:
					<div></div>
					}
					<input className="sbmtButton" type="submit" value="Submit"></input>
				</form>
			</div>
		)
	}
}

export default DataForm;