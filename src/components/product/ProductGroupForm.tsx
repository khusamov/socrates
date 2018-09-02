import React, {ChangeEvent, Component} from 'react';
import './ProductGroupForm.scss';
import uuidv1 from 'uuid/v1';
import ProductGroup from './ProductGroup';
import Button from '@library/button/Button';
import Panel, {Content, Title, Footer} from '@library/panel/Panel';

export type TMode = 'insert' | 'update';

interface IProductGroupFormProps {
	productGroup?: ProductGroup;
	onSubmit?: () => void;
	onCancel?: () => void;
	mode: TMode;
}

const submitButtonCaption = {
	insert: 'Создать',
	update: 'Изменить'
};

const formTitle = {
	insert: 'Новая группа товаров/услуг',
	update: 'Изменить группу товаров/услуг'
};

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
			<form className='ProductGroupForm' onSubmit={this.props.onSubmit}>
				<Panel>
					<Title>{formTitle[this.props.mode]}</Title>
					<Content style={{padding: 10}}>
						<label htmlFor={nameFieldId}>Наименование группы товаров/услуг:</label>
						<input
							id={nameFieldId}
							type='text'
							name='name'
							value={this.state.productGroup.data.name}
							onChange={this.onInputChange}
						/>
					</Content>
					<Footer style={{padding: 10}}>
						<Button type='submit'>{submitButtonCaption[this.props.mode]}</Button>
						<Button type='button' onClick={this.props.onCancel}>Отмена</Button>
					</Footer>
				</Panel>
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
	};

}