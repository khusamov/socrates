import React, {Component, ReactNode} from 'react';
import {IResourceConstructor} from '@library/rest/Store';
import {IResource, Resource, Store} from '@library/rest';
import Modal from '@library/modal/Modal';
import Form, {
	ITitle as IFormTitle,
	TMode as TFormMode,
	TChildrenFunction as TFormChildrenFunction,
	TSubmitFunction as TFormSubmitFunction
} from '@library/form/Form';

interface ICrudModalFormProps<
	TResourceConstructor extends IResourceConstructor,
	TResource extends Resource<IResource>
> {
	visible: boolean;
	mode: TFormMode;
	record: TResource;
	recordStore: Store<TResourceConstructor, TResource>;
	onSubmit: TFormSubmitFunction<TResource>;
	onCancel: () => void;
	title: IFormTitle;
	children: TFormChildrenFunction<TResource>;
}

export default class CrudModalForm<
	TResourceConstructor extends IResourceConstructor,
	TResource extends Resource<IResource>
	>
	extends Component<ICrudModalFormProps<TResourceConstructor, TResource>> {

	public render(): ReactNode {
		return (
			<Modal visible={this.props.visible}>
				<Form<TResourceConstructor, TResource>
					mode={this.props.mode}
					record={this.props.record}
					recordStore={this.props.recordStore}
					onSubmit={this.props.onSubmit}
					onCancel={this.props.onCancel}
					title={this.props.title}
				>
					{this.props.children as TFormChildrenFunction<TResource>}
				</Form>
			</Modal>
		);
	}

}