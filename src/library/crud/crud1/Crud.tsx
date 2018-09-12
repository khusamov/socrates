import React, {Component, ReactNode} from 'react';
import {TMode as TFormMode, TSubmitFunction as TFormSubmitFunction} from '@library/form/Form';
import {IResourceConstructor} from '@library/rest/Store';
import {IResource, Resource, Store} from '@library/rest';
import Panel, {Content, Docked, Header, Title} from '@library/panel/Panel';
import Button from '@library/button/Button';
import _ from 'lodash';

interface ICrudProps<
	TResourceConstructor extends IResourceConstructor,
	TResource extends Resource<IResource>
> {
	title: string;
	record: TResource;
	recordStore: Store<TResourceConstructor, TResource>;
	RecordConstructor: IResourceConstructor;
	RecordModal: typeof Component;
	RecordTable: typeof Component;
}

interface ICrudState<
	TResourceConstructor extends IResourceConstructor,
	TResource extends Resource<IResource>
> {
	data: TResource[];
	record: TResource;
	modalVisible: boolean;
	formMode: TFormMode;
}

/**
 * Реализация CRUD-паттерна.
 */
export default class Crud<
	TResourceConstructor extends IResourceConstructor,
	TResource extends Resource<IResource>
> extends Component<
	ICrudProps<TResourceConstructor, Resource<IResource>>,
	ICrudState<TResourceConstructor, Resource<IResource>>
> {

	constructor(props: ICrudProps<TResourceConstructor, Resource<IResource>>) {
		super(props);
		this.state = {
			data: [],
			modalVisible: false,
			formMode: 'insert',
			record: new this.props.RecordConstructor
		};
	}

	public async componentDidMount() {
		await this.loadData();
	}

	public render(): ReactNode {
		const {RecordModal, RecordTable} = this.props;
		return (
			<div className='Crud'>
				<Panel>
					<Header>
						<Title>{this.props.title}</Title>
					</Header>
					<Docked style={{padding: 10}}>
						<Button onClick={this.onInsertButtonClick}>Новая запись</Button>
					</Docked>
					<Content>
						<RecordTable
							data={this.state.data}
							onAction={this.onAction}
						/>
					</Content>
				</Panel>
				<RecordModal
					visible={this.state.modalVisible}
					mode={this.state.formMode}
					record={this.state.record}
					onSubmit={this.onRecordModalSubmit}
					onCancel={this.onRecordModalCancel}
				/>
			</div>
		);
	}

	private async loadData() {
		this.setState({
			data: await this.props.recordStore.getAll()
		});
	}

	private onRecordModalSubmit: TFormSubmitFunction<TResource> = async (mode: TFormMode, record: TResource) => {
		if (record) {
			this.setState({
				modalVisible: false
			});

			let newRecord: TResource;
			switch (mode) {
				case 'insert':
					newRecord = this.props.recordStore.clone(record) as TResource;
					break;
				case 'update':
					newRecord = await this.props.recordStore.getOne(this.state.record.rawData.id as number) as TResource;
					newRecord.rawData = _.cloneDeep(record.rawData);
					break;
				default:
					throw new Error(`Неизвестный режим формы ${mode}`);
			}

			await newRecord.save();
			await this.loadData();
		}
	};

	private onRecordModalCancel = () => {
		this.setState({
			modalVisible: false
		});
	};

	private onInsertButtonClick = () => {
		this.setState({
			modalVisible: true,
			formMode: 'insert',
			record: new this.props.RecordConstructor({name: ''})
		});
	};

	private onAction = async (action: string, id: number) => {
		switch (action) {
			case 'update':
				const productGroup = await this.props.recordStore.getOne(id);
				this.setState({
					modalVisible: true,
					formMode: 'update',
					record: productGroup
				});
				break;
			case 'delete':
				await this.props.recordStore.delete(Number(id));
				await this.loadData();
				break;
			default: throw new Error(`Не известное действие '${action}'.`);
		}
	};

}