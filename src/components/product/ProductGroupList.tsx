import React, {MouseEvent, RefObject} from 'react';
import Modal from '../modal/Modal';
import ProductGroupForm from './ProductGroupForm';
import './ProductGroupList.css';

const {
	REACT_APP_API_HOST: API_HOST,
	REACT_APP_API_PORT: API_PORT
} = process.env;

interface IProductGroupState {
	productGroupList: any[];
	modalVisible: boolean;
}

export default class ProductGroupList extends React.Component<{}, IProductGroupState> {
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
		modalVisible: false
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
						<ProductGroupForm ref={this.productGroupFormRef}/>
						<button onClick={this.onSubmitButtonClick}>Создать</button>
						<button onClick={this.onCancelButtonClick}>Закрыть</button>
					</div>
				</Modal>
			</div>
		);
	}
	private async loadProductGroupList() {
		const response = await fetch(ProductGroupList.getApiUrl('ProductGroupList'), {
			method: 'get'
		});

		const data = await response.json();

		this.setState({
			productGroupList: data
		});
	}
	private onInsertButtonClick = (event: MouseEvent) => {
		this.setState({
			modalVisible: true
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
			const response = await fetch(ProductGroupList.getApiUrl('ProductGroupList'), {
				method: 'post',
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				},
				body: JSON.stringify({
					Name: this.productGroupFormRef.current.state.value.Name
				})
			});
			const data = await response.json();
			console.log(data);
			await this.loadProductGroupList();
		}
	};
	private onUpdateButtonClick = async (event: MouseEvent<HTMLAnchorElement>) => {
		// const id = (event.target as HTMLAnchorElement).getAttribute('data-id');

	};
	private onDeleteButtonClick = async (event: MouseEvent<HTMLAnchorElement>) => {
		const id = (event.target as HTMLAnchorElement).getAttribute('data-id');
		const response = await fetch(ProductGroupList.getApiUrl(`ProductGroupList/${id}`), {
			method: 'delete'
		});
		const data = await response.json();
		console.log(data);
		await this.loadProductGroupList();
	};
}