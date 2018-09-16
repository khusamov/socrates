import React, {Component, ReactNode, Fragment} from 'react';
import {TMode as TFormMode} from '@library/form/Form';
import JobCategory from '@components/settings/jobCategory/JobCategory';
import TextField from '@library/form/field/TextField';
import CrudModalForm from '@library/crud/crud1/CrudModalForm';

interface IJobCategoryModalProps {
	visible: boolean;
	mode: TFormMode;
	record: JobCategory;
	onSubmit: (mode: TFormMode, record: JobCategory) => void;
	onCancel: () => void;
}

export default class JobCategoryModal extends Component<IJobCategoryModalProps> {
	public render(): ReactNode {
		return (
			<CrudModalForm<typeof JobCategory, JobCategory>
				visible={this.props.visible}
				mode={this.props.mode}
				record={this.props.record}
				recordStore={JobCategory.store}
				onSubmit={this.props.onSubmit}
				onCancel={this.props.onCancel}
				title={{
					insert: 'Новая категория',
					update: 'Изменить категорию'
				}}
			>
				{({onFieldChange, record}) => (
					<Fragment>
						<TextField
							label='Наименование'
							name='name'
							value={record.rawData.name}
							onChange={onFieldChange}
						/>
						<TextField
							label='Стоимость нормо-часа'
							name='hourNormCost'
							value={record.rawData.hourNormCost ? String(record.rawData.hourNormCost) : ''}
							onChange={onFieldChange}
						/>
					</Fragment>
				)}
			</CrudModalForm>
		);
	}
}