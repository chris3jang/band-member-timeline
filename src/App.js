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
