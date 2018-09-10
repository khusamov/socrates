import React, {Component, Fragment, MouseEvent, MouseEventHandler, ReactNode, StatelessComponent} from 'react';
import ProductGroup from '@components/settings/productGroup/ProductGroup';
import {Column} from '@library/table/Table';
import Table from '@library/table/Table';

interface IProductGroupTableProps {
	data: ProductGroup[];
	onAction: (action: string, id: number) => void
}

const Anchor: StatelessComponent<{productGroup: ProductGroup, action: string, onAction: MouseEventHandler}> = (
	({productGroup, action, children, onAction}) => (
		<a
			href='#'
			data-id={productGroup.rawData.id}
			data-action={action}
			onClick={onAction}
		>
			{children}
		</a>
	)
);

export default class ProductGroupTable extends Component<IProductGroupTableProps> {

	public render(): ReactNode {
		return (
			<Table data={this.props.data}>
				<Column title='Наименование группы товаров/услуг' dataIndex='rawData.name'/>
				<Column>
					{(productGroup: ProductGroup) => (
						<Fragment>
							<Anchor onAction={this.onAction} productGroup={productGroup} action='update'>Изменить</Anchor>
							<span>&nbsp;</span>
							<Anchor onAction={this.onAction} productGroup={productGroup} action='delete'>Удалить</Anchor>
						</Fragment>
					)}
				</Column>
			</Table>
		);
	}

	private onAction = (event: MouseEvent<HTMLAnchorElement>) => {
		const anchorEl = event.target as HTMLAnchorElement;
		const action: string | null = anchorEl.getAttribute('data-action');
		if (action) {
			const id: number = Number(anchorEl.getAttribute('data-id'));
			this.props.onAction(action, id);
		} else {
			throw new Error('Нет действия.');
		}
	};

}