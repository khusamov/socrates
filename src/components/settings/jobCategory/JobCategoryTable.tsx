import React, {Component, ReactNode} from 'react';
import JobCategory from '@components/settings/jobCategory/JobCategory';
import {Column} from '@library/table/Table';
import CrudTable from '@library/crud/crud1/CrudTable';

interface IJobCategoryTableProps {
	data: JobCategory[];
	onAction: (action: string, id: number) => void
}

export default class JobCategoryTable extends Component<IJobCategoryTableProps> {
	public render(): ReactNode {
		return (
			<CrudTable data={this.props.data} onAction={this.props.onAction}>
				<Column title='Наименование' dataIndex='rawData.name'/>
				<Column title='Стоимость нормо-часа' dataIndex='rawData.hourNormCost'/>
			</CrudTable>
		);
	}
}