import React, {Component, ReactNode} from 'react';
import ProductGroup from './ProductGroup';
import ProductGroupTable from './ProductGroupTable';
import ProductGroupModal from './ProductGroupModal';
import Crud from '@library/crud/crud1/Crud';

export default class ProductGroupCrud extends Component {
	public render(): ReactNode {
		return (
			<Crud<typeof ProductGroup, ProductGroup>
				title='Группы товаров/услуг'
				recordStore={ProductGroup.store}
				RecordConstructor={ProductGroup}
				RecordModal={ProductGroupModal}
				RecordTable={ProductGroupTable}
			/>
		);
	}
}