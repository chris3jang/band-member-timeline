import React, { Component } from 'react';
import './App.css';

import Chart from './Chart';
import DataForm from './DataForm';

class App extends Component {

	state = {
    data: null
	};

  updateData(data) {
    this.setState({
      data: data
    });
  };
  	
	render() {
	    return (
	      <div className="App" style={{fontFamily: 'Helvetica'}}>
          {this.state.data !== null ? <Chart data={this.state.data}></Chart> : 
          <DataForm
            updateData={this.updateData.bind(this)}>
          </DataForm>}
	      </div>
	    );
  }
}

export default App;
