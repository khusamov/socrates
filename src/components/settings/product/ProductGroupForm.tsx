import React, {ChangeEvent, Component} from 'react';
import './ProductGroupForm.scss';
import uuidv1 from 'uuid/v1';
import ProductGroup from './ProductGroup';
import Button from '@library/button/Button';
import Panel, {Content, Title, Footer, Header} from '@library/panel/Panel';

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
	productGroup?: ProductGroup;
}

export default class ProductGroupForm extends Component<IProductGroupFormProps, IProductGroupFormState> {

	public componentWillMount() {
		if (this.props.productGroup) {
			this.setState({
				productGroup: ProductGroup.store.clone(this.props.productGroup)
			});
		}
	}

	public componentWillReceiveProps(nextProps: IProductGroupFormProps) {
		if (nextProps.productGroup) {
			this.setState({
				productGroup: ProductGroup.store.clone(nextProps.productGroup)
			});
		}
	}

	public render() {
		const nameFieldId = uuidv1();
		const {name = ''} = this.state.productGroup ? this.state.productGroup.rawData : {};
		return (
			<form className='ProductGroupForm' onSubmit={this.props.onSubmit}>
				<Panel>
					<Header>
						<Title>{formTitle[this.props.mode]}</Title>
					</Header>
					<Content style={{padding: 10}}>
						<label htmlFor={nameFieldId}>Наименование группы товаров/услуг:</label>
						<input
							id={nameFieldId}
							type='text'
							name='name'
							value={name}
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
		if (this.state.productGroup) {
			const cloned = ProductGroup.store.clone(this.state.productGroup);
			cloned.rawData = {
				...cloned.rawData,
				[event.target.name]: event.target.value
			};
			this.setState({
				productGroup: cloned
			});
		}
	};

}