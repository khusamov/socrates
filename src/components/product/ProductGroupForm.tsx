import React, {ChangeEvent, Component} from 'react';
import './ProductGroupForm.css';

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
		return (
			<form className='ProductGroupForm'>
				<label>Наименование группы товаров/услуг:</label>
				<input type='text' name='Name' value={this.state.value.Name} onChange={this.onInputChange}/>
			</form>
		);
	}
	private onInputChange = (event: ChangeEvent<HTMLInputElement>) => {

		// this.state.value
		//
		// this.setState({
		// 	value: {
		// 		[event.target.name]: event.target.value
		// 	}
		// });
	}
}