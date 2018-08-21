import React from 'react';
import './App.css';
import ProductGroupList from '../product/ProductGroupList';

export default class App extends React.Component {
	public render() {
		return (
			<div className="App">
				<ProductGroupList/>
			</div>
		);
	}
}