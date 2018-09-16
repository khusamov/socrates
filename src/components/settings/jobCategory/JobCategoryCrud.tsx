import React, {Component, ReactNode} from 'react';
import JobCategory from './JobCategory';
import JobCategoryTable from './JobCategoryTable';
import JobCategoryModal from './JobCategoryModal';
import Crud from '@library/crud/crud1/Crud';

export default class JobCategoryCrud extends Component {
	public render(): ReactNode {
		return (
			<Crud<typeof JobCategory, JobCategory>
				title='Категории трудозатрат'
				recordStore={JobCategory.store}
				RecordConstructor={JobCategory}
				RecordModal={JobCategoryModal}
				RecordTable={JobCategoryTable}
			/>
		);
	}
}