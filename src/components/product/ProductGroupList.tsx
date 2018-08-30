import React, {Component, MouseEvent, RefObject} from 'react';
import Modal from '../modal/Modal';
import ProductGroupForm from './ProductGroupForm';
import './ProductGroupList.scss';
import ProductGroup from './ProductGroup';

interface IProductGroupState {
	productGroupList: ProductGroup[];
	modalVisible: boolean;
	productGroupFormData: ProductGroup;
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

	public render() {
		return (
			<div className='ProductGroupList'>
				<button onClick={this.onInsertButtonClick}>Новая запись</button>
				{
					!!this.state.productGroupList.length && (
						<table>
							<thead>
								<tr>
									<th>Наименование группы товаров/услуг</th>
									<th/>
								</tr>
							</thead>
							<tbody>
								{
									this.state.productGroupList.map(
										(productGroupItem, index) => (
											<tr key={index}>
												<td>{productGroupItem.data.name}</td>
												<td>
													<a href='#' data-id={productGroupItem.data.id} onClick={this.onUpdateButtonClick}>Изменить</a>
													<span>&nbsp;</span>
													<a href='#' data-id={productGroupItem.data.id} onClick={this.onDeleteButtonClick}>Удалить</a>
												</td>
											</tr>
										)
									)
								}
							</tbody>
						</table>
					)
				}
				<Modal visible={this.state.modalVisible}>
					<div style={{padding: 20}}>
						<h3>Новая группа товаров/услуг</h3>
						<ProductGroupForm ref={this.productGroupFormRef} productGroup={this.state.productGroupFormData}/>
						<button onClick={this.onSubmitButtonClick}>Создать</button>
						<button onClick={this.onCancelButtonClick}>Закрыть</button>
					</div>
				</Modal>
			</div>
		);
	}

	private async loadProductGroupList() {
		this.setState({
			productGroupList: await ProductGroup.getAll()
		});
	}

	private onInsertButtonClick = (event: MouseEvent) => {
		this.setState({
			modalVisible: true,
			productGroupFormData: new ProductGroup({name: ''})
		});
	};

	private onCancelButtonClick = (event: MouseEvent) => {
		this.setState({
			modalVisible: false
		});
	};

	private onSubmitButtonClick = async (event: MouseEvent) => {
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