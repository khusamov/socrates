import React, {Component, ReactNode} from 'react';
import './App.scss';
import ProductGroupCrud from '@components/settings/productGroup/ProductGroupCrud';
import JobCategoryCrud from '@components/settings/jobCategory/JobCategoryCrud';
import Tabs, {Tab} from '@library/tab/Tabs';

export default class App extends Component {
	public render(): ReactNode {
		return (
			<div className="App">
				<Tabs bodyStyle={{padding: 10}}>
					<Tab title='Группы товаров/услуг'><ProductGroupCrud/></Tab>
					<Tab title='Категории трудозатрат'><JobCategoryCrud/></Tab>
					<Tab title='Группы товаров/услуг'><ProductGroupCrud/></Tab>
				</Tabs>
			</div>
		);
	}
}