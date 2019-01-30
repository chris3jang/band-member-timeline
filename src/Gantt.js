import React, { Component } from 'react';
import { Chart } from "react-google-charts";

class Gantt extends Component {

	state = {
	}

	render() {
		console.log(this.props.data)

		const data = [
			[
				{ type: 'string', label: 'Task ID' },
	      		{ type: 'string', label: 'Task Name' },
	      		{ type: 'date', label: 'Start Date' },
	      		{ type: 'date', label: 'End Date' },
	      		{ type: 'number', label: 'Duration' },
	      		{ type: 'number', label: 'Percent Complete' },
	      		{ type: 'string', label: 'Dependencies' },
			]
		]

		for(let i = 0; i < this.props.data.members.length; i++) {
			console.log(i);
			console.log(this.props.data.members[i].timeframe[0])
			const tf = this.props.data.members[i].timeframe[0]
			const inst = this.props.data.members[i].instruments[0];
			const s = parseInt(tf.substring(0, 2))
			const e = parseInt(tf.substring(3, 5))

			let start = s;
			let end = e;
			if(start < 20) {
				start = s + 2000;
			}
			else start = s + 1900;
			if(end < 20) {
				end = e + 2000;
			}
			else end = e + 1900;

			console.log("start, end", start, end)

			if(this.props.data.members[i].instruments.length > 1) {
				console.log('multiple')
			}


			data.push(
				[
					'Member' + i.toString(),
					this.props.data.members[i].name,
					new Date(start, 0, 0, 0, 0, 0, 0),
					new Date(end, 0, 0, 0, 0, 0, 0),
					null,
					0,
					null
				]
			)
		}

		console.log(data)

		/*
		const data = [
	    	[
	      		{ type: 'string', label: 'Task ID' },
	      		{ type: 'string', label: 'Task Name' },
	      		{ type: 'date', label: 'Start Date' },
	      		{ type: 'date', label: 'End Date' },
	      		{ type: 'number', label: 'Duration' },
	      		{ type: 'number', label: 'Percent Complete' },
	      		{ type: 'string', label: 'Dependencies' },
	    	],
		    [
		      'Research',
		      'Member 1',
		      new Date(2015, 0, 1),
		      new Date(2015, 0, 5),
		      null,
		      100,
		      null,
		    ],
		    [
		      'Write',
		      'Member 2',
		      null,
		      new Date(2015, 0, 9),
		      3 * 24 * 60 * 60 * 1000,
		      25,
		      'Research,Outline',
		    ],
		    [
		      'Cite',
		      'Create bibliography',
		      null,
		      new Date(2015, 0, 7),
		      1 * 24 * 60 * 60 * 1000,
		      20,
		      'Research',
		    ],
		    [
		      'Complete',
		      'Hand in paper',
		      null,
		      new Date(2015, 0, 10),
		      1 * 24 * 60 * 60 * 1000,
		      0,
		      'Cite,Write',
		    ],
		    [
		      'Outline',
		      'Outline paper',
		      null,
		      new Date(2015, 0, 6),
		      1 * 24 * 60 * 60 * 1000,
		      100,
		      'Research',
		    ],
		]
		*/

		return (
			<div>
				<Chart
		          chartType="Gantt"
		          data={data}
		          width="90%"
		          height="400px"
		          legend="left"
		          options={{legend: 'left', hAxis: {minValue: 85, maxVale:19}}}
		        />
			</div>
		)
	}
}

export default Gantt;