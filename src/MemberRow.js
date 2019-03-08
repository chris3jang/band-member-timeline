import React, { Component } from 'react';

class MemberRow extends Component {

	render() {
		console.log('this.props.colors', this.props.colors);

		const addYears = (a, b) => {
			let result = a + b;
			if(result >= 100) result -= 100;
			return result;
		}

		const firstYears = [], lastYears = [];
		this.props.data.timeframe.forEach((timeframe) => {
			const years = timeframe.split('-');
			firstYears.push(parseInt(years[0]))
			lastYears.push(parseInt(years[1]))
		})

		const earliestYear = this.props.getEarliest(firstYears);
		const latestYear = this.props.getLatest(lastYears)
		console.log('earliestYear', earliestYear)
		console.log('latestYear', latestYear)

		const divs = [...new Set([...firstYears, ...lastYears])];
		const orderedDivs = [];

		let index;
		while(divs.length > 0) {
			index = divs.indexOf(this.props.getEarliest(divs));
			orderedDivs.push(divs[index]);
			divs.splice(index, 1);
		}

		console.log('orderedDivs', orderedDivs)

		const divsLength = this.props.calcTimeFrame(earliestYear, latestYear)
		const divPercentages = []
		for(let i = 0; i < orderedDivs.length - 1; i++) {
			divPercentages.push(this.props.calcTimeFrame(orderedDivs[i], orderedDivs[i+1])*100/divsLength)
		}
		console.log('divPercentages', divPercentages)

		const timeframes = {};
		let totalInstrNum = 0;



		for(let i = 0; i < this.props.data.instruments.length; i++) {
			const range = [];
			range.push(parseInt(this.props.data.timeframe[i].split('-')[0]));
			range.push(parseInt(this.props.data.timeframe[i].split('-')[1]));
			/*
			if(timeframes[[this.props.data.instruments[i]]]) {
				const prevEarliest = timeframes[[this.props.data.instruments[i]]][0];
				const prevLatest = timeframes[[this.props.data.instruments[i]]][1];
			}
			const currEarliest = this.props.getEarliest([prevEarliest, parseInt(range[0])])
			const currLatest = this.props.getLatest([prevLatest, parseInt(range[1])])
			*/

			if(typeof timeframes[[this.props.data.instruments[i]]] === 'undefined') {
				timeframes[[this.props.data.instruments[i]]] = [];
			}
			timeframes[[this.props.data.instruments[i]]].push([range[0], range[1]]);
		}


		console.log('timeframes', timeframes)

		const instrumentOverlap = [];
		for(let i = 0; i < this.props.calcTimeFrame(earliestYear, latestYear); i++) {
			instrumentOverlap.push([]);
		}



		for(let i = 0; i < instrumentOverlap.length; i++) {
			console.log('i', i)
			for(let j = 0; j < this.props.data.instruments.length; j++) {
				console.log('j', j)
				//for(let k = 0; k < this.props.calcTimeFrame(timeframes[this.props.data.instruments[j]][0], timeframes[this.props.data.instruments[j]][1]); k++) {
					
				for(let k = 0; k < timeframes[this.props.data.instruments[j]].length; k++) {

					for(let l = 0; l < this.props.calcTimeFrame(timeframes[this.props.data.instruments[j]][k][0], timeframes[this.props.data.instruments[j]][k][1]); l++) {
						
						if(addYears(timeframes[this.props.data.instruments[j]][k][0], l) === addYears(earliestYear, i)) {
							if(instrumentOverlap[i].indexOf(this.props.data.instruments[j]) === -1) {
								instrumentOverlap[i].push(this.props.data.instruments[j]);
							}
						}
						/*
						if(addYears(timeframes[this.props.data.instruments[j]][0], k) === addYears(earliestYear, i)) {
							if(instrumentOverlap[i].indexOf(this.props.data.instruments[j]) === -1) {
								instrumentOverlap[i].push(this.props.data.instruments[j]);
							}
						}
						*/

					}
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
		let percent;

		for(let i = 0; i < instrumentComboOrder.length; i++) {
			percent = 100 / instrumentComboOrder[i].length / 2;
			for(let j = 0; j < instrumentComboOrder[i].length; j++) {
				rowTemp.unshift(percent);
				rowTemp.push(percent);
				row.unshift(
					<div className="upperHalfColor" style={{gridRowStart: instrumentComboOrder[i].length - j, gridRowEnd: instrumentComboOrder[i].length - j + 1, backgroundColor: this.props.colors[instrumentComboOrder[i][j]]}}>
					</div>
				)
				row.push(
					<div className="lowerHalfColor" style={{gridRowStart: instrumentComboOrder[i].length + j + 1, gridRowEnd:instrumentComboOrder[i].length + j + 2, backgroundColor: this.props.colors[instrumentComboOrder[i][j]]}}>
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
			console.log('divColumns i', i, this.props.makeGridTemplate(rowTemplate[i]), rows[i])
			divColumns.push(
				<div className="rowsContainer" style = {{gridColumnStart: i+1, gridColumnEnd: i+2, display: 'grid', gridTemplateRows: this.props.makeGridTemplate(rowTemplate[i])}}>
					{rows[i]}
				</div>
			);
		}

		console.log('divColumns', divColumns)

		console.log('789', earliestYear, latestYear, this.props.earliestYear, this.props.latestYear)

		let columnPercentageLeft = this.props.calcTimeFrame(this.props.earliestYear, earliestYear)*100/(this.props.calcTimeFrame(this.props.earliestYear, this.props.latestYear))
		let columnPercentage = this.props.calcTimeFrame(earliestYear, latestYear)*100/(this.props.calcTimeFrame(this.props.earliestYear, this.props.latestYear))
		let columnPercentageRight = this.props.calcTimeFrame(latestYear, this.props.latestYear)*100/(this.props.calcTimeFrame(this.props.earliestYear, this.props.latestYear))

		const cP = []
		cP.push(columnPercentageLeft)
		cP.push(columnPercentage)
		cP.push(columnPercentageRight)

		console.log('SDKLFJLKD', this.props.makeGridTemplate(cP))

		return (
			<div className="MemberRowRoot" style={{gridColumnStart: 1, gridColumnEnd: 9, gridRowStart: 2, gridRowEnd: 3, display: 'grid', gridTemplateColumns: this.props.makeGridTemplate(cP)}}>
				<div className="divColumnsContainer" style={{
					gridColumnStart: 2, 
					gridColumnEnd: 3, 
					display: 'grid',
					gridTemplateColumns: this.props.makeGridTemplate(divPercentages)}}>
					{divColumns}
				</div>
			</div>
		)
	}
}

export default MemberRow;