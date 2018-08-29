import React, {Component, MouseEvent, RefObject} from 'react';
import Modal from '../modal/Modal';
import ProductGroupForm, {IProductGroupFormData} from './ProductGroupForm';
import './ProductGroupList.scss';

const {
	REACT_APP_API_HOST: API_HOST,
	REACT_APP_API_PORT: API_PORT
} = process.env;

interface IProductGroupState {
	productGroupList: any[];
	modalVisible: boolean;
	productGroupFormData: IProductGroupFormData;
}

export default class ProductGroupList extends Component<{}, IProductGroupState> {
	/**
	 * Вычисление полного URL сервиса.
	 * @param {string} path
	 * @returns {string}
	 */
	private static getApiUrl(path: string): string {
		const serverAddress: string = [API_HOST, API_PORT].filter(s => s).join(':');
		return (
			serverAddress
				? `http://${serverAddress}/${path}`
				: `/${path}`
		);
	}

	public state: IProductGroupState = {
		productGroupList: [],
		modalVisible: false,
		productGroupFormData: {}
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
												<td>{productGroupItem.Name}</td>
												<td>
													<a href='#' data-id={productGroupItem.ID} onClick={this.onUpdateButtonClick}>Изменить</a>
													<span>&nbsp;</span>
													<a href='#' data-id={productGroupItem.ID} onClick={this.onDeleteButtonClick}>Удалить</a>
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
						<ProductGroupForm ref={this.productGroupFormRef} data={this.state.productGroupFormData}/>
						<button onClick={this.onSubmitButtonClick}>Создать</button>
						<button onClick={this.onCancelButtonClick}>Закрыть</button>
					</div>
				</Modal>
			</div>
		);
	}
	private async loadProductGroupList() {
		const response = await fetch(ProductGroupList.getApiUrl('ProductGroup'), {
			method: 'get'
		});

		const data = response.status === 204 ? [] : await response.json();

		this.setState({
			productGroupList: data
		});
	}
	private onInsertButtonClick = (event: MouseEvent) => {
		this.setState({
			modalVisible: true,
			productGroupFormData: {}
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
			const response = await fetch(ProductGroupList.getApiUrl('ProductGroup'), {
				method: 'post',
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				},
				body: JSON.stringify({
					Name: this.productGroupFormRef.current.state.data.Name
				})
			});
			console.log(response);
			await this.loadProductGroupList();
		}
	};
	private onUpdateButtonClick = async (event: MouseEvent<HTMLAnchorElement>) => {
		const id: number = Number((event.target as HTMLAnchorElement).getAttribute('data-id'));

		const response = await fetch(ProductGroupList.getApiUrl(`ProductGroup/${id}`), {
			method: 'get'
		});

		const data = (await response.json()) as IProductGroupFormData;

		this.setState({
			modalVisible: true,
			productGroupFormData: {
				Name: data.Name
			}
		});
	};
	private onDeleteButtonClick = async (event: MouseEvent<HTMLAnchorElement>) => {
		const id = (event.target as HTMLAnchorElement).getAttribute('data-id');
		const response = await fetch(ProductGroupList.getApiUrl(`ProductGroup/${id}`), {
			method: 'delete'
		});
		console.log(response);
		await this.loadProductGroupList();
	};
}