import React, {Component, ReactNode, Children} from 'react';
import './Table.scss';
import {Provider as ColumnContextProvider} from './ColumnContext';
import Column from './Column';
import {Provider as TableContextProvider} from './TableContext';
import {Provider as RecordContextProvider} from './RecordContext';
export {default as Column} from './Column';

// TODO Если TableContextProvider не будет использоваться, то его надо удалить

// TODO Сделать компоненты thead и tbody


interface ITableProps<D> {
	data: D[];
}

function isReactElement(child: any): child is React.ReactElement<{}>  {
	return 'type' in child && 'props' in child && 'key' in child;
}

export default class Table<D> extends Component<ITableProps<D>> {

	public render(): ReactNode {
		const columns = this.getColumns();
		return !!this.props.data.length && (
			<table className='Table'>
				<TableContextProvider value={{data: this.props.data}}>
					<thead>
						<ColumnContextProvider value={{renderMode: 'thead'}}>
							<tr>{columns}</tr>
						</ColumnContextProvider>
					</thead>
					<tbody>
						<ColumnContextProvider value={{renderMode: 'tbody'}}>
							{this.props.data.map((record, index) => (
								<RecordContextProvider value={record} key={index}>
									<tr>{columns.map(column => column)}</tr>
								</RecordContextProvider>
							))}
						</ColumnContextProvider>
					</tbody>
				</TableContextProvider>
			</table>
		);
	}

	private getColumns() {
		return Children.map(this.props.children, child => {
			if (isReactElement(child)) {
				if (child.type !== Column) {
					throw new Error('В компоненте <Table> разрешено размещать только <Column>');
				}
			} else {
				throw new Error('В компоненте <Table> разрешено размещать только элементы, причем только <Column>');
			}
			return child;
		});
	}

}