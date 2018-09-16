import React, {Component, ReactNode} from 'react';
import './Column.scss';
import {Consumer as ColumnContextConsumer, IColumnContext} from './ColumnContext';
import {Consumer as TableContextConsumer, ITableContext} from './TableContext';
import {Consumer as RecordContextConsumer} from './RecordContext';

interface IColumnProps {
	/**
	 * Имя колонки.
	 */
	title?: string;
	/**
	 * Доступ к значению колонки.
	 * Можно указывать либо имя свойства объекта либо доступ
	 * ко вложенному свойству через точку, например 'date.name.value'.
	 */
	dataIndex?: string;
}

export type TRendererFunction<D = any> = (record: D, data: D[]) => ReactNode;

/**
 * Колонка таблицы.
 * Внимание, в качестве дочернего элемента колонки предполагается всегда функция.
 */
export default class Column extends Component<IColumnProps> {

	public render(): ReactNode {
		const {title} = this.props;
		this.checkBeforeRender();
		const renderer: TRendererFunction = this.createRenderer();
		return (
			<ColumnContextConsumer>
				{({renderMode}: IColumnContext) => {
					switch (renderMode) {
						case 'thead': return <th>{title}</th>;
						case 'tbody': return (
							<TableContextConsumer>
								{({data}: ITableContext<any>) => (
									<RecordContextConsumer>
										{record => <td>{renderer(record, data)}</td>}
									</RecordContextConsumer>
								)}
							</TableContextConsumer>
						);
						default: throw new Error(`Не известный режим отрисовки колонки '${renderMode}'`);
					}
				}}
			</ColumnContextConsumer>
		);
	}

	private createRenderer(): TRendererFunction {
		const {dataIndex, children} = this.props;
		return (
			dataIndex
				? (record: any) => this.getRecordValue(record, dataIndex)
				: children as TRendererFunction | any
		);
	}

	private checkBeforeRender() {
		const {dataIndex, children} = this.props;
		if (!dataIndex && !children || dataIndex && children) {
			throw new Error('Необходимо определить либо dataIndex либо дочерний элемент');
		}
		if (children && typeof children !== 'function') {
			throw new Error('Дочерний элемент должен быть функцией');
		}
	}

	private getRecordValue(record: any, dataIndex: string): any {
		if (dataIndex.indexOf('.') === -1) {
			return record[dataIndex];
		} else {
			return this.getRecordValue(
				record[dataIndex.split('.')[0]],
				dataIndex.split('.').splice(1).join('')
			)
		}
	}

}