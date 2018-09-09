import React, {Component, ReactNode} from 'react';
import './Tab.scss';

export interface ITabProps {
	title: string;
}

export default class Tab extends Component<ITabProps> {
	public render(): ReactNode {
		return (
			<div className='Tab'>
				{this.props.children}
			</div>
		);
	}
}