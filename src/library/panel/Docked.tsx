import React, {Component, CSSProperties, ReactNode} from 'react';
import './Docked.scss';

interface IDockedProps {
	style?: CSSProperties;
}

export default class Docked extends Component<IDockedProps> {
	public render(): ReactNode {
		return (
			<div className='Docked' style={this.props.style}>
				{this.props.children}
			</div>
		);
	}
}