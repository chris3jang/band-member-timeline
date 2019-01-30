import React, { Component } from 'react';

class Chart extends Component {

	state = {
	}

	render() {

		const rows = this.props.data.members.length;

		const height = 400;
		const gTR = height/rows;

		let piece = "";
		for(let i = 0; i < rows; i++) {
			piece+=`${gTR}px`;
			if(i != rows - 1) piece+=" ";
		}
		console.log(piece)

		const rowDivs = [];
		let earliestYear = 19; // *&^ change to extract year from Date so this works next year without changing it

		for(let i = 0; i < rows; i++) {

			let member = this.props.data.members[i]
			let tf = member.timeframe[0]
			let years = tf.split('-')
			let firstYear = parseInt(years[0])
			console.log('*', firstYear < earliestYear, firstYear > 20 && earliestYear <= 19)
			if((firstYear < earliestYear && earliestYear <= 19) || (firstYear > 20 && earliestYear <= 19)/* also change this *&^ */) {
				earliestYear = firstYear;
			}
			

			rowDivs.push(
				<div style={{display: 'grid', gridTemplateColumns: '20% 80%', gridRowStart: i+1, gridRowEnd: i+2, gridColumnStart: 1, gridColumnEnd: 3}}>
					<div style={{gridColumnStart: 1, gridColumnEnd: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
						<p>{this.props.data.members[i].name}</p>
					</div>
					<div style={{display: 'grid', gridTemplateRows: '20% 60% 20%', gridColumnStart: 2, gridColumnEnd: 3}}>
						<div style={{gridRowStart: 2, gridRowEnd: 3, backgroundColor: 'red'}}></div>
					</div>
				</div>
			)
		}
		console.log(rowDivs)



		return (
			<div>
				<div style={{height: 50}}></div>
				<div style={{display: 'grid', gridTemplateColumns: '20% auto 20%', gridTemplateRows: piece}}>
					<div style={{display: 'grid', gridColumnStart: 2, gridColumnEnd: 3, gridRowStart: 1, gridRowEnd: rows+1, border: '1px solid black', }}>
						{rowDivs}
					</div>
				</div>
				<div style={{display: 'grid', gridTemplateColumns: '20% auto 20%', gridTemplateRows: '30px'}}>
					<div style={{gridColumnStart: 2, gridColumnEnd: 3, display: 'grid', gridTemplateColumns: '15% 10% 75%'}}>
						<div style={{gridColumnStart: 2, gridColumnEnd: 3, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
							<p>{earliestYear}</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Chart;