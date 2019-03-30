import React, { Component } from 'react';

class YearScale extends Component {

	render() {

		const ticks = [];
		let tickLength;
		for(let i = 1; i < 10; i++) {
			tickLength = ((i === 1 || i === 9) ? (3) : (2));
			ticks.push(<div style={{gridColumnStart: i, gridColumnEnd: i+1, gridRowStart: 1, gridRowEnd: tickLength, borderLeft: 'thick solid black'}}></div>);
		}

		return (
			<div className='yearScale' style={{gridColumnStart: 2, gridColumnEnd: 3, display: 'grid', gridTemplateColumns: '15% 5% 5% 65% 5% 5%', gridTemplateRows: '100%'}}>
				<div style={{gridColumnStart: 3, gridColumnEnd: 6, gridRowStart: 1, gridRowEnd: 2, display: 'grid', gridTemplateRows: '50% 25% 25%', gridTemplateColumns: '12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5%'}}>
					{ticks}
				</div>
				<div style={{gridColumnStart: 2, gridColumnEnd: 4, gridRowStart: 2, gridRowEnd: 3, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<p>{this.props.earliestYear}</p>
				</div>
				<div style={{gridColumnStart: 5, gridColumnEnd: 7, gridRowStart: 2, gridRowEnd: 3}}>
					<p>{this.props.latestYear}</p>
				</div>
			</div>
		)
	}
}

export default YearScale;