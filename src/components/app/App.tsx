import React from 'react';
import './App.scss';
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