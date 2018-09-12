import React, {Component, ReactNode} from 'react';
import {TMode as TFormMode} from '@library/form/Form';
import ProductGroup from '@components/settings/productGroup/ProductGroup';
import TextField from '@library/form/field/TextField';
import CrudModalForm from '@library/crud/crud1/CrudModalForm';

interface IProductGroupModalProps {
	visible: boolean;
	mode: TFormMode;
	record: ProductGroup;
	onSubmit: (mode: TFormMode, record: ProductGroup) => void;
	onCancel: () => void;
}

export default class ProductGroupModal extends Component<IProductGroupModalProps> {
	public render(): ReactNode {
		return (
			<CrudModalForm<typeof ProductGroup, ProductGroup>
				visible={this.props.visible}
				mode={this.props.mode}
				record={this.props.record}
				recordStore={ProductGroup.store}
				onSubmit={this.props.onSubmit}
				onCancel={this.props.onCancel}
				title={{
					insert: 'Новая группа товаров/услуг',
					update: 'Изменить группу товаров/услуг'
				}}
			>
				{({onFieldChange, record}) => (
					<TextField
						label='Наименование группы товаров/услуг'
						name='name'
						value={record.rawData.name}
						onChange={onFieldChange}
					/>
				)}
			</CrudModalForm>
		);
	}
}