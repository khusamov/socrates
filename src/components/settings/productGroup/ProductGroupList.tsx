import React, {Component, ReactNode} from 'react';
import ProductGroup from './ProductGroup';
import ProductGroupTable from './ProductGroupTable';
import ProductGroupModal from './ProductGroupModal';
import Button from '@library/button/Button';
import Panel, {Header, Title, Content, Docked} from '@library/panel/Panel';
import {TMode as TFormMode} from '@library/form/Form';

interface IProductGroupState {
	data: ProductGroup[];
	record: ProductGroup;
	modalVisible: boolean;
	formMode: TFormMode;
}

export default class ProductGroupList extends Component<{}, IProductGroupState> {

	public state: IProductGroupState = {
		data: [],
		modalVisible: false,
		record: new ProductGroup({name: ''}),
		formMode: 'insert'
	};

	public async componentDidMount() {
		await this.loadProductGroupList();
	}

	public render(): ReactNode {
		return (
			<div className='ProductGroupList'>
				<Panel>
					<Header>
						<Title>Группы товаров/услуг</Title>
					</Header>
					<Docked style={{padding: 10}}>
						<Button onClick={this.onInsertButtonClick}>Новая запись</Button>
					</Docked>
					<Content>
						<ProductGroupTable
							data={this.state.data}
							onAction={this.onAction}
						/>
					</Content>
				</Panel>
				<ProductGroupModal
					visible={this.state.modalVisible}
					mode={this.state.formMode}
					record={this.state.record}
					onSubmit={this.onProductGroupFormSubmit}
					onCancel={this.onProductGroupFormCancel}
				/>
			</div>
		);
	}

	private onProductGroupFormSubmit = async (mode: TFormMode, productGroup: ProductGroup) => {
		if (productGroup) {
			this.setState({
				modalVisible: false
			});

			let newProductGroup: ProductGroup;
			switch (mode) {
				case 'insert':
					newProductGroup = new ProductGroup({
						name: productGroup.rawData.name
					});
					break;
				case 'update':
					newProductGroup = await ProductGroup.store.getOne(this.state.record.rawData.id as number);
					newProductGroup.rawData.name = productGroup.rawData.name;
					break;
				default:
					throw new Error(`Неизвестный режим формы ${mode}`);
			}

			await newProductGroup.save();
			await this.loadProductGroupList();
		}
	};

	private onProductGroupFormCancel = () => {
		this.setState({
			modalVisible: false
		});
	};

	private async loadProductGroupList() {
		this.setState({
			data: await ProductGroup.store.getAll()
		});
	}

	private onInsertButtonClick = () => {
		this.setState({
			modalVisible: true,
			formMode: 'insert',
			record: new ProductGroup({name: ''})
		});
	};

	private onAction = async (action: string, id: number) => {
		switch (action) {
			case 'update':
				const productGroup = await ProductGroup.store.getOne(id);
				this.setState({
					modalVisible: true,
					formMode: 'update',
					record: productGroup
				});
				break;
			case 'delete':
				await ProductGroup.store.delete(Number(id));
				await this.loadProductGroupList();
				break;
			default: throw new Error(`Не известное действие '${action}'.`);
		}
	};

}