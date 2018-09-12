import React, {Component, ChangeEvent, ReactNode} from 'react';
import Panel, {Content, Title, Footer, Header} from '@library/panel/Panel';
import {Store, IResource, Resource} from '@library/rest';
import {IResourceConstructor} from '@library/rest/Store';
import Button from '@library/button/Button';

/**
 * Контекст формы передает ссылку на метод onFieldChange для передачи измененных
 * данных полей в свойство record состояния формы.
 */
export interface IFormContext<TResource extends Resource<IResource>> {
	onFieldChange: (event: ChangeEvent<HTMLInputElement>) => void;
	record: TResource;
}

export type TChildrenFunction<TResource extends Resource<IResource>> = (
	(formContext: IFormContext<TResource>) => ReactNode
);

export type TSubmitFunction<TResource extends Resource<IResource>> = (
	(mode: TMode, record?: TResource) => void
);

export interface ITitle {
	insert: string;
	update: string;
}

export type TMode = keyof ITitle;

interface IProductGroupFormProps<
	TResourceConstructor extends IResourceConstructor,
	TResource extends Resource<IResource>
> {
	recordStore: Store<TResourceConstructor, TResource>;
	record?: TResource;
	onSubmit?: TSubmitFunction<TResource>;
	onCancel?: () => void;
	mode: TMode;
	title: ITitle;
	children: TChildrenFunction<TResource>;
}

const submitButtonCaption = {
	insert: 'Создать',
	update: 'Изменить'
};

interface IProductGroupFormState<TResource extends Resource<IResource>> {
	record: TResource;
}

/**
 * Форма с панелью в качестве содержимого.
 */
export default class Form<TResourceConstructor extends IResourceConstructor, TResource extends Resource<IResource>>
	extends Component<IProductGroupFormProps<TResourceConstructor, TResource>, IProductGroupFormState<TResource>> {

	public componentWillMount() {
		if (this.props.record) {
			this.setState({
				record: this.props.recordStore.clone(this.props.record)
			});
		}
	}

	public componentWillReceiveProps(nextProps: IProductGroupFormProps<TResourceConstructor, TResource>) {
		if (nextProps.record) {
			this.setState({
				record: this.props.recordStore.clone(nextProps.record)
			});
		}
	}

	public render() {
		return (
			<form className='ProductGroupForm' onSubmit={this.onSubmit}>
				<Panel>
					<Header>
						<Title>{this.props.title[this.props.mode]}</Title>
					</Header>
					<Content style={{padding: 10}}>
						{
							(this.props.children as TChildrenFunction<TResource>)({
								onFieldChange: this.onFieldChange,
								record: this.state.record
							})
						}
					</Content>
					<Footer style={{padding: 10}}>
						<Button type='submit'>{submitButtonCaption[this.props.mode]}</Button>
						<Button type='button' onClick={this.props.onCancel}>Отмена</Button>
					</Footer>
				</Panel>
			</form>
		);
	}

	private onSubmit = () => {
		if (this.props.onSubmit) {
			this.props.onSubmit(this.props.mode, this.state.record);
		}
	};

	private onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (this.state.record) {
			const cloned = this.props.recordStore.clone(this.state.record);
			cloned.rawData = {
				...cloned.rawData,
				[event.target.name]: event.target.value
			};
			this.setState({
				record: cloned
			});
		}
	};

}