import React, {Component, MouseEvent, RefObject, Fragment, ReactNode} from 'react';
import Modal from '../../library/modal/Modal';
import ProductGroupForm from './ProductGroupForm';
import './ProductGroupList.scss';
import ProductGroup from './ProductGroup';
import Table, {Column} from '@library/table/Table';
import Button from '@library/button/Button';
import Panel, {Title, Content, Docked} from '@library/panel/Panel';

interface IProductGroupState {
	productGroupList: ProductGroup[];
	productGroupFormData: ProductGroup;
	modalVisible: boolean;
}

export default class ProductGroupList extends Component<{}, IProductGroupState> {

	public state: IProductGroupState = {
		productGroupList: [],
		modalVisible: false,
		productGroupFormData: new ProductGroup({name: ''})
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
				<Column title='Наименование группы товаров/услуг' dataIndex='data.name'/>
				<Column>
					{(productGroup: ProductGroup) => (
						<Fragment>
							<a href='#' data-id={productGroup.data.id} onClick={this.onUpdateButtonClick}>Изменить</a>
							<span>&nbsp;</span>
							<a href='#' data-id={productGroup.data.id} onClick={this.onDeleteButtonClick}>Удалить</a>
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
					productGroup={this.state.productGroupFormData}
					onSubmit={this.ProductGroupFormSubmit}
					onCancel={this.ProductGroupFormCancel}
				/>
			</Modal>
		);
	}

	private ProductGroupFormSubmit = async () => {
		this.setState({
			modalVisible: false
		});
		if (this.productGroupFormRef.current) {
			const productGroup = new ProductGroup({
				name: this.productGroupFormRef.current.state.productGroup.data.name
			});
			await productGroup.save();
			await this.loadProductGroupList();
		}
	};

	private ProductGroupFormCancel = () => {
		this.setState({
			modalVisible: false
		});
	};

	private async loadProductGroupList() {
		this.setState({
			productGroupList: await ProductGroup.getAll()
		});
	}

	private onInsertButtonClick = () => {
		this.setState({
			modalVisible: true,
			productGroupFormData: new ProductGroup({name: ''})
		});
	};

	private onUpdateButtonClick = async (event: MouseEvent<HTMLAnchorElement>) => {
		const id: number = Number((event.target as HTMLAnchorElement).getAttribute('data-id'));
		const productGroup = await ProductGroup.load(id);
		this.setState({
			modalVisible: true,
			productGroupFormData: productGroup
		});
	};

	private onDeleteButtonClick = async (event: MouseEvent<HTMLAnchorElement>) => {
		const id = (event.target as HTMLAnchorElement).getAttribute('data-id');
		if (id) {
			await ProductGroup.delete(Number(id));
		}
		await this.loadProductGroupList();
	};

}