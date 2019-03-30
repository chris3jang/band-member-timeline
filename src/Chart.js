import React, { Component } from 'react';
import MemberRow from './MemberRow';
import YearScale from './YearScale';

class Chart extends Component {

	render() {

		const makeGridTemplate = (params) => {
			let result = "";
			for(let i = 0; i < params.length; i++) {
				result += params[i].toString();
				result += "%";
				if(i != params.length - 1) result+= " ";
			}
			return result;
		}

		const calcTimeFrame = (first, last) => {
			if((first > 19 && last > 19)||(first <= 19 && last <= 19)) return last - first;
			else return 100 - first + last;
		}

		const getEarliest = (years) => {
			let earliestYear = 19;
			years.forEach(year => {
				if((year < earliestYear && ((year <= 19 && earliestYear <= 19) || (year >= 20 && earliestYear >= 20))) || (year >= 20 && earliestYear <= 19)) earliestYear = year;
			})
			return earliestYear;
		}
		
		const getLatest = (years) => {
			let latestYear = 20;
			years.forEach(year => {
				if((year > latestYear && ((year <= 19 && latestYear <= 19) || (year >= 20 && latestYear >= 20)))|| (year <= 19 && latestYear >= 20)) latestYear = year;
			})
			return latestYear;
		}

		const numMembers = this.props.data.members.length;
		const adjustedHeight = (numMembers > 8) ? (400 + (numMembers - 8) * 50) : 400;
		const gTR = adjustedHeight/(numMembers+2);
		let piece = "";
		for(let i = 0; i < (numMembers+2); i++) {
			piece+=`${gTR}px`;
			if(i != numMembers + 1) piece+=" ";
		}

		const rowDivs = [], allInstruments = [], colors = ['#4e79a7', '#59a14f', '#e15759', '#edc948', '#f28e2b', '#b07aa1', '#ff9da7', '#76b7b2', '#9c755f', '#bab0ac'];
		for(let i = 0; i < numMembers; i++) {
			this.props.data.members[i].instruments.forEach(instrument=> {
				if(!allInstruments.includes(instrument)) allInstruments.push(instrument);
			})
		}

		const instrumentColorTuples = [], instrColorArray = [];
		for(let i = 0; i < allInstruments.length; i++) {
			instrumentColorTuples[allInstruments[i]] = colors[i];
			instrColorArray.push(
				<div style={{display: 'inline-block'}}>
					<div style={{display: 'inline-block', height: 10, width: 10, backgroundColor: colors[i], marginRight: 10}}></div>
					<p style={{display: 'inline-block', marginLeft: 10}}>{allInstruments[i]}</p>
				</div>
			)
		}
		rowDivs.push(
			<div style={{gridRowStart: 1, gridRowEnd: 2, gridColumnStart: 1, gridColumnEnd: 3, display: 'flex', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', }}>
				<p style={{fontSize: '200%', margin: '0px'}}>{this.props.data.bandName}</p>
			</div>
		)
		rowDivs.push(
			<div style={{gridRowStart: 2, gridRowEnd: 3, gridColumnStart: 1, gridColumnEnd: 3, display: 'flex', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', }}>
				{instrColorArray}
			</div>
		)

		const firstYears = [], lastYears = [];
		let earliestYear = 19, latestYear = 20, years, member;
		for(let i = 0; i < numMembers; i++) {
			member = this.props.data.members[i];
			member.timeframe.forEach((timeframe) => {
				years = timeframe.split('-');
				firstYears.push(parseInt(years[0]))
				lastYears.push(parseInt(years[1]))
			})
		}
		earliestYear = getEarliest(firstYears);
		latestYear = getLatest(lastYears)

		for(let i = 0; i < numMembers; i++) {
			let member = this.props.data.members[i];
			let tf = member.timeframe[0];
			let years = tf.split('-');
			const firstYear = parseInt(years[0]), lastYear = parseInt(years[1]);
			let columnPercentage = calcTimeFrame(firstYear, lastYear)/(calcTimeFrame(earliestYear, latestYear))
			let columnPercentageString = "", start, end;
			if(firstYear === earliestYear && lastYear === latestYear) {
				columnPercentageString += '100%';
			}
			else if(firstYear === earliestYear) {
				columnPercentageString += `${columnPercentage*100}` + '%';
				columnPercentageString += " ";
				columnPercentageString += `${(100 - (columnPercentage*100))}` + '%'
				start = 1;
				end = 2;
			}
			else if(lastYear === latestYear) {
				columnPercentageString += `${(100 - (columnPercentage*100))}%`
				columnPercentageString += " ";
				columnPercentageString += `${columnPercentage*100}%`;
				start = 2;
				end = 3;
			}
			else {
				columnPercentageString += `${calcTimeFrame(earliestYear, firstYear)*100/(calcTimeFrame(earliestYear, latestYear))}%`;
				columnPercentageString += " ";
				columnPercentageString += `${columnPercentage*100}%`;
				columnPercentageString += " ";
				columnPercentageString += `${calcTimeFrame(lastYear, latestYear)*100/(calcTimeFrame(earliestYear, latestYear))}%`;
				start = 2;
				end = 3;
			}

			const memberColors = {};
			for(let j = 0; j < this.props.data.members[i].instruments.length; j++) {
				memberColors[this.props.data.members[i].instruments[j]] = instrumentColorTuples[this.props.data.members[i].instruments[j]]
			}

			rowDivs.push(
				<MemberRow 
					data={this.props.data.members[i]} 
					earliestYear={earliestYear} latestYear={latestYear}
					colors={memberColors} 
					calcTimeFrame={calcTimeFrame} makeGridTemplate={makeGridTemplate}
					getEarliest={getEarliest} getLatest={getLatest}
					memberNum={i}
				/>
			)
		}

		return (
			<div>
				<div style={{height: 60}}></div>
				<div style={{display: 'grid', gridTemplateColumns: '20% auto 20%', gridTemplateRows: adjustedHeight}}>
					<div className="chartBorder" style={{display: 'grid', gridColumnStart: 2, gridColumnEnd: 3, gridRowStart: 1, gridRowEnd: numMembers+3, border: '1px solid black', borderRadius: 20, gridTemplateRows: piece}}>
						{rowDivs}
					</div>
				</div>
				<div style={{display: 'grid', gridTemplateColumns: '20% auto 20%', gridTemplateRows: '30px 50px'}}>
					<YearScale
						earliestYear={earliestYear}
						latestYear={latestYear}>
					</YearScale>
				</div>
			</div>
		)
	}
}

export default Chart;