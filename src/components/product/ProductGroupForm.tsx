import React, {ChangeEvent, Component} from 'react';
import './ProductGroupForm.css';
import uuidv1 from 'uuid/v1';

interface IProductGroupFormState {
	value: {
		Name: string;
	};
}

export default class ProductGroupForm extends Component<{}, IProductGroupFormState> {
	public state: IProductGroupFormState = {
		value: {
			Name: ''
		}
	};
	public render() {
		const nameFieldId = uuidv1();
		return (
			<form className='ProductGroupForm'>
				<label htmlFor={nameFieldId}>Наименование группы товаров/услуг:</label>
				<input type='text' id={nameFieldId} name='Name' value={this.state.value.Name} onChange={this.onInputChange}/>
			</form>
		);
	}
	private onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		this.setState({
			value: {
				...this.state.value,
				[event.target.name]: event.target.value
			}
		});
	}
}