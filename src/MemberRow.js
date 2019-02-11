import React, { Component } from 'react';

class MemberRow extends Component {

	render() {
		console.log('this.props.colors', this.props.colors);

		const firstYears = [], lastYears = [];
		this.props.data.timeframe.forEach((timeframe) => {
			const years = timeframe.split('-');
			firstYears.push(parseInt(years[0]))
			lastYears.push(parseInt(years[1]))
		})

		const earliestYear = this.props.getEarliest(firstYears);
		const latestYear = this.props.getLatest(lastYears)

		const divs = [...new Set([...firstYears, ...lastYears])];
		const orderedDivs = [];

		let index;
		while(divs.length > 0) {
			index = divs.indexOf(this.props.getEarliest(divs));
			orderedDivs.push(divs[index]);
			divs.splice(index, 1);
		}

		const divsLength = this.props.calcTimeFrame(earliestYear, latestYear)
		const divPercentages = []
		for(let i = 0; i < orderedDivs.length - 1; i++) {
			divPercentages.push(this.props.calcTimeFrame(orderedDivs[i], orderedDivs[i+1])*100/divsLength)
		}
		console.log('divPercentages', divPercentages)

		const timeframes = {};
		for(let i = 0; i < this.props.data.instruments.length; i++) {
			const range = this.props.data.timeframe[i].split('-');
			timeframes[[this.props.data.instruments[i]]] = [parseInt(range[0]), parseInt(range[1])]
		}

		const instrumentOverlap = [];
		for(let i = 0; i < this.props.calcTimeFrame(earliestYear, latestYear); i++) {
			instrumentOverlap.push([]);
		}

		for(let i = 0; i < instrumentOverlap.length; i++) {
			console.log('i', i)
			for(let j = 0; j < this.props.data.instruments.length; j++) {
				for(let k = 0; k < this.props.calcTimeFrame(timeframes[this.props.data.instruments[j]][0], timeframes[this.props.data.instruments[j]][1]); k++) {
					console.log('k', k)
					console.log('timeframes[this.props.data.instruments[j]][0]', timeframes[this.props.data.instruments[j]][0])
					if(timeframes[this.props.data.instruments[j]][0] + k === earliestYear + i) instrumentOverlap[i].push(this.props.data.instruments[j]);
				}
			}
		}
		//earliestYear + i needs to be replaced with something that returns 05 when earliestYear = 96 and i=9

		console.log('instrumentOverlap', instrumentOverlap);

		//97-11 92-17 05-08

		

		const divTemplate = [];
		let unchanged;
		let unchangedCount = 1;
		let toCheck = instrumentOverlap[0]
		let largerArrayLength;
		/*
		for(let i = 0; i < instrumentOverlap.length - 1; i++) {
			console.log('i', i, 'toCheck', toCheck)
			unchanged = true;
			largerArrayLength = (toCheck.length > instrumentOverlap[i+1].length) ? toCheck.length : instrumentOverlap[i+1].length
			for(let j = 0; j < largerArrayLength; j++) {
				console.log('i+1', i+1, 'j', j, toCheck[j], instrumentOverlap[i+1][j])
				if(toCheck[j] !== instrumentOverlap[i+1][j]) {
					console.log('***', j, unchangedCount)
					divTemplate.push([100*unchangedCount/this.props.calcTimeFrame(earliestYear, latestYear)]);
					unchanged = false;
					unchangedCount = 1;
					break;
				}
			}
			if(unchanged) {
				console.log('unchanged i', i)
				unchangedCount++;
			}
			if(i+1 == instrumentOverlap.length - 1) {
				console.log("exit condition")
				divTemplate.push([100*unchangedCount/this.props.calcTimeFrame(earliestYear, latestYear)])
			}
			toCheck = instrumentOverlap[i+1];
		}
		*/

		const instrumentComboOrder = instrumentOverlap.slice();
		toCheck = instrumentComboOrder[0];

		for(let i = 0; i < instrumentComboOrder.length - 1; i++) {
			unchanged = true;
			largerArrayLength = (toCheck.length > instrumentComboOrder[i+1].length) ? toCheck.length : instrumentComboOrder[i+1].length
			for(let j = 0; j < largerArrayLength; j++) {
				if(toCheck[j] !== instrumentComboOrder[i+1][j]) {
					unchanged = false;
					break;
				}
			}
			if(unchanged) {
				instrumentComboOrder.splice(i+1, 1);
				i--;
			}
			toCheck = instrumentComboOrder[i+1];
		}
		console.log('instrumentComboOrder', instrumentComboOrder)
		const divRows = [];
		const row = [], rows = [];
		const rowTemp = [], rowTemplate = [];
		let percent, key;

		for(let i = 0; i < instrumentComboOrder.length; i++) {
			for(let j = 0; j < instrumentComboOrder[i].length; j++) {
				percent = 100 / instrumentComboOrder[i].length / 2;
				rowTemp.unshift(percent);
				rowTemp.push(percent);
				key = instrumentComboOrder[i][j];
				console.log("key", key)
				console.log("SDAFKJD;D", this.props.colors, instrumentComboOrder[i][j])
				console.log('shouldbecolor', this.props.colors[key])
				row.unshift(
					<div style={{gridRowStart: j+1, gridRowEnd: j+2, backgroundColor: this.props.colors[instrumentComboOrder[i][j]]}}>
					</div>
				)
				row.push(
					<div style={{gridRowStart: instrumentComboOrder[i].length * 2 - j, gridRowEnd:instrumentComboOrder[i].length * 2 + 1 - j, backgroundColor: this.props.colors[instrumentComboOrder[i][j]]}}>
					</div>
				)
			}
			rowTemplate.push(rowTemp.slice());
			rowTemp.length = 0;
			rows.push(row.slice());
			row.length = 0;
		}
		console.log('row', rows)
		console.log("ROWTEMP", rowTemplate)
		
		const divColumns = [];
		for(let i = 0; i < instrumentComboOrder.length; i++) {
			divColumns.push(
				<div style = {{gridColumnStart: i+1, gridColumnEnd: i+2, display: 'grid', gridTemplateRows: this.props.makeGridTemplate(rowTemplate[i])}}>
					{rows[i]}
				</div>
			);
		}


		/*
		for(let i = 1; i < this.props.data.instruments.length; i++) {
			console.log(i)

			let start = timeframes[this.props.data.instruments[i]][0];
			let end = timeframes[this.props.data.instruments[i]][1];
			for(let j = start; j < end; j++) {

			}
			this.props.data.instruments[i]

			if(i === this.props.data.instruments[ind+1][0]) {
				//timeframes[[this.props.data.instruments[ind], this.props.data.instruments]]
			}
		}

		timeframes[this.props.data.instruments[0]][1] - timeframes[this.props.data.instruments[0]][0]
		*/

		let columnPercentage = this.props.calcTimeFrame(earliestYear, latestYear)/(this.props.calcTimeFrame(this.props.earliestYear, this.props.latestYear))

		return (
			<div style={{gridColumnStart: 1, gridColumnEnd: 9, gridRowStart: 2, gridRowEnd: 3, display: 'grid', gridTemplateColumns: this.props.columnPercentageString}}>
				<div style={{
					gridColumnStart: this.props.start, 
					gridColumnEnd: this.props.end, 
					display: 'grid',
					gridTemplateColumns: this.props.makeGridTemplate(divPercentages)}}>
					{divColumns}
				</div>
			</div>
		)
	}
}

export default MemberRow;