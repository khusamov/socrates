import React, {ChangeEvent, Component} from 'react';
import './ProductGroupForm.scss';
import uuidv1 from 'uuid/v1';
import ProductGroup from './ProductGroup';

interface IProductGroupFormProps {
	productGroup?: ProductGroup;
}

interface IProductGroupFormState {
	productGroup: ProductGroup;
}

export default class ProductGroupForm extends Component<IProductGroupFormProps, IProductGroupFormState> {

	public state: IProductGroupFormState = {
		productGroup: new ProductGroup({
			name: ''
		})
	};

	public componentWillMount() {
		if (this.props.productGroup) {
			this.setState({
				productGroup: this.props.productGroup.clone()
			});
		}
	}

	public componentWillReceiveProps(nextProps: IProductGroupFormProps) {
		if (nextProps.productGroup) {
			this.setState({
				productGroup: nextProps.productGroup.clone()
			});
		}
	}

	public render() {
		const nameFieldId = uuidv1();
		return (
			<form className='ProductGroupForm'>
				<label htmlFor={nameFieldId}>Наименование группы товаров/услуг:</label>
				<input
					type='text'
					id={nameFieldId}
					name='name'
					value={this.state.productGroup.data.name}
					onChange={this.onInputChange}
				/>
			</form>
		);
	}

	private onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const cloned = this.state.productGroup.clone();
		cloned.data = {
			...cloned.data,
			[event.target.name]: event.target.value
		};
		this.setState({
			productGroup: cloned
		});
	}

}