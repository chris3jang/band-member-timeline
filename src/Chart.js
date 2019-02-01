import React, { Component } from 'react';

class Chart extends Component {

	state = {
	}

	render() {

		const rows = this.props.data.members.length;

		const height = 400;
		const gTR = height/(rows+1);

		let piece = "";
		for(let i = 0; i < (rows+1); i++) {
			piece+=`${gTR}px`;
			if(i != rows) piece+=" ";
		}
		console.log(piece)

		const rowDivs = [];
		let earliestYear = 19; // *&^ change to extract year from Date so this works next year without changing it
		let latestYear = 20;

		const allInstruments = [];
		const colors = ['red', 'blue', 'yellow', 'green', 'orange', 'purple'];
		for(let i = 0; i < rows; i++) {
			this.props.data.members[i].instruments.forEach(instrument=> {
				if(!allInstruments.includes(instrument)) allInstruments.push(instrument);
			})
		}

		const instrumentColorTuples = [];
		const instrColorArray = [];

		for(let i = 0; i < allInstruments.length; i++) {
			instrumentColorTuples[allInstruments[i]] = colors[i];
			instrColorArray.push(
				<div style={{display: 'inline-block'}}>
					<div style={{display: 'inline-block', height: 10, width: 10, backgroundColor: colors[i], marginRight: 10}}></div>
					<p style={{display: 'inline-block', marginLeft: 10}}>{allInstruments[i]}</p>
				</div>
			)
		}

		console.log('allInstruments', allInstruments)
		console.log('instrumentColorTuples', instrumentColorTuples)


		
		rowDivs.push(
			<div style={{gridRowStart: 1, gridRowEnd: 2, gridColumnStart: 1, gridColumnEnd: 3, display: 'flex', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', }}>
				{instrColorArray}
			</div>
		)
		for(let i = 0; i < rows; i++) {

			let member = this.props.data.members[i]
			let tf = member.timeframe[0]
			let years = tf.split('-')
			let firstYear = parseInt(years[0])
			let lastYear = parseInt(years[1])

			if((firstYear < earliestYear && ((firstYear <= 19 && earliestYear <= 19) || (firstYear >= 20 && earliestYear >= 20))) || (firstYear >= 20 && earliestYear <= 19)) earliestYear = firstYear;
			if((lastYear > latestYear && ((lastYear <= 19 && latestYear <= 19) || (lastYear >= 20 && latestYear >= 20)))|| (lastYear <= 19 && latestYear >= 20)) latestYear = lastYear;


			rowDivs.push(
				<div style={{display: 'grid', gridTemplateColumns: '20% 75% 5%', gridRowStart: i+2, gridRowEnd: i+3, gridColumnStart: 1, gridColumnEnd: 3}}>
					<div style={{gridColumnStart: 1, gridColumnEnd: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
						<p>{this.props.data.members[i].name}</p>
					</div>
					<div style={{gridColumnStart: 2, gridColumnEnd: 3, display: 'grid', gridTemplateRows: '20% 60% 20%', gridTemplateColumns: '12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5%'}}>
						<div style={{gridColumnStart: 1, gridColumnEnd: 9, gridRowStart: 2, gridRowEnd: 3, backgroundColor: instrumentColorTuples[this.props.data.members[i].instruments[0]]}}></div>
					</div>
				</div>
			)
		}

		console.log(rowDivs)



		return (
			<div>
				<div style={{height: 50}}></div>
				<div style={{display: 'grid', gridTemplateColumns: '20% auto 20%', gridTemplateRows: 400}}>
					<div style={{display: 'grid', gridColumnStart: 2, gridColumnEnd: 3, gridRowStart: 1, gridRowEnd: rows+2, border: '1px solid black', gridTemplateRows: piece}}>
						{rowDivs}
					</div>
				</div>
				<div style={{display: 'grid', gridTemplateColumns: '20% auto 20%', gridTemplateRows: '30px'}}>
					<div style={{gridColumnStart: 2, gridColumnEnd: 3, display: 'grid', gridTemplateColumns: '15% 5% 5% 65% 5% 5%', gridTemplateRows: '100%'}}>
						<div style={{gridColumnStart: 3, gridColumnEnd: 6, gridRowStart: 1, gridRowEnd: 2, display: 'grid', gridTemplateRows: '50% 25% 25%', gridTemplateColumns: '12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5%'}}>
							<div style={{gridColumnStart: 1, gridColumnEnd: 2, gridRowStart: 1, gridRowEnd: 3, borderLeft: 'thick solid #ff0000'}}></div>
							<div style={{gridColumnStart: 2, gridColumnEnd: 3, gridRowStart: 1, gridRowEnd: 2, borderLeft: 'thick solid #ff0000'}}></div>
							<div style={{gridColumnStart: 3, gridColumnEnd: 4, gridRowStart: 1, gridRowEnd: 2, borderLeft: 'thick solid #ff0000'}}></div>
							<div style={{gridColumnStart: 4, gridColumnEnd: 5, gridRowStart: 1, gridRowEnd: 2, borderLeft: 'thick solid #ff0000'}}></div>
							<div style={{gridColumnStart: 5, gridColumnEnd: 6, gridRowStart: 1, gridRowEnd: 3, borderLeft: 'thick solid #ff0000'}}></div>
							<div style={{gridColumnStart: 6, gridColumnEnd: 7, gridRowStart: 1, gridRowEnd: 2, borderLeft: 'thick solid #ff0000'}}></div>
							<div style={{gridColumnStart: 7, gridColumnEnd: 8, gridRowStart: 1, gridRowEnd: 2, borderLeft: 'thick solid #ff0000'}}></div>
							<div style={{gridColumnStart: 8, gridColumnEnd: 9, gridRowStart: 1, gridRowEnd: 2, borderLeft: 'thick solid #ff0000'}}></div>
							<div style={{gridColumnStart: 9, gridColumnEnd: 10, gridRowStart: 1, gridRowEnd: 3, borderLeft: 'thick solid #ff0000'}}></div>
						</div>
						<div style={{gridColumnStart: 2, gridColumnEnd: 4, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
							<p>{earliestYear}</p>
						</div>
						<div style={{gridColumnStart: 5, gridColumnEnd: 7}}>
							<p>{latestYear}</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Chart;