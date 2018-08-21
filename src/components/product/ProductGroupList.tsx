import React, {MouseEvent} from 'react';
import Modal from '../modal/Modal';
import ProductGroupForm from './ProductGroupForm';

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
	public async componentDidMount() {
		await this.loadProductGroupList();
	}
	public render() {
		return (
			<div className='ProductGroupList'>
				<button onClick={this.onInsertButtonClick}>Новая запись</button>
				{
					this.state.productGroupList.map(
						(productGroupItem, index) => (
							<div key={index}>{productGroupItem.Name}</div>
						)
					)
				}
				<Modal visible={this.state.modalVisible}>
					<div style={{padding: 20}}>
						<ProductGroupForm />
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
	private onSubmitButtonClick = (event: MouseEvent) => {
		this.setState({
			modalVisible: false
		});
	};
}