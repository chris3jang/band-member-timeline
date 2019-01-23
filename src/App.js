import React, { Component } from 'react';
import './App.css';

import Member from './Member';

class App extends Component {

	numberMemberLine(num) {
		return (
			<div id={num}>
        {[
          [
				  <input type="text" name="memberbame" placeholder="name"></input>
          ], 
          [
				  <div style={{display: 'inline-block', width: 20}}></div>
          ],
          [
          <div style={{display: 'inline-block'}}>
				  <button onClick={this.handleAddInstrument.bind(this)}>+</button>
				  <input key={num} type="text" name="instrument" placeholder="instrument"></input>
          </div>
          ],
          [
				  <div style={{display: 'inline-block', width: 20}}></div>
          ],
          [ 
          <div style={{display: 'inline-block'}}>
				    <button onClick={this.handleAddTimeframe.bind(this)}>+</button>
				    <input type="text" name="time" placeholder="timeframe"></input>
          </div>
          ]
        ]}
			</div>
		)
	}



  	state = {
  		forms: [
  			[this.numberMemberLine(0)]
  		],
      members: 1
  	};

  	handleAddMember(e) {
  		e.preventDefault();
  		this.setState(prevState => ({
  			members: prevState.members + 1
  	  }))
    }

  	handleAddInstrument(e) {
  		e.preventDefault();
  		const index = e.currentTarget.parentElement.id;

  		this.setState(prevState => {
  			const forms = prevState.forms.map((item, i) => {
  				if(i == index) {
            console.log("item", item)
  					return item.concat(
              <div id={"instr"} style={{display: 'block'}}>
  						  <input type="text" name="instrument" placeholder="instrument" style={{}}></input>
              </div>
  					);
  				}
  				else return item;
  			})
  			return {
  				forms: forms
  			}
  		});
  	}

  	handleAddTimeframe(e) {
  		e.preventDefault();
      const index = e.currentTarget.parentElement.id;

      this.setState(prevState => {
        const forms = prevState.forms.map((item, i) => {
          if(i == index) {
            console.log("item", item)
            return item.concat(
              <div style={{display: 'block'}}>
                <input type="text" name="time" placeholder="timeframe" style={{}}></input>
              </div>
            );
          }
          else return item;
        })
        return {
          forms: forms
        }
      });
  	}

  	

	render() {
	    return (
	      <div className="App">
	        <form action="">
	        	<p>Band Name:</p>
	        	<input type="text" name="bandname" placeholder="name"></input>
            <div>
              <button style={{display: 'inline-block', margin: 'auto', marginTop: 10}} onClick={this.handleAddMember.bind(this)}>+</button>
	        	  <p style={{display: 'inline-block'}}>Members:</p>
            </div>
            {Array(this.state.members).fill(<Member></Member>)}
          </form>
	      </div>
	    );
  }
}

export default App;
