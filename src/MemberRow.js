import React, { Component } from 'react';

class MemberRow extends Component {

	render() {

		console.log('member', this.props.data)

		const array = []

		let tf = this.props.data.timeframe[0]
		let years = tf.split('-')
		let firstYear = parseInt(years[0])
		let lastYear = parseInt(years[1])

		const firstYears = [], lastYears = [];
		this.props.data.timeframe.forEach((timeframe) => {
			const years = timeframe.split('-');
			firstYears.push(parseInt(years[0]))
			lastYears.push(parseInt(years[1]))
		})

		const earliestYear = this.props.getEarliest(firstYears);
		const latestYear = this.props.getLatest(lastYears)

		const allYears = [...firstYears, ...lastYears]
		const divs = [...new Set(allYears)];
		console.log("DIVS", divs)


		let columnPercentage = this.props.calcTimeFrame(earliestYear, latestYear)/(this.props.calcTimeFrame(this.props.earliestYear, this.props.latestYear))

		/*
		columnPercentageString += `${calcTimeFrame(earliestYear, firstYear)*100/(calcTimeFrame(earliestYear, latestYear))}%`;
		columnPercentageString += " ";
		columnPercentageString += `${columnPercentage*100}%`;
		columnPercentageString += " ";
		columnPercentageString += `${calcTimeFrame(lastYear, latestYear)*100/(calcTimeFrame(earliestYear, latestYear))}%`;

		*/

		return (
			<div style={{gridColumnStart: 1, gridColumnEnd: 9, gridRowStart: 2, gridRowEnd: 3, display: 'grid', gridTemplateColumns: this.props.columnPercentageString}}>
				<div style={{
					gridColumnStart: this.props.start, 
					gridColumnEnd: this.props.end, 
					backgroundColor: this.props.color}}>
				</div>
			</div>
		)
	}
}

export default MemberRow;