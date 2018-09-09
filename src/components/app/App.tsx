import React, {Component, ReactNode} from 'react';
import './App.scss';
import ProductGroupList from '@components/settings/product/ProductGroupList';
import Tabs, {Tab} from '@library/tab/Tabs';

export default class App extends Component {
	public render(): ReactNode {
		return (
			<div className="App">
				<Tabs bodyStyle={{padding: 10}}>
					<Tab title='Группы товаров/услуг'><ProductGroupList/></Tab>
					<Tab title='Группы товаров/услуг'><ProductGroupList/></Tab>
					<Tab title='Группы товаров/услуг'><ProductGroupList/></Tab>
				</Tabs>
			</div>
		);
	}
}