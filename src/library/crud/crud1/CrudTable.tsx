import React, {Component, Fragment, MouseEvent, MouseEventHandler, ReactNode, StatelessComponent} from 'react';
import {Column} from '@library/table/Table';
import Table from '@library/table/Table';

interface IAbstractRecord {
	rawData: {
		id?: number;
	}
}

interface IAction {
	name: string;
	label: string;
}

interface ICrudTableProps {
	data: IAbstractRecord[];
	onAction: (action: string, id: number) => void;
	actions?: IAction[];
}

const Anchor: StatelessComponent<{record: IAbstractRecord, action: string, onAction: MouseEventHandler}> = (
	({record, action, children, onAction}) => (
		<a
			href='#'
			data-id={record.rawData.id}
			data-action={action}
			onClick={onAction}
		>
			{children}
		</a>
	)
);

export default class CrudTable extends Component<ICrudTableProps> {

	public render(): ReactNode {
		return (
			<Table data={this.props.data}>
				{this.props.children}
				<Column>
					{(record: IAbstractRecord) => (
						<Fragment>
							<Anchor onAction={this.onAction} record={record} action='update'>Изменить</Anchor>
							<span>&nbsp;</span>
							<Anchor onAction={this.onAction} record={record} action='delete'>Удалить</Anchor>
						</Fragment>
					)}
				</Column>
			</Table>
		);
	}

	private onAction = (event: MouseEvent<HTMLAnchorElement>) => {
		const anchorEl = event.target as HTMLAnchorElement;
		const action: string | null = anchorEl.getAttribute('data-action');
		if (action) {
			const id: number = Number(anchorEl.getAttribute('data-id'));
			this.props.onAction(action, id);
		} else {
			throw new Error('Нет действия.');
		}
	};

}