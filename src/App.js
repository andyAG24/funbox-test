import React, { Component } from 'react';
import './App.scss';
import Item from './components/item';
import fakedata from './fakedata.json';

class App extends Component {

	renderItems() {
		let items = fakedata.items;
		return (
			<React.Fragment>
				{items.map((elem) => (
					<Item 
						name={elem.name}
						filling={elem.filling}
						quantity={elem.quantity}
						gift={elem.gift}
						weight={elem.weight}
						additionalData={elem.additionalData && elem.additionalData}
						available={elem.available}
					/>
				))}
			</React.Fragment>
		)
	}

	render() {
		return (
			<React.Fragment>
				<span className="question">Ты сегодня покормил кота?</span>
				<div className='items'>
					{this.renderItems()}
				</div> 
			</React.Fragment>
		);
	}
}

export default App;
