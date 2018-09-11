import React, {Component, ReactNode} from 'react';
import ProductGroup from '@components/settings/productGroup/ProductGroup';
import {Column} from '@library/table/Table';

import CrudTable from '@library/crud/crud1/CrudTable';

interface IProductGroupTableProps {
	data: ProductGroup[];
	onAction: (action: string, id: number) => void
}

export default class ProductGroupTable extends Component<IProductGroupTableProps> {
	public render(): ReactNode {
		return (
			<CrudTable data={this.props.data} onAction={this.props.onAction}>
				<Column title='Наименование группы товаров/услуг' dataIndex='rawData.name'/>
			</CrudTable>
		);
	}
}