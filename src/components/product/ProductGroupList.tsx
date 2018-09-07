import React, {Component, MouseEvent, RefObject, Fragment, ReactNode} from 'react';
import './ProductGroupList.scss';
import Modal from '../../library/modal/Modal';
import ProductGroupForm, {TMode as TProductGroupFormMode} from './ProductGroupForm';
// import IProductGroup from './IProductGroup';
import Table, {Column} from '@library/table/Table';
import Button from '@library/button/Button';
import Panel, {Title, Content, Docked} from '@library/panel/Panel';
// import Resource from '@library/rest/resource/Resource';
// import RestProxy from '@library/rest/RestProxy';

import ProductGroup from './ProductGroup';
// import ProductGroupStore from './ProductGroupStore';







interface IProductGroupState {
	productGroupList: ProductGroup[];
	productGroupFormData: ProductGroup;
	modalVisible: boolean;
	productGroupFormMode: TProductGroupFormMode;
}

export default class ProductGroupList extends Component<{}, IProductGroupState> {

	public state: IProductGroupState = {
		productGroupList: [],
		modalVisible: false,
		productGroupFormData: new ProductGroup({name: ''}),
		productGroupFormMode: 'insert'
	};

	private readonly productGroupFormRef: RefObject<ProductGroupForm>;

	constructor(props: {}) {
		super(props);
		this.productGroupFormRef = React.createRef();
	}

	public async componentDidMount() {
		await this.loadProductGroupList();
	}

	public render(): ReactNode {
		return (
			<div className='ProductGroupList'>
				<Panel>
					<Title>Группы товаров/услуг</Title>
					<Docked style={{padding: 10}}>
						<Button onClick={this.onInsertButtonClick}>Новая запись</Button>
					</Docked>
					<Content>
						{this.renderTable()}
					</Content>
				</Panel>
				{this.renderModal()}
			</div>
		);
	}

	private renderTable(): ReactNode {
		return (
			<Table data={this.state.productGroupList}>
				<Column title='Наименование группы товаров/услуг' dataIndex='rawData.name'/>
				<Column>
					{(productGroup: ProductGroup) => (
						<Fragment>
							<a href='#' data-id={productGroup.rawData.id} onClick={this.onUpdateButtonClick}>Изменить</a>
							<span>&nbsp;</span>
							<a href='#' data-id={productGroup.rawData.id} onClick={this.onDeleteButtonClick}>Удалить</a>
						</Fragment>
					)}
				</Column>
			</Table>
		);
	}

	private renderModal(): ReactNode {
		return (
			<Modal visible={this.state.modalVisible}>
				<ProductGroupForm
					ref={this.productGroupFormRef}
					mode={this.state.productGroupFormMode}
					productGroup={this.state.productGroupFormData}
					onSubmit={this.ProductGroupFormSubmit}
					onCancel={this.ProductGroupFormCancel}
				/>
			</Modal>
		);
	}

	private ProductGroupFormSubmit = async () => {
		const productGroupForm: ProductGroupForm | null = this.productGroupFormRef.current;
		if (productGroupForm) {
			const productGroup = productGroupForm.state.productGroup;
			if (productGroup) {
				this.setState({
					modalVisible: false
				});

				let newProductGroup: ProductGroup;
				switch (productGroupForm.props.mode) {
					case 'insert':
						newProductGroup = new ProductGroup({
							name: productGroup.rawData.name
						});
						break;
					case 'update':
						newProductGroup = await ProductGroup.store.getOne(this.state.productGroupFormData.rawData.id as number);
						newProductGroup.rawData.name = productGroup.rawData.name;
						break;
					default:
						throw new Error(`Неизвестный режим формы ${productGroupForm.props.mode}`);
				}

				await newProductGroup.save();
				await this.loadProductGroupList();
			}
		}
	};

	private ProductGroupFormCancel = () => {
		this.setState({
			modalVisible: false
		});
	};

	private async loadProductGroupList() {
		this.setState({
			productGroupList: await ProductGroup.store.getAll()
		});
	}

	private onInsertButtonClick = () => {
		this.setState({
			modalVisible: true,
			productGroupFormMode: 'insert',
			productGroupFormData: new ProductGroup({name: ''})
		});
	};

	private onUpdateButtonClick = async (event: MouseEvent<HTMLAnchorElement>) => {
		const id: number = Number((event.target as HTMLAnchorElement).getAttribute('data-id'));
		const productGroup = await ProductGroup.store.getOne(id);
		this.setState({
			modalVisible: true,
			productGroupFormMode: 'update',
			productGroupFormData: productGroup
		});
	};

	private onDeleteButtonClick = async (event: MouseEvent<HTMLAnchorElement>) => {
		const id = (event.target as HTMLAnchorElement).getAttribute('data-id');
		if (id) {
			await ProductGroup.store.delete(Number(id));
		}
		await this.loadProductGroupList();
	};

}