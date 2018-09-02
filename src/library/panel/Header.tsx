import React, {Component, ReactNode} from 'react';
import './Header.scss';

export default class Header extends Component {
	public render(): ReactNode {
		return (
			<div className='Header'>
				{this.props.children}
			</div>
		);
	}
}