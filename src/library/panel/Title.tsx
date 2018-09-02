import React, {Component, ReactNode} from 'react';
import './Title.scss';

export default class Title extends Component {
	public render(): ReactNode {
		return (
			<div className='Title'>
				{this.props.children}
			</div>
		);
	}
}