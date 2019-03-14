import React, { Component } from 'react';
import './App.css';

import Member from './Member';
import Gantt from './Gantt';
import Chart from './Chart';
import DataForm from './DataForm';

class App extends Component {

  	state = {
      //members: 1,
      data: null
  	};

    updateData(data) {
      this.setState({
        data: data
      });
    };

    /*

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

      this.setState({
        data: {
          bandName: e.target.childNodes[1].value,
          members: members
        }
      })

      console.log("!!!", this.state.data)

    }

    */
  	

	render() {
	    return (
	      <div className="App">
          {this.state.data !== null ? <Chart data={this.state.data}></Chart> : 
          <DataForm
            updateData={this.updateData.bind(this)}>
          </DataForm>}
	      </div>
	    );
  }
}

export default App;
