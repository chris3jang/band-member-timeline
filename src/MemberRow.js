import React, { Component } from 'react';

class MemberRow extends Component {

	render() {

		const { data, getEarliest, getLatest, calcTimeFrame, colors, makeGridTemplate } = this.props

		const firstYears = [], lastYears = [];
		data.timeframe.forEach((timeframe) => {
			const years = timeframe.split('-');
			firstYears.push(parseInt(years[0]))
			lastYears.push(parseInt(years[1]))
		})

		const earliestYear = getEarliest(firstYears), latestYear = getLatest(lastYears);
		const divsLength = calcTimeFrame(earliestYear, latestYear);

		const orderedDivs = [], divs = [...new Set([...firstYears, ...lastYears])];
		let index;
		while(divs.length > 0) {
			index = divs.indexOf(getEarliest(divs));
			orderedDivs.push(divs[index]);
			divs.splice(index, 1);
		}

		const divPercentages = [];
		for(let i = 0; i < orderedDivs.length - 1; i++) {
			divPercentages.push(calcTimeFrame(orderedDivs[i], orderedDivs[i+1])*100/divsLength)
		}

		const timeframes = {};
		for(let i = 0; i < data.instruments.length; i++) {
			const range = [];
			range.push(parseInt(data.timeframe[i].split('-')[0]));
			range.push(parseInt(data.timeframe[i].split('-')[1]));
			if(typeof timeframes[[data.instruments[i]]] === 'undefined') {
				timeframes[[data.instruments[i]]] = [];
			}
			timeframes[[data.instruments[i]]].push([range[0], range[1]]);
		}

		const instrumentOverlap = [];
		const addYears = (a, b) => {
			let result = a + b;
			if(result >= 100) result -= 100;
			return result;
		}
		for(let i = 0; i < divsLength; i++) {
			instrumentOverlap.push([]);
		}
		for(let i = 0; i < instrumentOverlap.length; i++) {
			for(let j = 0; j < data.instruments.length; j++) {
				for(let k = 0; k < timeframes[data.instruments[j]].length; k++) {
					for(let l = 0; l < calcTimeFrame(timeframes[data.instruments[j]][k][0], timeframes[data.instruments[j]][k][1]); l++) {
						if(addYears(timeframes[data.instruments[j]][k][0], l) === addYears(earliestYear, i)) {
							if(instrumentOverlap[i].indexOf(data.instruments[j]) === -1) {
								instrumentOverlap[i].push(data.instruments[j]);
							}
						}
					}
				}
			}
		}


		const instrumentComboOrder = instrumentOverlap.slice();
		let toCheck = instrumentComboOrder[0], unchanged, largerArrayLength;
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
		
		const row = [], rows = [], rowTemp = [], rowTemplate = [];
		let percent;
		for(let i = 0; i < instrumentComboOrder.length; i++) {
			percent = 100 / instrumentComboOrder[i].length / 2;
			for(let j = 0; j < instrumentComboOrder[i].length; j++) {
				rowTemp.unshift(percent);
				rowTemp.push(percent);
				row.unshift(
					<div className="upperHalfColor" style={{gridRowStart: instrumentComboOrder[i].length - j, gridRowEnd: instrumentComboOrder[i].length - j + 1, backgroundColor: colors[instrumentComboOrder[i][j]]}}>
					</div>
				)
				row.push(
					<div className="lowerHalfColor" style={{gridRowStart: instrumentComboOrder[i].length + j + 1, gridRowEnd:instrumentComboOrder[i].length + j + 2, backgroundColor: colors[instrumentComboOrder[i][j]]}}>
					</div>
				)
			}
			rowTemplate.push(rowTemp.slice());
			rowTemp.length = 0;
			rows.push(row.slice());
			row.length = 0;
		}
		
		const divColumns = [];
		for(let i = 0; i < instrumentComboOrder.length; i++) {
			divColumns.push(
				<div className="rowsContainer" style = {{gridColumnStart: i+1, gridColumnEnd: i+2, display: 'grid', gridTemplateRows: makeGridTemplate(rowTemplate[i])}}>
					{rows[i]}
				</div>
			);
		}

		const cP = [];
		cP.push(calcTimeFrame(this.props.earliestYear, earliestYear)*100/(calcTimeFrame(this.props.earliestYear, this.props.latestYear)));
		cP.push(divsLength*100/(calcTimeFrame(this.props.earliestYear, this.props.latestYear)));
		cP.push(calcTimeFrame(latestYear, this.props.latestYear)*100/(calcTimeFrame(this.props.earliestYear, this.props.latestYear)));

		return (
			<div className="MemberRowRoot" style={{gridColumnStart: 1, gridColumnEnd: 9, gridRowStart: 2, gridRowEnd: 3, display: 'grid', gridTemplateColumns: makeGridTemplate(cP)}}>
				<div className="divColumnsContainer" style={{
					gridColumnStart: 2, 
					gridColumnEnd: 3, 
					display: 'grid',
					gridTemplateColumns: makeGridTemplate(divPercentages)}}>
					{divColumns}
				</div>
			</div>
		)
	}
}

export default MemberRow;