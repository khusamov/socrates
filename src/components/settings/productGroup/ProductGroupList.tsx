import React, {Component, MouseEvent, Fragment, ReactNode} from 'react';
import './ProductGroupList.scss';
import ProductGroup from './ProductGroup';
// import {TMode as TProductGroupFormMode} from './ProductGroupForm';
import Modal from '@library/modal/Modal';
import Table, {Column} from '@library/table/Table';
import Button from '@library/button/Button';
import Panel, {Header, Title, Content, Docked} from '@library/panel/Panel';
import Form, { TMode as TFormMode} from '@library/form/Form';
import TextField from '@library/form/field/TextField';

interface IProductGroupState {
	productGroupList: ProductGroup[];
	productGroupFormData: ProductGroup;
	modalVisible: boolean;
	productGroupFormMode: TFormMode;
}

export default class ProductGroupList extends Component<{}, IProductGroupState> {

	public state: IProductGroupState = {
		productGroupList: [],
		modalVisible: false,
		productGroupFormData: new ProductGroup({name: ''}),
		productGroupFormMode: 'insert'
	};

	// private readonly productGroupFormRef: RefObject<ProductGroupForm>;
	// private readonly productGroupFormRef: RefObject<Form<ProductGroup>>;

	constructor(props: {}) {
		super(props);
		// this.productGroupFormRef = React.createRef();
	}

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
				{/*<ProductGroupForm*/}
					{/*ref={this.productGroupFormRef}*/}
					{/*mode={this.state.productGroupFormMode}*/}
					{/*productGroup={this.state.productGroupFormData}*/}
					{/*onSubmit={this.ProductGroupFormSubmit}*/}
					{/*onCancel={this.ProductGroupFormCancel}*/}
				{/*/>*/}

				<Form<typeof ProductGroup, ProductGroup>
					// ref={this.productGroupFormRef}
					mode={this.state.productGroupFormMode}
					record={this.state.productGroupFormData}
					recordStore={ProductGroup.store}
					onSubmit={this.ProductGroupFormSubmit}
					onCancel={this.ProductGroupFormCancel}
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
				</Form>

			</Modal>
		);
	}

	private ProductGroupFormSubmit = async (mode: TFormMode, productGroup: ProductGroup) => {
		// const productGroupForm: ProductGroupForm | null = this.productGroupFormRef.current;
		// if (productGroupForm) {
			// const productGroup = productGroupForm.state.productGroup;
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
						newProductGroup = await ProductGroup.store.getOne(this.state.productGroupFormData.rawData.id as number);
						newProductGroup.rawData.name = productGroup.rawData.name;
						break;
					default:
						throw new Error(`Неизвестный режим формы ${mode}`);
				}

				await newProductGroup.save();
				await this.loadProductGroupList();
			}
		// }
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