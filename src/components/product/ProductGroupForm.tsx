import React, {ChangeEvent, Component} from 'react';
import './ProductGroupForm.scss';
import uuidv1 from 'uuid/v1';

export interface IProductGroupFormData {
	Name?: string;
}

interface IProductGroupFormProps {
	data?: IProductGroupFormData;
}

interface IProductGroupFormState {
	data: IProductGroupFormData;
}

export default class ProductGroupForm extends Component<IProductGroupFormProps, IProductGroupFormState> {
	public state: IProductGroupFormState = {
		data: {
			Name: ''
		}
	};
	public componentWillMount() {
		if (this.props.data) {
			this.setState({
				data: {
					Name: this.props.data.Name || ''
				}
			});
		}
	}
	public componentWillReceiveProps(nextProps: IProductGroupFormProps) {
		if (nextProps.data) {
			this.setState({
				data: {
					Name: nextProps.data.Name
				}
			});
		}
	}
	public render() {
		const nameFieldId = uuidv1();
		return (
			<form className='ProductGroupForm'>
				<label htmlFor={nameFieldId}>Наименование группы товаров/услуг:</label>
				<input type='text' id={nameFieldId} name='Name' value={this.state.data.Name} onChange={this.onInputChange}/>
			</form>
		);
	}
	private onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		this.setState({
			data: {
				...this.state.data,
				[event.target.name]: event.target.value
			}
		});
	}
}